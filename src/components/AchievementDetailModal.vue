<template>
  <div v-if="visible && achievement" class="modal-overlay" @click.self="close">
    <div class="modal">
      <header>
        <h2>{{ achievement.unlocked ? achievement.title : '？？？？？' }}</h2>
        <button class="close" @click="close">✕</button>
      </header>
      <section class="content">
        <div class="achievement-summary-row">
          <div class="achievement-icon-wrap">
            <img
              v-if="achievement.unlocked && achievement.image"
              :src="achievement.image"
              :alt="achievement.title"
              class="achievement-icon"
              @error="onImgError"
            />
            <span v-else class="achievement-icon-placeholder">？</span>
          </div>
          <div class="achievement-body">
            <p class="achievement-description">{{ achievement.unlocked ? achievement.description : 'この実績は未開放です。' }}</p>
            <p class="achievement-detail">{{ achievement.unlocked ? achievement.detailAfterOpen : formatUnlockCondition(achievement) }}</p>
          </div>
        </div>
      </section>
      <footer>
        <button @click="close">閉じる</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AchievementDetailModal',
  props: {
    visible: { type: Boolean, default: false },
    achievement: { type: Object, default: null }
  },
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close')
    },
    onImgError(event) {
      try {
        event.target.src = 'https://placehold.co/800x600?text=No+Image'
      } catch (e) {
        // ignore
      }
    },
    formatUnlockCondition(achievement) {
      if (!achievement) return '解放条件：条件を満たすと解放されます。'
      return `解放条件：${achievement.description || '条件を満たすと解放されます。'}`
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(14, 31, 49, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}
.modal {
  background: #fcfeff;
  width: min(720px, 100%);
  border-radius: 20px;
  overflow: hidden;
  box-sizing: border-box;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 45px rgba(14, 31, 49, 0.16);
}
.modal .content {
  padding: 24px 28px 28px;
}
.achievement-summary-row {
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
}
.achievement-icon-wrap {
  width: 52px;
  height: 52px;
}
.achievement-icon {
  width: 52px;
  height: 52px;
  border-radius: 10px;
  border: 1px solid #d5e6f7;
  object-fit: cover;
  display: block;
}
.achievement-icon-placeholder {
  width: 52px;
  height: 52px;
  border-radius: 10px;
  border: 1px solid #d5e6f7;
  background: #edf3fa;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #6f8398;
  font-weight: 700;
}
.achievement-body {
  display: grid;
  gap: 12px;
}
.achievement-description {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #21425f;
}
.achievement-detail {
  margin: 0;
  line-height: 1.85;
  color: #4d6278;
  white-space: pre-line;
}
.modal header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  border-bottom: 1px solid #e3eef8;
}
.modal header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #1f4669;
}
.close {
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
  color: #33506e;
}
.modal footer {
  padding: 16px 24px 24px;
  display: flex;
  justify-content: flex-end;
}
.modal footer button {
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  background: #2f7aeb;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}
</style>
