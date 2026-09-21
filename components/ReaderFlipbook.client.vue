<script setup>
import { PageFlip } from 'page-flip'
import { configurePortraitPageFlip } from '~/utils/portraitPageFlip'

const props = defineProps({
  pages: { type: Array, required: true },
  fontSize: { type: Number, required: true }
})
const emit = defineEmits(['flip', 'busy', 'ready'])
const viewport = ref(null)
const source = ref(null)
const mount = ref(null)
const measurement = ref(null)
const measuredPageIndex = ref(0)
const ready = ref(false)
let book
let host
let pageElements = []
let observer
let motionPreference
let disposed = false
let resizePending = false
let resizing = false
let selectedIndex = props.pages.length - 1

// StPageFlip orders pages left-to-right. Reverse the collection so advancing
// through this Arabic book turns the sheet from left to right.
const bookIndex = index => props.pages.length - 1 - index

function syncPage(index) {
  selectedIndex = index
  measuredPageIndex.value = bookIndex(index)
  pageElements.forEach((element, i) => {
    element.setAttribute('aria-hidden', String(i !== index))
    element.inert = i !== index
  })
  emit('flip', bookIndex(index))
}

function measureHeight() {
  const height = Math.ceil(measurement.value.getBoundingClientRect().height)
  viewport.value.style.setProperty('--reader-book-height', `${height}px`)
}

function resize() {
  if (!book || !viewport.value) return
  if (['flipping', 'user_fold'].includes(book.getState())) {
    resizePending = true
    return
  }
  measureHeight()
  const width = Math.floor(viewport.value.clientWidth)
  const height = Math.floor(viewport.value.clientHeight)
  const settings = book.getSettings()
  if (settings.width === width && settings.height === height) return
  // Fixed dimensions keep one full-size page on both phones and desktops.
  // The settings object is shared by the library's UI and renderer.
  Object.assign(settings, { width, height, minWidth: width, minHeight: height })
  host.style.minWidth = `${width}px`
  host.style.minHeight = `${height}px`
  resizing = true
  book.update()
  book.turnToPage(selectedIndex)
  resizing = false
  resizePending = false
}

function turn(direction) {
  if (!book || ['flipping', 'user_fold'].includes(book.getState())) return
  const target = book.getCurrentPageIndex() - direction
  if (target < 0 || target >= props.pages.length) return
  if (motionPreference.matches) {
    book.turnToPage(target)
    syncPage(target)
  } else if (direction > 0) book.flipPrev('bottom')
  else book.flipNext('bottom')
}

defineExpose({ turn })

onMounted(async () => {
  await document.fonts.ready
  if (disposed) return
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  measureHeight()
  // The library moves and clones DOM nodes. Give it its own copies so Vue
  // retains ownership of the source components during route changes.
  pageElements = Array.from(source.value.children, element => element.cloneNode(true)).reverse()
  host = document.createElement('div')
  host.className = 'reader-book'
  mount.value.appendChild(host)
  book = new PageFlip(host, {
    width: Math.floor(viewport.value.clientWidth),
    height: Math.floor(viewport.value.clientHeight),
    size: 'fixed',
    autoSize: false,
    usePortrait: true,
    startPage: bookIndex(0),
    showCover: false,
    drawShadow: true,
    maxShadowOpacity: 0.3,
    flippingTime: motionPreference.matches ? 1 : 900,
    useMouseEvents: true,
    mobileScrollSupport: true,
    showPageCorners: !motionPreference.matches,
    disableFlipByClick: true,
    swipeDistance: 30
  })
  book.on('flip', event => {
    // The library emits flip during layout updates too. Only a real turn
    // should replace the reader's saved position.
    if (!resizing && book.getState() !== 'read') syncPage(event.data)
  })
  book.on('changeState', event => {
    emit('busy', ['flipping', 'user_fold'].includes(event.data))
    if (event.data === 'read' && resizePending) requestAnimationFrame(resize)
  })
  book.loadFromHTML(pageElements)
  configurePortraitPageFlip(book)
  syncPage(bookIndex(0))
  observer = new ResizeObserver(resize)
  observer.observe(viewport.value)
  observer.observe(measurement.value)
  ready.value = true
  emit('ready')
})

onBeforeUnmount(() => {
  disposed = true
  observer?.disconnect()
  book?.off('flip')
  book?.off('changeState')
  book?.destroy()
  book = null
})
</script>

<template>
  <div
    ref="viewport"
    class="reader-book-viewport"
    :class="{ 'is-ready': ready }"
    aria-label="หนังสือดุอาอ์"
    aria-describedby="reader-drag-hint"
    :aria-busy="!ready"
  >
    <div ref="source" hidden aria-hidden="true">
      <ReaderPaper v-for="page in pages" :key="page.id" :page="page" :font-size="fontSize" />
    </div>
    <div ref="measurement" class="reader-book-measure" aria-hidden="true" inert>
      <ReaderPaper :page="pages[measuredPageIndex]" :font-size="fontSize" />
    </div>
    <div ref="mount" class="reader-book-mount" />
    <p v-if="!ready" class="reader-loading" role="status">กำลังเตรียมหน้าหนังสือ…</p>
  </div>
</template>
