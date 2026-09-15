<script setup>
const toast = ref('')
let toastTimer

const showPlaceholder = label => {
  toast.value = `${label}จะเปิดใช้งานในเวอร์ชันถัดไป`
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value = '' }, 1900)
}

onBeforeUnmount(() => clearTimeout(toastTimer))
</script>

<template>
  <main class="home-page">
    <img class="home-background" src="/images/home-bookshelf.png" alt="ชั้นหนังสือไม้อิสลามพร้อมแสงโทนอุ่น">
    <HomeHeader @placeholder="showPlaceholder" />
    <DigitalBook />
    <AppFooter @placeholder="showPlaceholder" />
    <ToastMessage :message="toast" />
  </main>
</template>
