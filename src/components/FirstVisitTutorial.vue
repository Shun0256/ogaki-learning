<template>
  <div
    v-if="visible"
    class="tutorial-overlay"
    role="dialog"
    aria-modal="true"
    aria-label="はじめてのガイド"
    @click.self="$emit('close')"
  >
    <section class="tutorial-modal" aria-live="polite">
      <header class="tutorial-header">
        <div>
          <p class="tutorial-label">はじめてのガイド</p>
          <h2>学習の流れ</h2>
        </div>
        <button type="button" class="tutorial-close" aria-label="閉じる" @click="$emit('close')">✕</button>
      </header>

      <div class="tutorial-progress" aria-hidden="true">
        <span v-for="(_, index) in slides" :key="index" :class="['dot', { active: index === slideIndex }]"></span>
      </div>

      <div class="tutorial-carousel">
        <div class="tutorial-track" :style="trackStyle">
          <article
            v-for="(slide, index) in slides"
            :key="slide.id"
            :class="['tutorial-slide', { active: index === slideIndex }]"
          >
            <p class="slide-step">STEP {{ slide.id }}</p>
            <h3>{{ slide.title }}</h3>
            <p class="slide-message">{{ slide.message }}</p>
          </article>
        </div>
      </div>

      <div class="slide-controls">
        <div class="slide-controls-left">
          <button type="button" class="slide-nav" :disabled="isFirstSlide" @click="goPrevSlide">前へ</button>
          <button type="button" class="slide-nav" :disabled="isLastSlide" @click="goNextSlide">次へ</button>
        </div>
        <div class="slide-controls-right">
          <p class="slide-position">{{ slideIndex + 1 }} / {{ slides.length }}</p>
        </div>
      </div>

      <ol class="tutorial-steps">
        <li :class="stepClass(1)">1. マップをクリック</li>
        <li :class="stepClass(2)">2. ミニクイズに答える</li>
        <li :class="stepClass(3)">3. 「理解した」にチェック</li>
        <li :class="stepClass(4)">4. 確認問題に挑戦</li>
      </ol>

      <footer class="tutorial-actions">
        <button type="button" class="tutorial-secondary" @click="$emit('close')">閉じる</button>
        <button
          v-if="currentStep === 4"
          type="button"
          class="tutorial-primary"
          :disabled="!allInvestigated || learningCompleted"
          @click="$emit('open-confirm-quiz')"
        >
          確認問題を開く
        </button>
      </footer>

      <p v-if="currentStep === 4 && !allInvestigated" class="tutorial-note">
        すべてのスポットを調査すると確認問題に進めます。
      </p>
    </section>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'

export default {
  name: 'FirstVisitTutorial',
  props: {
    visible: { type: Boolean, default: false },
    currentStep: { type: Number, default: 1 },
    allInvestigated: { type: Boolean, default: false },
    learningCompleted: { type: Boolean, default: false }
  },
  emits: ['close', 'open-confirm-quiz'],
  setup(props) {
    const slides = [
      {
        id: 1,
        title: '地図から調査スタート',
        message: 'まずは地図上のマーカーを1つクリックして、スポットの詳細を開きましょう。'
      },
      {
        id: 2,
        title: 'ミニクイズに挑戦',
        message: '詳細にあるミニクイズで正解すると、学習チェックに進めます。'
      },
      {
        id: 3,
        title: '理解を記録',
        message: '内容を読んだら「この内容を理解した」にチェックして学習を記録しましょう。'
      },
      {
        id: 4,
        title: '確認問題で仕上げ',
        message: '全スポットを調査したら、確認問題で理解度を確認しましょう。'
      }
    ]

    const currentStepSlideIndex = computed(() => {
      if (props.currentStep <= 1) return 0
      if (props.currentStep === 2) return 1
      if (props.currentStep === 3) return 2
      return 3
    })

    const manualSlideIndex = ref(0)

    watch(
      () => props.visible,
      (visible) => {
        if (!visible) return
        manualSlideIndex.value = currentStepSlideIndex.value
      },
      { immediate: true }
    )

    watch(
      () => props.currentStep,
      () => {
        manualSlideIndex.value = currentStepSlideIndex.value
      }
    )

    const slideIndex = computed(() => manualSlideIndex.value)

    const trackStyle = computed(() => ({
      transform: `translateX(-${slideIndex.value * 100}%)`
    }))

    const isFirstSlide = computed(() => slideIndex.value <= 0)
    const isLastSlide = computed(() => slideIndex.value >= slides.length - 1)

    const goPrevSlide = () => {
      if (isFirstSlide.value) return
      manualSlideIndex.value -= 1
    }

    const goNextSlide = () => {
      if (isLastSlide.value) return
      manualSlideIndex.value += 1
    }

    const stepClass = (step) => {
      if (props.currentStep > step) return 'done'
      if (props.currentStep === step) return 'active'
      return 'pending'
    }

    return {
      slides,
      slideIndex,
      trackStyle,
      stepClass,
      isFirstSlide,
      isLastSlide,
      goPrevSlide,
      goNextSlide,
      currentStepSlideIndex
    }
  }
}
</script>

