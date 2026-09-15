<script setup>
import { duaPages } from '~/data/duaPages'

const router = useRouter()

const currentIndex = ref(0)
const fontSize = ref(18)
const turnClass = ref('')
const isTurning = ref(false)

const page = computed(() => duaPages[currentIndex.value])

const pageText = computed(() => {
  if (page.value.sourcePage === null) {
    return ``
  }

  return `หน้า ${page.value.sourcePage} จาก ${duaPages.length}`
})

const turnPage = direction => {
  if (isTurning.value) return

  const targetIndex = currentIndex.value + direction
  

  if (targetIndex < 0 || targetIndex >= duaPages.length) {
    return
  }

  isTurning.value = true

  turnClass.value =
    direction === 1
      ? 'page-out-previous'
      : 'page-out-next'

  window.setTimeout(() => {
    currentIndex.value = targetIndex

    turnClass.value =
      direction === 1
        ? 'page-in-next'
        : 'page-in-previous'
  }, 340)

  window.setTimeout(() => {
    turnClass.value = ''
    isTurning.value = false
  }, 740)
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
        <small>{{ pageText }}</small>
      </div>
    </header>

    <section class="reader-stage">
      <ReaderPaper
        :page="page"
        :font-size="fontSize"
        :turn-class="turnClass"
      />
    </section>

    <div class="page-controls">

      <button
        :disabled="currentIndex === duaPages.length - 1 || isTurning"
        @click="turnPage(1)"
      >
        ‹ หน้าถัดไป 
      </button>
      <button
        :disabled="currentIndex === 0 || isTurning"
        @click="turnPage(-1)"
      >
         หน้าก่อน ›
      </button>
    </div>
  </main>
</template>