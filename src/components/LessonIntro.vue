<template>
  <div class="intro-screen">
    <div class="intro-card">
      <p class="intro-label">学習教材</p>
      <h1>「水の都」を解き明かす</h1>
      <p class="intro-text">
        地図をクリックして、「水の都」の秘密を探ろう
      </p>
      <button class="start-button" @click="$emit('start')">スタート</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LessonIntro',
  emits: ['start']
}
</script>

<style scoped src="../home.css"></style>
