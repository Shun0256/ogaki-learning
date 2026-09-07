<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal">
      <header>
        <h2>{{ (localMarker && localMarker.name) || '詳細' }}</h2>
        <button class="close" @click="close">✕</button>
      </header>
      <section class="content">
        <div v-if="localMarker && (resolvedImage || localMarker.image)" class="image-wrap">
          <img :src="resolvedImage || localMarker.image" :alt="localMarker && localMarker.name" @error="onImgError" />
        </div>
        <div v-if="localMarker && (localMarker.title || localMarker.explanation || hasSections)" class="explanation">
          <h3 v-if="localMarker.title" class="explanation-title">{{ localMarker.title }}</h3>
          <template v-if="hasSections">
            <div v-for="(section, index) in localMarker.sections" :key="index" class="section-block">
              <h4 v-if="section.subtitle" class="section-subtitle">{{ section.subtitle }}</h4>
              <p v-if="section.text" class="section-text">{{ section.text }}</p>
            </div>
          </template>
          <p v-else-if="localMarker.explanation" class="explanation-text">{{ localMarker.explanation }}</p>
        </div>
        <div v-if="hasMiniQuiz" class="mini-quiz">
          <h4 class="mini-quiz-title">ミニクイズ</h4>
          <p class="mini-quiz-question">{{ localMarker.miniQuiz.question }}</p>
          <ul class="mini-quiz-choices">
            <li v-for="choice in localMarker.miniQuiz.choices" :key="choice.key" class="mini-quiz-choice">
              <label>
                <input
                  type="radio"
                  :name="`mini-quiz-${localMarker.id}`"
                  :value="choice.key"
                  v-model="selectedQuizChoice"
                  :disabled="quizPassed"
                />
                {{ choice.key }}. {{ choice.text }}
              </label>
            </li>
          </ul>
          <div class="mini-quiz-actions">
            <button type="button" class="quiz-check-button" :disabled="quizPassed" @click="checkMiniQuiz">答え合わせ</button>
            <p v-if="quizStatus === 'correct'" class="quiz-feedback success">正解です。チェックボックスが有効になりました。</p>
            <p v-else-if="quizStatus === 'wrong'" class="quiz-feedback error">不正解です。もう一度考えてみましょう。</p>
            <p v-else-if="quizStatus === 'no-choice'" class="quiz-feedback">選択肢を1つ選んでください。</p>
          </div>
        </div>
        <div v-if="localMarker" class="confirmation">
          <label class="confirm-label">
            <input type="checkbox" v-model="understood" :disabled="quizLocked" />
            この内容を理解した
          </label>
          <p v-if="quizLocked" class="confirm-note">ミニクイズに正解するとチェックできます。</p>
        </div>
        <slot />
      </section>
      <footer>
        <button @click="close">閉じる</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarkerDetail',
  props: {
    marker: { type: [Object, Promise], default: null },
    visible: { type: Boolean, default: false },
    resetSignal: { type: Number, default: 0 }
  },
  emits: ['close', 'update-understood', 'mini-quiz-correct'],
  data() {
    return {
      localMarker: null,
      resolvedImage: null,
      understood: false,
      selectedQuizChoice: '',
      quizPassed: false,
      quizStatus: ''
    }
  },
  computed: {
    hasSections() {
      return Array.isArray(this.localMarker?.sections) && this.localMarker.sections.length > 0
    },
    hasMiniQuiz() {
      return Boolean(
        this.localMarker &&
        this.localMarker.miniQuiz &&
        this.localMarker.miniQuiz.question &&
        Array.isArray(this.localMarker.miniQuiz.choices) &&
        this.localMarker.miniQuiz.choices.length > 0
      )
    },
    quizLocked() {
      return this.hasMiniQuiz && !this.quizPassed
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    resolveImage() {
      this.resolvedImage = null
      const m = this.localMarker
      if (m && m.image && typeof m.image.then === 'function') {
        m.image.then(url => { this.resolvedImage = url }).catch(() => { this.resolvedImage = null })
      }
    },
    onImgError(e) {
      try {
        e.target.src = 'https://placehold.co/800x600?text=No+Image'
      } catch (err) {
        // ignore
      }
    },
    storageKey() {
      return this.localMarker && this.localMarker.id ? `marker-understood-${this.localMarker.id}` : null
    },
    miniQuizStorageKey() {
      return this.localMarker && this.localMarker.id ? `marker-mini-quiz-passed-${this.localMarker.id}` : null
    },
    loadMiniQuizState() {
      this.selectedQuizChoice = ''
      this.quizStatus = ''
      this.quizPassed = false
      if (!this.hasMiniQuiz) return
      const key = this.miniQuizStorageKey()
      if (!key) return
      try {
        const stored = localStorage.getItem(key)
        this.quizPassed = stored === 'true'
      } catch (e) {
        this.quizPassed = false
      }
    },
    saveMiniQuizState() {
      const key = this.miniQuizStorageKey()
      if (!key) return
      try {
        localStorage.setItem(key, this.quizPassed ? 'true' : 'false')
      } catch (e) {
        // ignore storage errors
      }
    },
    checkMiniQuiz() {
      if (!this.hasMiniQuiz || this.quizPassed) return
      if (!this.selectedQuizChoice) {
        this.quizStatus = 'no-choice'
        return
      }
      const selected = this.localMarker.miniQuiz.choices.find(c => c.key === this.selectedQuizChoice)
      if (selected && selected.correct) {
        this.quizPassed = true
        this.quizStatus = 'correct'
        this.saveMiniQuizState()
        this.$emit('mini-quiz-correct')
        return
      }
      this.quizPassed = false
      this.quizStatus = 'wrong'
      this.understood = false
      this.saveMiniQuizState()
      this.saveUnderstood()
    },
    loadUnderstood() {
      this.understood = false
      const key = this.storageKey()
      if (!key) return
      try {
        const stored = localStorage.getItem(key)
        this.understood = stored === 'true'
      } catch (e) {
        this.understood = false
      }
      if (this.quizLocked && this.understood) {
        this.understood = false
        this.saveUnderstood()
      }
    },
    saveUnderstood() {
      const key = this.storageKey()
      if (!key) return
      try {
        localStorage.setItem(key, this.understood ? 'true' : 'false')
      } catch (e) {
        // ignore storage errors
      }
    }
  },
  watch: {
    marker: {
      immediate: true,
      handler(n) {
        // marker itself might be a Promise
        if (n && typeof n.then === 'function') {
          this.localMarker = null
          n.then(res => {
            this.localMarker = res
            this.resolveImage()
            this.loadMiniQuizState()
            this.loadUnderstood()
          }).catch(() => { this.localMarker = null })
        } else {
          this.localMarker = n
          this.resolveImage()
          this.loadMiniQuizState()
          this.loadUnderstood()
        }
      }
    },
    visible(val) {
      try { console.log('MarkerDetail visible=', val, this.localMarker) } catch (e) {}
      if (val) {
        this.loadMiniQuizState()
        this.loadUnderstood()
      }
    },
    resetSignal() {
      this.loadMiniQuizState()
      this.loadUnderstood()
    },
    understood(newVal) {
      this.saveUnderstood()
      this.$emit('update-understood', newVal)
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
  width: min(900px, 100%);
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
.explanation {
  margin-top: 16px;
  padding: 16px 0 0;
  border-top: 1px solid #e3eef8;
}
.explanation-title {
  margin: 0 0 14px 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #21425f;
}
.explanation-text {
  margin: 0;
  font-size: 0.96rem;
  line-height: 1.85;
  color: #50657a;
}
.section-block {
  margin-top: 18px;
  padding: 18px 20px;
  background: #f7fbff;
  border: 1px solid #e3eef8;
  border-radius: 14px;
}
.section-subtitle {
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 700;
  color: #2f6fb4;
}
.section-text {
  margin: 0;
  font-size: 0.96rem;
  line-height: 1.95;
  color: #4d6278;
  white-space: pre-line;
}
.confirmation {
  margin-top: 20px;
  padding: 14px 16px;
  background: #eef6ff;
  border: 1px solid #d9e9fb;
  border-radius: 14px;
}
.confirm-label {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.96rem;
  color: #1e3a5f;
}
.confirm-label input {
  width: 18px;
  height: 18px;
  accent-color: #2f6fb4;
}
.confirm-note {
  margin: 10px 0 0;
  font-size: 0.88rem;
  color: #3e5f84;
}
.mini-quiz {
  margin-top: 18px;
  padding: 16px;
  border: 1px solid #d9e9fb;
  border-radius: 14px;
  background: #f7fbff;
}
.mini-quiz-title {
  margin: 0;
  font-size: 1rem;
  color: #21425f;
}
.mini-quiz-question {
  margin: 10px 0 0;
  line-height: 1.8;
  color: #385672;
}
.mini-quiz-choices {
  list-style: none;
  padding: 0;
  margin: 12px 0 0;
}
.mini-quiz-choice + .mini-quiz-choice {
  margin-top: 8px;
}
.mini-quiz-choice label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #2d4b6a;
  line-height: 1.6;
}
.mini-quiz-actions {
  margin-top: 12px;
}
.quiz-check-button {
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
  background: #2f6fb4;
  cursor: pointer;
}
.quiz-check-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.quiz-feedback {
  margin: 10px 0 0;
  font-size: 0.88rem;
  color: #3e5f84;
}
.quiz-feedback.success {
  color: #1d7a43;
}
.quiz-feedback.error {
  color: #b43a3a;
}
.modal header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  border-bottom: 1px solid #e7f0f8;
  background: linear-gradient(135deg, #f8fcff 0%, #eef7ff 100%);
}
.modal .content {
  padding: 28px 32px 30px;
}
.image-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f8fd;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 16px;
  border: 1px solid #e3eef8;
}
.image-wrap img {
  width: min(100%, 420px);
  height: 260px;
  display: block;
  object-fit: cover;
}
.close {
  background: transparent;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #37556f;
}
footer {
  padding: 12px 20px 18px;
  text-align: right;
}
footer button {
  border: none;
  border-radius: 999px;
  background: #2f6fb4;
  color: white;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
