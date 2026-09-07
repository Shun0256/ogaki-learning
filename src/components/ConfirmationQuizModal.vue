<template>
  <div v-if="visible" class="quiz-overlay" @click.self="close">
    <div class="quiz-modal" ref="quizModalRef">
      <header class="quiz-header">
        <h2>確認問題</h2>
        <button class="close" type="button" @click="close">✕</button>
      </header>

      <section class="quiz-content">
        <p class="quiz-lead">全10問です。学習した内容をふりかえって答えましょう。</p>
        <div class="mobile-compact-status" aria-live="polite">
          <div class="mobile-status-row" v-if="!submitted">
            <p>回答済み {{ answeredCount }} / {{ questions.length }}</p>
            <p>残り {{ questions.length - answeredCount }} 問</p>
          </div>
          <div class="mobile-status-row" v-else>
            <p>採点完了</p>
            <p>{{ score }} / {{ questions.length }} 点</p>
          </div>
          <div class="mobile-progress-track" v-if="!submitted">
            <span class="mobile-progress-fill" :style="{ width: progressPercent + '%' }"></span>
          </div>
        </div>

        <template v-if="!submitted">
          <p class="quiz-progress">{{ currentQuestionIndex + 1 }} / {{ questions.length }} 問</p>

          <article class="question-card single-question-card">
            <h3>問{{ currentQuestionIndex + 1 }}</h3>
            <p class="question-text">{{ currentQuestion.question }}</p>

            <ul class="option-list">
              <li v-for="option in currentQuestion.options" :key="option.key">
                <label>
                  <input
                    type="radio"
                    :name="`confirm-quiz-${currentQuestion.id}`"
                    :value="option.key"
                    v-model="answers[currentQuestionIndex]"
                  />
                  {{ option.key }}. {{ option.text }}
                </label>
              </li>
            </ul>
          </article>
        </template>

        <template v-else>
          <article v-for="(q, qIndex) in questions" :key="q.id" :class="['question-card', isCorrect(qIndex) ? 'card-correct' : 'card-wrong']">
            <h3>
              問{{ qIndex + 1 }}
              <span :class="isCorrect(qIndex) ? 'result-mark correct' : 'result-mark wrong'">
                {{ isCorrect(qIndex) ? '○' : '✕' }}
              </span>
            </h3>
            <p :class="['question-text', isCorrect(qIndex) ? 'qtext-correct' : 'qtext-wrong']">
              {{ q.question }}
            </p>

            <ul class="option-list">
              <li v-for="option in q.options" :key="option.key">
                <label :class="optionLabelClass(qIndex, option)">
                  <input
                    type="radio"
                    :name="`confirm-quiz-${q.id}`"
                    :value="option.key"
                    v-model="answers[qIndex]"
                    :disabled="submitted"
                  />
                  {{ option.key }}. {{ option.text }}
                </label>
              </li>
            </ul>
          </article>
        </template>

        <div v-if="submitted" class="result-box">
          <p class="score">結果: {{ score }} / {{ questions.length }} 問 正解</p>
          <p class="result-note">○ 正解・✕ 不正解は各問題に表示。正解選択肢を<span class="note-correct">緑</span>、誤選択肢を<span class="note-wrong">赤</span>でハイライトしています。</p>
        </div>
      </section>

      <footer class="quiz-footer">
        <button type="button" class="secondary" @click="close">閉じる</button>
        <template v-if="!submitted">
          <button type="button" class="secondary" @click="goToPrevQuestion" :disabled="!hasPrevQuestion">前の問題</button>
          <button
            v-if="hasNextQuestion"
            type="button"
            class="primary"
            @click="goToNextQuestion"
          >
            次の問題
          </button>
          <button v-else type="button" class="primary" @click="submitQuiz">採点する</button>
        </template>
        <button v-else type="button" class="primary" @click="resetQuiz">もう一度解く</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, nextTick } from 'vue'

const PASSING_SCORE = 7

