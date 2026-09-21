<script setup>
defineProps({
  page: { type: Object, required: true },
  fontSize: { type: Number, required: true }
})
</script>

<template>
  <article class="paper" data-density="soft">
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
      <div class="paper-page-number" dir="ltr">
        <svg class="page-number-frame" viewBox="0 0 100 130" fill="none" aria-hidden="true" focusable="false">
          <g stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 34 C6 48 6 82 19 96 M81 34 C94 48 94 82 81 96" />
            <path d="M50 4 C44 18 24 25 7 34 L19 41 C30 29 39 31 50 39 C61 31 70 29 81 41 L93 34 C76 25 56 18 50 4 Z" />
            <path d="M23 31 C34 27 43 22 50 15 C57 22 66 27 77 31 M16 35 L22 36 M78 36 L84 35" />
            <path d="M50 126 C44 112 24 105 7 96 L19 89 C30 101 39 99 50 91 C61 99 70 101 81 89 L93 96 C76 105 56 112 50 126 Z" />
            <path d="M23 99 C34 103 43 108 50 115 C57 108 66 103 77 99 M16 95 L22 94 M78 94 L84 95" />
          </g>
          <g fill="currentColor">
            <path d="M50 21 L55 26 L50 31 L45 26 Z M50 99 L55 104 L50 109 L45 104 Z" />
            <path d="M28 36 Q35 28 41 35 Q35 39 28 36 M59 35 Q65 28 72 36 Q65 39 59 35 M28 94 Q35 102 41 95 Q35 91 28 94 M59 95 Q65 102 72 94 Q65 91 59 95" />
          </g>
        </svg>
        <span class="page-number-value">{{ page.sourcePage ?? 'ปก' }}</span>
      </div>
    </div>
  </article>
</template>
