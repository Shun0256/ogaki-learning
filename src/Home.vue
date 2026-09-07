<template>
  <div class="home">
    <LessonIntro v-if="showIntro" @start="startLesson" />
    <LessonMapView v-else :is-visible="!showIntro" />
  </div>
</template>

<script>
import { ref } from 'vue'
import LessonIntro from './components/LessonIntro.vue'
import LessonMapView from './components/LessonMapView.vue'

const INTRO_SEEN_STORAGE_KEY = 'lesson-intro-seen'

export default {
  name: 'Home',
  components: {
    LessonIntro,
    LessonMapView
  },
  setup() {
    const showIntro = ref(true)

    const startLesson = () => {
      showIntro.value = false
      try {
        localStorage.setItem(INTRO_SEEN_STORAGE_KEY, 'true')
      } catch (e) {
        // ignore storage errors
      }
    }

    return {
      showIntro,
      startLesson
    }
  }
}
</script>

<style scoped src="./home.css"></style>
