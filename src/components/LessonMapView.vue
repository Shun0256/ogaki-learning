<template>
  <div class="lesson-content">
    <h1 class="lesson-page-title">地図をクリックして、「水の都」の秘密を探ろう</h1>
    <div class="map-status-layout">
      <aside class="achievement-panel status-panel">
        <h2>実績</h2>
        <div class="achievement-desktop">
          <p class="achievement-summary">獲得 <strong>{{ unlockedAchievementCount }}/{{ achievements.length }}</strong></p>
          <ul class="achievement-list">
            <li
              v-for="achievement in achievements"
              :key="achievement.id"
              :class="{ unlocked: achievement.unlocked, locked: !achievement.unlocked }"
              class="achievement-item"
            >
              <button
                type="button"
              loadFirstVisitTutorialState()

                class="achievement-button"
                @click="openAchievement(achievement)"
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
        </div>

        <div class="achievement-mobile">
          <p class="achievement-summary">獲得 <strong>{{ unlockedAchievementCount }}/{{ achievements.length }}</strong></p>
          <p v-if="nextLockedAchievement" class="achievement-next">
            次の目標: {{ nextLockedAchievement.description }}
          </p>
          <p v-else class="achievement-next achievement-next-complete">
            すべての実績を達成しました。
          </p>
          <button type="button" class="achievement-list-open" @click="openAchievementListModal">
            実績一覧を見る
          </button>
        </div>
      </aside>
      <div class="map-container">
        <div id="map"></div>
      </div>
      <aside class="status-panel">
        <h2>調査状況</h2>
        <p class="status-summary">調査済み <strong>{{ investigatedCount }}/{{ totalMarkers }}</strong></p>
        <p v-if="learningCompleted" class="learning-complete-badge">学習完了</p>
        <ul class="status-list">
          <li v-for="marker in markerList" :key="marker.id" :class="{ done: isInvestigated(marker) }" class="status-item">
            <span>{{ marker.name }}</span>
            <span>{{ isInvestigated(marker) ? '済' : '未' }}</span>
          </li>
        </ul>
        <button class="confirm-quiz-button" type="button" :disabled="!allInvestigated" @click="openConfirmQuiz">
          {{ learningCompleted ? '確認問題へ（再挑戦）' : '確認問題へ' }}
        </button>
        <button class="tutorial-open-button" type="button" @click="reopenFirstVisitTutorial">
          チュートリアルを見る
        </button>
      </aside>
    </div>
    <MarkerDetail
      :marker="selectedMarker"
      :visible="showDetail"
      :resetSignal="resetSignal"
      @close="showDetail = false"
      @update-understood="refreshInvestigationCount"
      @mini-quiz-correct="refreshInvestigationCount"
    />
    <ConfirmationQuizModal
      :visible="showConfirmQuiz"
      @close="showConfirmQuiz = false"
      @completed="markLearningCompleted"
      @perfect-score="markQuizPerfectScoreCompleted"
    />
    <AchievementDetailModal
      :visible="showAchievementModal"
      :achievement="selectedAchievement"
      @close="showAchievementModal = false"
    />
    <AchievementListModal
      :visible="showAchievementListModal"
      :achievements="achievements"
      :unlocked-count="unlockedAchievementCount"
      @close="showAchievementListModal = false"
      @select-achievement="openAchievement"
    />
    <FirstVisitTutorial
      :visible="showFirstVisitTutorial"
      :current-step="tutorialCurrentStep"
      :all-investigated="allInvestigated"
      :learning-completed="learningCompleted"
      @close="completeFirstVisitTutorial"
      @open-confirm-quiz="openConfirmQuiz"
    />
    <div v-if="unlockPopupAchievement" class="achievement-unlock-popup" role="status" aria-live="polite">
      <div class="achievement-unlock-header">実績を達成しました</div>
      <div class="achievement-unlock-content">
        <img
          v-if="unlockPopupAchievement.image"
          :src="unlockPopupAchievement.image"
          :alt="unlockPopupAchievement.title"
          class="achievement-unlock-icon"
        />
        <div class="achievement-unlock-text">
          <p class="achievement-unlock-title">{{ unlockPopupAchievement.title }}</p>
          <p class="achievement-unlock-description">{{ unlockPopupAchievement.description }}</p>
        </div>
      </div>
      <button class="achievement-unlock-close" type="button" @click="hideUnlockPopup">閉じる</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue'
