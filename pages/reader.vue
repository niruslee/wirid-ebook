<script setup>
import { duaPages } from '~/data/duaPages'

const router = useRouter()

const currentIndex = ref(0)
const fontSize = ref(22)
const flipbook = ref(null)
const bookReady = ref(false)
const isTurning = ref(false)

const page = computed(() => duaPages[currentIndex.value])

const pageText = computed(() => {
  if (page.value.sourcePage === null) {
    return ``
  }

  return `หน้า ${page.value.sourcePage} จาก ${duaPages.length}`
})

const turnPage = direction => {
  if (!bookReady.value || isTurning.value) return
  flipbook.value?.turn(direction)
}

</script>

<template>
  <main class="reader-page">
    <header class="reader-header">
      <button
        class="plain-button"
        aria-label="กลับหน้าหลัก"
        @click="router.push('/')"
      >
        ‹
      </button>

      <div>
        <strong>วิริดชาวสวนสวรรค์อัลฟิรดาวส์</strong>
        <small aria-live="polite" aria-atomic="true">{{ pageText }}</small>
      </div>
    </header>

    <section class="reader-stage">
      <ReaderFlipbook
        ref="flipbook"
        :pages="duaPages"
        :font-size="fontSize"
        @flip="currentIndex = $event"
        @busy="isTurning = $event"
        @ready="bookReady = true"
      />
    </section>

    <p id="reader-drag-hint" class="reader-drag-hint">ลากมุมซ้ายไปขวาเพื่ออ่านหน้าถัดไป</p>

    <!-- <div class="page-controls">

      <button
        :disabled="!bookReady || currentIndex === duaPages.length - 1 || isTurning"
        @click="turnPage(1)"
      >
        ‹ หน้าถัดไป 
      </button>
      <button
        :disabled="!bookReady || currentIndex === 0 || isTurning"
        @click="turnPage(-1)"
      >
         หน้าก่อน ›
      </button>
    </div> -->
  </main>
</template>