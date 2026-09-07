<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal">
      <header>
        <h2>実績一覧</h2>
        <button class="close" type="button" @click="close">✕</button>
      </header>
      <section class="content">
        <p class="achievement-summary">獲得 <strong>{{ unlockedCount }}/{{ achievements.length }}</strong></p>
        <ul class="achievement-list">
          <li
            v-for="achievement in achievements"
            :key="achievement.id"
            :class="{ unlocked: achievement.unlocked, locked: !achievement.unlocked }"
            class="achievement-item"
          >
            <button
              type="button"
              class="achievement-button"
              @click="selectAchievement(achievement)"
            >
              <span class="achievement-row">
                <span class="achievement-icon-wrap">
                  <img
                    v-if="achievement.unlocked && achievement.image"
                    :src="achievement.image"
                    :alt="achievement.title"
                    class="achievement-icon"
                  />
                  <span v-else class="achievement-icon-placeholder">？</span>
                </span>
                <span class="achievement-text">
                  <span class="achievement-title">{{ achievement.unlocked ? achievement.title : '？？？？？' }}</span>
                  <span class="achievement-description">{{ achievement.unlocked ? achievement.description : '？？？？？' }}</span>
                </span>
              </span>
            </button>
          </li>
        </ul>
      </section>
      <footer>
        <button type="button" @click="close">閉じる</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AchievementListModal',
  props: {
    visible: { type: Boolean, default: false },
    achievements: { type: Array, default: () => [] },
    unlockedCount: { type: Number, default: 0 }
  },
  emits: ['close', 'select-achievement'],
  methods: {
    close() {
      this.$emit('close')
    },
    selectAchievement(achievement) {
      this.$emit('select-achievement', achievement)
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
  width: min(860px, 100%);
  border-radius: 20px;
  overflow: hidden;
  box-sizing: border-box;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 45px rgba(14, 31, 49, 0.16);
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
.content {
  padding: 18px 24px 24px;
}
.achievement-summary {
  margin: 0 0 14px;
  font-size: 0.94rem;
  color: #385a7b;
}
.achievement-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
.achievement-item {
  border: 1px solid #e3eef8;
  border-radius: 12px;
  background: #f8fbff;
}
.achievement-button {
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;
  padding: 10px;
  display: block;
  cursor: pointer;
}
.achievement-row {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 9px;
  align-items: center;
}
.achievement-icon-wrap {
  width: 36px;
  height: 36px;
}
.achievement-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #d5e6f7;
  object-fit: cover;
  display: block;
}
.achievement-icon-placeholder {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #d5e6f7;
  background: #edf3fa;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #6f8398;
  font-weight: 700;
}
.achievement-text {
  display: grid;
  gap: 2px;
  min-width: 0;
}
.achievement-title {
  font-weight: 700;
  font-size: 0.86rem;
  line-height: 1.25;
  white-space: normal;
  word-break: keep-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #2f5b41;
}
.achievement-description {
  font-size: 0.76rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #4f6478;
}
.achievement-item.locked .achievement-title,
.achievement-item.locked .achievement-description {
  color: #6f8398;
}
.achievement-item.unlocked {
  background: #eef6eb;
  border-color: #d7e6d7;
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

@media (max-width: 740px) {
  .modal-overlay {
    align-items: flex-end;
    padding: 0;
  }
  .modal {
    width: 100%;
    max-height: 94vh;
    border-radius: 16px 16px 0 0;
  }
  .content,
  .modal header,
  .modal footer {
    padding-left: 14px;
    padding-right: 14px;
  }
  .achievement-list {
    grid-template-columns: 1fr;
  }
}
</style>