<style scoped>
.tutorial-overlay {
  position: fixed;
  inset: 0;
  z-index: 12500;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(11, 28, 45, 0.34);
  backdrop-filter: blur(1px);
  padding: 18px;
}

.tutorial-modal {
  width: min(860px, calc(100vw - 36px));
  max-height: min(88vh, 700px);
  overflow-y: auto;
  border-radius: 22px;
  border: 1px solid #d9e6f3;
  background: #fbfdff;
  box-shadow: 0 16px 34px rgba(11, 28, 45, 0.16);
  padding: 18px 18px 16px;
  display: grid;
  gap: 12px;
}

.tutorial-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  padding-right: 60px;
}

.tutorial-label {
  margin: 0 0 6px;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #2f6ca1;
  text-transform: uppercase;
}

.tutorial-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 42px;
  height: 42px;
  border: 1px solid #d7e6f7;
  border-radius: 999px;
  background: #f7fbff;
  color: #2b5177;
  font-size: 1.05rem;
  line-height: 1;
  cursor: pointer;
}

.tutorial-header h2 {
  margin: 0;
  font-size: clamp(1.3rem, 2vw, 1.9rem);
  color: #153551;
  line-height: 1.25;
}

.tutorial-progress {
  display: flex;
  gap: 7px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #d2e0ef;
  transition: background-color 0.25s ease, transform 0.25s ease;
}

.dot.active {
  background: #2f6fb4;
  transform: scale(1.2);
}

.tutorial-carousel {
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid #deebf6;
  background: #ffffff;
}

.slide-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.slide-controls-left,
.slide-controls-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.slide-nav {
  border: 1px solid #ccdff2;
  border-radius: 10px;
  padding: 7px 11px;
  background: #f4f9ff;
  color: #2a5074;
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;
}

.slide-nav:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.slide-position {
  margin: 0;
  font-size: 0.84rem;
  color: #4a6682;
  font-weight: 700;
}

.tutorial-track {
  display: flex;
  transition: transform 0.35s ease;
}

.tutorial-slide {
  flex: 0 0 100%;
  padding: 18px;
  min-height: 150px;
  display: grid;
  align-content: start;
  gap: 8px;
  opacity: 0.82;
}

.tutorial-slide.active {
  opacity: 1;
}

.slide-step {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #4f75a0;
}

.tutorial-slide h3 {
  margin: 0;
  font-size: clamp(1.2rem, 1.8vw, 1.5rem);
  color: #1d3d5c;
}

.slide-message {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.7;
  color: #3e5b78;
}

.tutorial-steps {
  margin: 0;
  padding-left: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px 12px;
  color: #4b6783;
  font-size: 0.9rem;
}

.tutorial-steps li {
  line-height: 1.45;
}

.tutorial-steps li.done {
  color: #2b7b49;
  font-weight: 700;
}

.tutorial-steps li.active {
  color: #2f6fb4;
  font-weight: 700;
}

.tutorial-steps li.pending {
  color: #698198;
}

.tutorial-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.tutorial-secondary {
  border: 1px solid #ccddf0;
  border-radius: 12px;
  padding: 9px 13px;
  background: #f4f8fc;
  color: #305173;
  font-weight: 700;
  cursor: pointer;
}

.tutorial-primary {
  border: none;
  border-radius: 12px;
  padding: 9px 15px;
  background: #2f6fb4;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

.tutorial-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tutorial-note,
.tutorial-complete {
  margin: 0;
  font-size: 0.9rem;
  color: #4e667f;
}

@media (max-width: 768px) {
  .tutorial-overlay {
    padding: 10px;
  }

  .tutorial-modal {
    width: calc(100vw - 20px);
    border-radius: 18px;
    padding: 12px;
    gap: 8px;
  }

  .tutorial-header {
    padding-right: 54px;
  }

  .tutorial-header h2 {
    font-size: 1.28rem;
    line-height: 1.35;
    word-break: break-word;
  }

  .tutorial-slide {
    min-height: 132px;
    padding: 14px;
  }

  .slide-message {
    font-size: 0.9rem;
  }

  .tutorial-steps {
    font-size: 0.85rem;
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .slide-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .slide-controls-left,
  .slide-controls-right {
    width: 100%;
    justify-content: space-between;
  }

  .slide-position {
    font-size: 0.8rem;
  }

  .slide-nav,
  .slide-sync {
    flex: 1;
    text-align: center;
    padding: 9px 10px;
  }

  .tutorial-actions {
    flex-direction: column;
  }

  .tutorial-secondary,
  .tutorial-primary {
    width: 100%;
  }
}
</style>