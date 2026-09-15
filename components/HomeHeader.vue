<script setup>
const emit = defineEmits(['placeholder'])
</script>

<template>
  <!-- <div class="home-actions">
    <button class="round-button menu-button" aria-label="เปิดเมนู" @click="emit('placeholder', 'เมนู')">
      <span /><span /><span />
    </button>
    <div class="action-group">
      <button class="round-button" aria-label="ค้นหา" @click="emit('placeholder', 'ระบบค้นหา')">⌕</button>
      <button class="round-button" aria-label="ตั้งค่า" @click="emit('placeholder', 'การตั้งค่า')">⚙</button>
    </div>
  </div> -->

  <header class="home-title">
    <h1 lang="ar" dir="rtl">دعاء</h1>
    <h2>ดุอาอ์</h2>
    <p>ของขวัญจากอัลลอฮ์... ในทุกช่วงของชีวิต</p>
    <div class="title-ornament"><span /><b>✦</b><span /></div>
  </header>
</template>