const QUESTIONS = [
  {
    id: 1,
    question: '大垣市が「水の都」と呼ばれる主な理由は何ですか。',
    options: [
      { key: 'A', text: '海に面しているから' },
      { key: 'B', text: '地下水や川が豊富だから' },
      { key: 'C', text: '湖が多いから' },
      { key: 'D', text: '雨の日が多いから' }
    ],
    correctKey: 'B'
  },
  {
    id: 2,
    question: '水門川の昔の役割として正しいものはどれですか。',
    options: [
      { key: 'A', text: '農地だった' },
      { key: 'B', text: '船で荷物を運ぶ水運として利用された' },
      { key: 'C', text: '城の天守だった' },
      { key: 'D', text: '発電所として使われた' }
    ],
    correctKey: 'B'
  },
  {
    id: 3,
    question: '船町港跡は何を行うための港でしたか。',
    options: [
      { key: 'A', text: '漁業' },
      { key: 'B', text: '水運による物流の拠点' },
      { key: 'C', text: '海外貿易' },
      { key: 'D', text: '観光船専用' }
    ],
    correctKey: 'B'
  },
  {
    id: 4,
    question: '奥の細道むすびの地記念館に関係する人物は誰ですか。',
    options: [
      { key: 'A', text: '徳田日長' },
      { key: 'B', text: '徳川家康' },
      { key: 'C', text: '松尾芭蕉' },
      { key: 'D', text: '豊臣秀吉' }
    ],
    correctKey: 'C'
  },
  {
    id: 5,
    question: '大垣城について正しい説明はどれですか。',
    options: [
      { key: 'A', text: '日本一高い城' },
      { key: 'B', text: '関ヶ原の戦いにゆかりがある' },
      { key: 'C', text: '海の上に建てられた城' },
      { key: 'D', text: '現在も天守に人が住んでいる' }
    ],
    correctKey: 'B'
  },
  {
    id: 6,
    question: '四季の広場では何を楽しむことができますか。',
    options: [
      { key: 'A', text: 'スキー' },
      { key: 'B', text: '四季折々の花や自然景観' },
      { key: 'C', text: '遊園地のアトラクション' },
      { key: 'D', text: '動物園' }
    ],
    correctKey: 'B'
  },
  {
    id: 7,
    question: '加賀野八幡神社の特徴として正しいものはどれですか。',
    options: [
      { key: 'A', text: '湧水があり、「名水」として知られている' },
      { key: 'B', text: '日本一大きな鐘がある' },
      { key: 'C', text: 'ロープウェイがある' },
      { key: 'D', text: '温泉が湧いている' }
    ],
    correctKey: 'A'
  },
  {
    id: 8,
    question: 'スイトピアセンターはどのような施設ですか。',
    options: [
      { key: 'A', text: '商業施設' },
      { key: 'B', text: '文化・学習施設' },
      { key: 'C', text: '工場' },
      { key: 'D', text: '空港' }
    ],
    correctKey: 'B'
  },
  {
    id: 9,
    question: 'これらのスポットに共通するテーマとして最も適切なのはどれですか。',
    options: [
      { key: 'A', text: '海の文化' },
      { key: 'B', text: '水と歴史・文化のつながり' },
      { key: 'C', text: '火山活動' },
      { key: 'D', text: '宇宙開発' }
    ],
    correctKey: 'B'
  },
  {
    id: 10,
    question: '大垣市の魅力として最も伝えたかったことは何ですか。',
    options: [
      { key: 'A', text: '高い山が多いこと' },
      { key: 'B', text: '豊かな水と歴史・文化が今も暮らしにつながっていること' },
      { key: 'C', text: '日本一人口が多いこと' },
      { key: 'D', text: '雪が多いこと' }
    ],
    correctKey: 'B'
  }
]

