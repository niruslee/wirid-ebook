<script setup>
const emit = defineEmits(['placeholder'])
</script>

<template>
  <nav class="bottom-nav" aria-label="เมนูหลัก">
    <NuxtLink to="/" class="nav-item active"><span>⌂</span><b>หน้าหลัก</b></NuxtLink>
    <!-- <button class="nav-item" @click="emit('placeholder', 'หมวดหมู่')"><span>▥</span><b>หมวดหมู่</b></button>
    <button class="nav-item" @click="emit('placeholder', 'รายการโปรด')"><span>♡</span><b>รายการโปรด</b></button>
    <button class="nav-item" @click="emit('placeholder', 'เพิ่มเติม')"><span>☰</span><b>เพิ่มเติม</b></button> -->
  </nav>
</template>
