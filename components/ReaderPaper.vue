<script setup>
defineProps({
  page: { type: Object, required: true },
  fontSize: { type: Number, required: true },
  turnClass: { type: String, default: '' }
})
</script>

<template>
  <article class="paper" :class="turnClass">
    <div class="page-curl" aria-hidden="true" />
    <div class="corner tl">✦</div><div class="corner tr">✦</div>
    <div class="corner bl">✦</div><div class="corner br">✦</div>
    <div class="paper-inner">
      <div class="arabic-content" lang="ar" dir="rtl" :style="{ fontSize: `${fontSize}px` }">
        <p v-for="(paragraph, index) in page.arabicText.split('\n\n')" :key="index">{{ paragraph }}</p>
        <div v-if="page.secondaryText" class="secondary-text" dir="ltr">{{ page.secondaryText }}</div>
        <div v-if="page.status === 'draft_user_review'" class="verification" dir="ltr">
          ฉบับถอดข้อความเบื้องต้น • รอผู้ใช้ตรวจสอบกับภาพต้นฉบับ
        </div>
      </div>
      <div class="paper-page-number">{{ page.sourcePage ?? 'ปก' }}</div>
    </div>
  </article>
</template>