export default {
  name: 'ConfirmationQuizModal',
  props: {
    visible: { type: Boolean, default: false }
  },
  emits: ['close', 'completed', 'perfect-score'],
  setup(props, { emit }) {
    const questions = QUESTIONS
    const answers = ref(Array.from({ length: questions.length }, () => ''))
    const submitted = ref(false)
    const currentQuestionIndex = ref(0)
    const quizModalRef = ref(null)

    const currentQuestion = computed(() => questions[currentQuestionIndex.value])
    const hasPrevQuestion = computed(() => currentQuestionIndex.value > 0)
    const hasNextQuestion = computed(() => currentQuestionIndex.value < questions.length - 1)
    const answeredCount = computed(() => {
      return answers.value.filter((answer) => answer !== '').length
    })
    const progressPercent = computed(() => {
      return Math.round((answeredCount.value / questions.length) * 100)
    })

    const score = computed(() => {
      return questions.reduce((sum, q, idx) => {
        return sum + (answers.value[idx] === q.correctKey ? 1 : 0)
      }, 0)
    })

    const close = () => emit('close')

    const submitQuiz = () => {
      submitted.value = true
      nextTick(() => {
        if (quizModalRef.value) quizModalRef.value.scrollTop = 0
      })
      if (score.value >= PASSING_SCORE) {
        emit('completed')
      }
      if (score.value === questions.length) {
        emit('perfect-score')
      }
    }

    const resetQuiz = () => {
      submitted.value = false
      currentQuestionIndex.value = 0
      answers.value = Array.from({ length: questions.length }, () => '')
    }

    const goToPrevQuestion = () => {
      if (!hasPrevQuestion.value) return
      currentQuestionIndex.value -= 1
    }

    const goToNextQuestion = () => {
      if (!hasNextQuestion.value) return
      currentQuestionIndex.value += 1
    }

    const isCorrect = (questionIndex) => {
      return answers.value[questionIndex] === questions[questionIndex].correctKey
    }

    const optionLabelClass = (questionIndex, option) => {
      if (!submitted.value) return ''
      const correctKey = questions[questionIndex].correctKey
      const selectedKey = answers.value[questionIndex]

      if (option.key === correctKey) return 'option-correct'
      if (option.key === selectedKey && selectedKey !== correctKey) return 'option-wrong'
      return ''
    }

    watch(() => props.visible, (val) => {
      if (!val) return
      submitted.value = false
      currentQuestionIndex.value = 0
      answers.value = Array.from({ length: questions.length }, () => '')
    })

    return {
      questions,
      answers,
      submitted,
      currentQuestionIndex,
      currentQuestion,
      hasPrevQuestion,
      hasNextQuestion,
      answeredCount,
      progressPercent,
      score,
      close,
      submitQuiz,
      resetQuiz,
      goToPrevQuestion,
      goToNextQuestion,
      optionLabelClass,
      isCorrect,
      quizModalRef
    }
  }
}
</script>