import MarkerDetail from './MarkerDetail.vue'
import ConfirmationQuizModal from './ConfirmationQuizModal.vue'
import AchievementDetailModal from './AchievementDetailModal.vue'
import AchievementListModal from './AchievementListModal.vue'
import FirstVisitTutorial from './FirstVisitTutorial.vue'
import { addMarkers, getMarkers } from '../mapMarkers'
import { resolveAchievements } from '../achievements'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
})

const DefaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

export default {
  name: 'LessonMapView',
  components: {
    MarkerDetail,
    ConfirmationQuizModal,
    AchievementDetailModal,
    AchievementListModal,
    FirstVisitTutorial
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    let map = null
    const markerList = ref(getMarkers())
    const totalMarkers = markerList.value.length
    const investigatedIds = ref(new Set())
    const selectedMarker = ref(null)
    const showDetail = ref(false)
    const showConfirmQuiz = ref(false)
    const selectedAchievement = ref(null)
    const showAchievementModal = ref(false)
    const showAchievementListModal = ref(false)
    const unlockPopupAchievement = ref(null)
    const learningCompleted = ref(false)
    const quizPerfectScoreCompleted = ref(false)
    const openedDetailCount = ref(0)
    const miniQuizCorrectCount = ref(0)
    const achievementsWatchReady = ref(false)
    const resetSignal = ref(0)
    const showFirstVisitTutorial = ref(false)
    let unlockPopupTimer = null

    const COMPLETION_STORAGE_KEY = 'lesson-learning-completed'
    const QUIZ_PERFECT_COMPLETION_STORAGE_KEY = 'lesson-quiz-perfect-completed'
    const OPENED_DETAIL_ONCE_STORAGE_KEY = 'lesson-opened-detail-once'
    const OPENED_DETAIL_IDS_STORAGE_KEY = 'lesson-opened-detail-ids'
    const ACHIEVEMENT_NOTIFIED_PREFIX = 'achievement-notified-'
    const FIRST_VISIT_TUTORIAL_DONE_KEY = 'lesson-first-visit-tutorial-done'

    const loadLearningCompleted = () => {
      try {
        learningCompleted.value = localStorage.getItem(COMPLETION_STORAGE_KEY) === 'true'
      } catch (e) {
        learningCompleted.value = false
      }
    }

    const loadQuizPerfectScoreCompleted = () => {
      try {
        quizPerfectScoreCompleted.value = localStorage.getItem(QUIZ_PERFECT_COMPLETION_STORAGE_KEY) === 'true'
      } catch (e) {
        quizPerfectScoreCompleted.value = false
      }
    }

    const persistLearningCompleted = (value) => {
      learningCompleted.value = value
      try {
        localStorage.setItem(COMPLETION_STORAGE_KEY, value ? 'true' : 'false')
      } catch (e) {
        // ignore storage errors
      }
    }

    const markLearningCompleted = () => {
      if (!allInvestigated.value) return
      persistLearningCompleted(true)
    }

    const markQuizPerfectScoreCompleted = () => {
      if (!allInvestigated.value) return
      quizPerfectScoreCompleted.value = true
      try {
        localStorage.setItem(QUIZ_PERFECT_COMPLETION_STORAGE_KEY, 'true')
      } catch (e) {
        // ignore storage errors
      }
    }

    const isInvestigated = (marker) => investigatedIds.value.has(marker.id)
    const refreshInvestigationCount = () => {
      const ids = new Set()
      const miniQuizPassedIds = new Set()
      markerList.value.forEach(marker => {
        if (!marker.id) return
        try {
          if (localStorage.getItem(`marker-understood-${marker.id}`) === 'true') {
            ids.add(marker.id)
          }
          if (localStorage.getItem(`marker-mini-quiz-passed-${marker.id}`) === 'true') {
            miniQuizPassedIds.add(marker.id)
          }
        } catch (e) {
          // ignore storage errors
        }
      })
      investigatedIds.value = ids
      miniQuizCorrectCount.value = miniQuizPassedIds.size
    }
    const loadOpenedDetailCount = () => {
      try {
        const storedIds = localStorage.getItem(OPENED_DETAIL_IDS_STORAGE_KEY)
        if (storedIds) {
          const parsedIds = JSON.parse(storedIds)
          openedDetailCount.value = Array.isArray(parsedIds) ? new Set(parsedIds).size : 0
          return
        }
        openedDetailCount.value = localStorage.getItem(OPENED_DETAIL_ONCE_STORAGE_KEY) === 'true' ? 1 : 0
      } catch (e) {
        openedDetailCount.value = 0
      }
    }

    const markDetailOpened = (markerId) => {
      if (!markerId) return
      try {
        const storedIds = localStorage.getItem(OPENED_DETAIL_IDS_STORAGE_KEY)
        const parsedIds = storedIds ? JSON.parse(storedIds) : []
        const openedIds = new Set(Array.isArray(parsedIds) ? parsedIds : [])
        const beforeSize = openedIds.size
        openedIds.add(markerId)
        openedDetailCount.value = openedIds.size
        if (openedIds.size === beforeSize) return
        localStorage.setItem(OPENED_DETAIL_IDS_STORAGE_KEY, JSON.stringify([...openedIds]))
        localStorage.setItem(OPENED_DETAIL_ONCE_STORAGE_KEY, 'true')
      } catch (e) {
        openedDetailCount.value += 1
      }
    }

    const allInvestigated = computed(() => investigatedIds.value.size > 0 && investigatedIds.value.size === totalMarkers)
    const achievements = computed(() => resolveAchievements({
      investigatedCount: investigatedIds.value.size,
      investigatedIds: investigatedIds.value,
      totalMarkers,
      openedDetailCount: openedDetailCount.value,
      miniQuizCorrectCount: miniQuizCorrectCount.value,
      learningCompleted: learningCompleted.value,
      quizPerfectScoreCompleted: quizPerfectScoreCompleted.value
    }))
    const unlockedAchievementCount = computed(() => achievements.value.filter(achievement => achievement.unlocked).length)
    const nextLockedAchievement = computed(() => achievements.value.find(achievement => !achievement.unlocked) || null)

    const openConfirmQuiz = () => {
      if (!allInvestigated.value) return
      showConfirmQuiz.value = true
    }

    const openAchievement = (achievement) => {
      if (!achievement) return
      selectedAchievement.value = achievement
      showAchievementListModal.value = false
      showAchievementModal.value = true
    }

    const openAchievementListModal = () => {
      showAchievementListModal.value = true
    }

    const loadFirstVisitTutorialState = () => {
      try {
        showFirstVisitTutorial.value = localStorage.getItem(FIRST_VISIT_TUTORIAL_DONE_KEY) !== 'true'
      } catch (e) {
        showFirstVisitTutorial.value = true
      }
    }

    const completeFirstVisitTutorial = () => {
      showFirstVisitTutorial.value = false
      try {
        localStorage.setItem(FIRST_VISIT_TUTORIAL_DONE_KEY, 'true')
      } catch (e) {
        // ignore storage errors
      }
    }

    const reopenFirstVisitTutorial = () => {
      showFirstVisitTutorial.value = true
    }

    const hasAchievementNotified = (achievementId) => {
      try {
        return localStorage.getItem(`${ACHIEVEMENT_NOTIFIED_PREFIX}${achievementId}`) === 'true'
      } catch (e) {
        return false
      }
    }

    const markAchievementNotified = (achievementId) => {
      try {
        localStorage.setItem(`${ACHIEVEMENT_NOTIFIED_PREFIX}${achievementId}`, 'true')
      } catch (e) {
        // ignore storage errors
      }
    }

    const hideUnlockPopup = () => {
      unlockPopupAchievement.value = null
      if (unlockPopupTimer) {
        clearTimeout(unlockPopupTimer)
        unlockPopupTimer = null
      }
    }

    const showUnlockPopup = (achievement) => {
      if (!achievement) return
      unlockPopupAchievement.value = achievement
      if (unlockPopupTimer) {
        clearTimeout(unlockPopupTimer)
      }
      unlockPopupTimer = setTimeout(() => {
        unlockPopupAchievement.value = null
        unlockPopupTimer = null
      }, 4500)
    }

    const invalidateMapSize = () => {
      if (map) {
        setTimeout(() => {
          try {
            map.invalidateSize()
          } catch (e) {}
        }, 0)
      }
    }

    watch(() => props.isVisible, (visible) => {
      if (visible) {
        invalidateMapSize()
      }
    })

    watch(achievements, (nextAchievements) => {
      if (!achievementsWatchReady.value) return
      nextAchievements.forEach((achievement) => {
        if (!achievement.unlocked) return
        if (hasAchievementNotified(achievement.id)) return
        markAchievementNotified(achievement.id)
        showUnlockPopup(achievement)
      })
    }, { deep: true })

    const tutorialCurrentStep = computed(() => {
      if (openedDetailCount.value === 0) return 1
      if (miniQuizCorrectCount.value === 0) return 2
      if (investigatedIds.value.size === 0) return 3
      if (!learningCompleted.value) return 4
      return 5
    })

    onMounted(() => {
      const markerBounds = L.latLngBounds(markerList.value.map(marker => [marker.lat, marker.lon]))

      map = L.map('map', {
        maxBounds: markerBounds.pad(0.03),
        maxBoundsViscosity: 0.95,
        minZoom: 14,
        maxZoom: 17
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map)

      setTimeout(() => {
        try {
          map.invalidateSize()
        } catch (e) {}
        const targetZoom = map.getBoundsZoom(markerBounds.pad(0.01), false)
        map.setView(markerBounds.getCenter(), Math.min(targetZoom, 17))
        // Use symmetric padding to avoid large empty areas on left/right
        map.fitBounds(markerBounds, {
          padding: [40, 40],
          maxZoom: 17
        })
      }, 100)

      // Disable zoom interactions and lock zoom level
      try {
        if (map.scrollWheelZoom && typeof map.scrollWheelZoom.disable === 'function') map.scrollWheelZoom.disable()
        if (map.doubleClickZoom && typeof map.doubleClickZoom.disable === 'function') map.doubleClickZoom.disable()
        if (map.boxZoom && typeof map.boxZoom.disable === 'function') map.boxZoom.disable()
        if (map.touchZoom && typeof map.touchZoom.disable === 'function') map.touchZoom.disable()
        if (map.keyboard && typeof map.keyboard.disable === 'function') map.keyboard.disable()
        if (map.zoomControl) map.removeControl(map.zoomControl)
        const currentZoom = map.getZoom()
        map.setMinZoom(currentZoom)
        map.setMaxZoom(currentZoom)
      } catch (e) {
        console.warn('Could not fully disable map zoom:', e)
      }

      const onMarkerClick = (m) => {
        try { console.log('onMarkerClick:', m, typeof m, m && m.image && typeof m.image) } catch (e) {}
        markDetailOpened(m?.id)
        selectedMarker.value = m
        showDetail.value = true
      }
      addMarkers(map, onMarkerClick)

      refreshInvestigationCount()
      loadLearningCompleted()
      loadQuizPerfectScoreCompleted()
      loadOpenedDetailCount()
      achievementsWatchReady.value = true
      invalidateMapSize()
    })

    onBeforeUnmount(() => {
      hideUnlockPopup()
      if (map) {
        map.remove()
        map = null
      }
    })

    return {
      markerList,
      totalMarkers,
      investigatedCount: computed(() => investigatedIds.value.size),
      isInvestigated,
      selectedMarker,
      showDetail,
      showConfirmQuiz,
      selectedAchievement,
      showAchievementModal,
      showAchievementListModal,
      unlockPopupAchievement,
      learningCompleted,
      quizPerfectScoreCompleted,
      showFirstVisitTutorial,
      tutorialCurrentStep,
      resetSignal,
      allInvestigated,
      achievements,
      unlockedAchievementCount,
      nextLockedAchievement,
      refreshInvestigationCount,
      markDetailOpened,
      openConfirmQuiz,
      openAchievementListModal,
      openAchievement,
      hideUnlockPopup,
      markLearningCompleted,
      markQuizPerfectScoreCompleted,
      completeFirstVisitTutorial,
      reopenFirstVisitTutorial
    }
  }
}
</script>

<style scoped src="../home.css"></style>

<style scoped>
.lesson-content {
  width: 100%;
  max-width: 1680px !important;
  margin: 0 auto !important;
}
.map-status-layout {
  grid-template-columns: minmax(480px, 560px) minmax(600px, 1fr) 220px;
}
.achievement-desktop {
  display: block;
}
.achievement-mobile {
  display: none;
}
.status-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.status-summary {
  margin: 0 0 12px;
  font-size: 1rem;
  color: #1f3f5f;
}
.learning-complete-badge {
  margin: -6px 0 2px;
  display: inline-flex;
  align-self: flex-start;
  padding: 6px 12px;
  border-radius: 999px;
  background: #e7f7eb;
  border: 1px solid #bfe8c9;
  color: #1d7a43;
  font-size: 0.86rem;
  font-weight: 700;
}
.confirm-quiz-button {
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  font-size: 0.97rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease, opacity 0.18s ease;
}
.confirm-quiz-button {
  background: #2f7aeb;
  color: #fff;
}
.confirm-quiz-button:hover:not(:disabled) {
  background: #255cd1;
}
.confirm-quiz-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  background: #a6b8d6;
}
.tutorial-open-button {
  width: 100%;
  padding: 11px 14px;
  border-radius: 12px;
  border: 1px solid #c9dbef;
  background: #eef5ff;
  color: #2b4f75;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
}
.tutorial-open-button:hover {
  background: #e4eefb;
}
.status-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}
.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-radius: 14px;
  background: #f8fbff;
  border: 1px solid #e3eef8;
}
.status-item.done {
  background: #eef6eb;
  border-color: #d7e6d7;
}
.achievement-summary {
  margin: 0;
  font-size: 0.94rem;
  color: #385a7b;
}
.achievement-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  max-height: min(70vh, 760px);
  overflow-y: auto;
  padding-right: 4px;
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
  padding: 8px 9px;
  display: block;
  cursor: pointer;
}
.achievement-button:disabled {
  cursor: default;
}
.achievement-row {
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr);
  gap: 8px;
  align-items: center;
}
.achievement-icon-wrap {
  width: 34px;
  height: 34px;
}
.achievement-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid #d5e6f7;
  object-fit: cover;
  display: block;
}
.achievement-icon-placeholder {
  width: 34px;
  height: 34px;
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
  font-size: 0.84rem;
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
  font-size: 0.75rem;
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
.achievement-next {
  margin: 0;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f3f8ff;
  border: 1px solid #dce9f5;
  color: #345674;
  font-size: 0.86rem;
  line-height: 1.6;
}
.achievement-next-complete {
  background: #eef6eb;
  border-color: #d7e6d7;
  color: #2f5b41;
  font-weight: 700;
}
.achievement-list-open {
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 0.9rem;
  font-weight: 700;
  background: #edf3fb;
  color: #2b4a68;
  cursor: pointer;
}
.achievement-list-open:hover {
  background: #e4edf8;
}
.achievement-unlock-popup {
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  z-index: 12000;
  width: min(360px, calc(100vw - 44px));
  background: #fcfeff;
  border: 1px solid #d7e6d7;
  border-radius: 14px;
  box-shadow: 0 14px 28px rgba(14, 31, 49, 0.18);
  padding: 12px;
  display: grid;
  gap: 10px;
}
.achievement-unlock-header {
  margin: 0;
  font-size: 0.86rem;
  font-weight: 700;
  color: #2f5b41;
}
.achievement-unlock-content {
  display: grid;
  grid-template-columns: 50px minmax(0, 1fr);
  gap: 10px;
  align-items: center;
}
.achievement-unlock-icon {
  width: 46px;
  height: 46px;
  border-radius: 8px;
  border: 1px solid #d5e6f7;
  object-fit: cover;
}
.achievement-unlock-text {
  min-width: 0;
  display: grid;
  gap: 4px;
}
.achievement-unlock-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1f4669;
}
.achievement-unlock-description {
  margin: 0;
  font-size: 0.88rem;
  color: #4f6478;
}
.achievement-unlock-close {
  justify-self: end;
  border: none;
  border-radius: 8px;
  padding: 7px 12px;
  background: #2f7aeb;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 1200px) {
  .map-status-layout {
    grid-template-columns: 1fr;
  }

  .achievement-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    max-height: none;
    overflow: visible;
    padding-right: 0;
  }
}

@media (max-width: 768px) {
  .achievement-desktop {
    display: none;
  }

  .achievement-mobile {
    display: grid;
    gap: 10px;
  }

  .achievement-list-open {
    min-height: 42px;
  }
}

/* 実際にマップの表示幅を狭める（マーカー配置には影響しない範囲で中心寄せ） */
.map-container {
  width: 100%;
  max-width: none;
  margin: 0;
}
.map-container #map {
  width: 100%;
  /* 縦長化: ビューポート比率を優先しつつ上限と下限を設定 */
  height: min(78vh, 920px);
  min-height: 560px;
  max-height: 920px;
}

/* Visually narrow unused left/right edges of the map without changing map layout */
#map {
  position: relative;
}
#map::before,
#map::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 28px; /* 視覚的に狭める幅（必要なら調整） */
  pointer-events: none; /* マップ操作に影響させない */
  z-index: 1000;
}
#map::before {
  left: 0;
  background: linear-gradient(to right, #f8fbff 0%, rgba(248,251,255,0) 60%);
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
}
#map::after {
  right: 0;
  background: linear-gradient(to left, #f8fbff 0%, rgba(248,251,255,0) 60%);
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
}
</style>