<style scoped>
.quiz-overlay {
  position: fixed;
  inset: 0;
  z-index: 11000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(14, 31, 49, 0.5);
  padding: 14px 12px;
}
.quiz-modal {
  width: min(760px, calc(100vw - 24px));
  max-height: 92vh;
  overflow-y: auto;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 20px 45px rgba(14, 31, 49, 0.22);
  margin: 0 auto;
}
.quiz-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e5edf7;
  background: #f6faff;
}
.quiz-content {
  padding: 20px;
}
.quiz-lead {
  margin: 0 0 14px;
  color: #35506c;
}
.quiz-progress {
  margin: 0 0 8px;
  font-size: 0.95rem;
  font-weight: 700;
  color: #2b4f70;
}
.question-card {
  border-top: 1px solid #e8eef6;
  padding: 16px 0 16px 12px;
  border-left: 4px solid transparent;
  transition: border-color 0.3s;
}
.single-question-card {
  border-radius: 0 8px 8px 0;
  background: #f8fbff;
}
.question-card.card-correct {
  border-left-color: #28a857;
  background: #f6fdf9;
  border-radius: 0 8px 8px 0;
}
.question-card.card-wrong {
  border-left-color: #d93636;
  background: #fff8f8;
  border-radius: 0 8px 8px 0;
}
.question-card h3 {
  margin: 0;
  font-size: 1.05rem;
  color: #1f3f5f;
  display: flex;
  align-items: center;
  gap: 6px;
}
.result-mark {
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1;
}
.result-mark.correct {
  color: #1a8a40;
}
.result-mark.wrong {
  color: #c0392b;
}
.question-text {
  margin: 8px 0 0;
  color: #304d68;
  line-height: 1.7;
}
.qtext-correct {
  color: #145c30;
}
.qtext-wrong {
  color: #7a2020;
}
.option-list {
  margin: 10px 0 0;
  padding-left: 18px;
}
.option-list li + li {
  margin-top: 7px;
}
.option-list label {
  color: #213f5d;
  line-height: 1.5;
}
.option-correct {
  color: #145c30;
  font-weight: 700;
  background: #d4f0de;
  border-radius: 6px;
  padding: 3px 8px;
  display: inline-block;
}
.option-wrong {
  color: #8b1a1a;
  font-weight: 600;
  background: #fde8e8;
  border-radius: 6px;
  padding: 3px 8px;
  display: inline-block;
  text-decoration: line-through;
}
.result-box {
  margin-top: 10px;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #d7e7f8;
  background: #f3f9ff;
}
.score {
  margin: 0;
  font-weight: 700;
  color: #1e456b;
}
.result-note {
  margin: 6px 0 0;
  font-size: 0.9rem;
  color: #486681;
}
.note-correct {
  color: #1a8a40;
  font-weight: 700;
}
.note-wrong {
  color: #c0392b;
  font-weight: 700;
}
.quiz-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 20px 20px;
}
.mobile-compact-status {
  display: none;
}
.primary,
.secondary,
.close {
  border: none;
  cursor: pointer;
}
.primary,
.secondary {
  border-radius: 10px;
  padding: 10px 14px;
  font-size: 0.93rem;
  font-weight: 700;
}
.primary {
  background: #2f7aeb;
  color: #fff;
}
.secondary {
  background: #edf3fb;
  color: #2b4a68;
}
.primary:disabled,
.secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.close {
  background: transparent;
  color: #3a5875;
  font-size: 1rem;
}
@media (max-width: 768px) {
  .quiz-overlay {
    padding: 0;
    align-items: flex-end;
  }
  .quiz-modal {
    width: 100vw;
    max-height: 96vh;
    border-radius: 18px 18px 0 0;
  }
  .quiz-content,
  .quiz-header,
  .quiz-footer {
    padding-left: 14px;
    padding-right: 14px;
  }
  .quiz-header {
    position: sticky;
    top: 0;
    z-index: 2;
    background: #f6faff;
  }
  .quiz-content {
    padding-bottom: 12px;
  }
  .quiz-footer {
    position: sticky;
    bottom: 0;
    z-index: 2;
    background: #ffffff;
    border-top: 1px solid #e5edf7;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    padding-top: 12px;
    padding-bottom: calc(12px + env(safe-area-inset-bottom));
  }
  .quiz-footer .primary,
  .quiz-footer .secondary {
    width: 100%;
    min-height: 44px;
    font-size: 0.96rem;
  }
  .quiz-footer .close,
  .quiz-footer .secondary:first-child {
    grid-column: span 2;
  }
  .mobile-compact-status {
    display: block;
    margin: 0 0 12px;
    padding: 10px 12px;
    border: 1px solid #dce9f5;
    border-radius: 10px;
    background: #f8fbff;
  }
  .mobile-status-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    color: #2a4f71;
    font-size: 0.88rem;
    font-weight: 700;
  }
  .mobile-progress-track {
    margin-top: 8px;
    width: 100%;
    height: 6px;
    background: #e5eef8;
    border-radius: 999px;
    overflow: hidden;
  }
  .mobile-progress-fill {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, #2f7aeb 0%, #44a3ff 100%);
    border-radius: 999px;
    transition: width 0.2s ease;
  }
  .question-card {
    padding-left: 10px;
  }
  .option-list {
    margin-top: 12px;
    padding-left: 0;
    list-style: none;
  }
  .option-list li + li {
    margin-top: 9px;
  }
  .option-list label {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    background: #ffffff;
    border: 1px solid #e7f1f9;
  }
  .option-list input[type='radio'] {
    margin-top: 2px;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
}
</style>
