# 実績追加メモ（次回再開用）

最終更新: 2026-07-21
目的: 次回、同じ形式で実績を追加するときに迷わず実装するための手順メモ。

## 1) 追加先ファイル
- `src/achievements.js`
- 条件によっては `src/components/LessonMapView.vue`
- ミニクイズ正解トリガー関連は `src/components/MarkerDetail.vue`

## 2) 実績の基本テンプレート
`src/achievements.js` の `achievementTemplates` に1件追加する。

```js
{
  id: 'unique-achievement-id',
  imageName: 'image-file-name.png',
  title: '実績タイトル',
  description: '実績解説',
  detailAfterOpen: '実績ウィンドウ表示後の追加解説（複数段落は \n\n）',
  unlockCondition: {
    type: 'opened-detail-count',
    count: 1
  }
}
```

## 3) 使える解除条件（現状）
- `opened-detail-count`: 解説ページを開いた回数
- `mini-quiz-correct-count`: ミニクイズ正解済みスポット数
- `investigated-count`: 調査完了スポット数
- `investigated-marker-ids`: 指定したスポットID群をすべて調査完了
- `learning-completed`: 最終確認問題で合格ライン以上
- `quiz-perfect-score`: 最終確認問題で満点
- `all-investigated`: 全スポット調査完了

## 4) 条件別のデータ供給元
- `opened-detail-count`
  - `LessonMapView.vue` の `openedDetailCount`
  - マーカークリック時 `markDetailOpened(markerId)` で更新
  - `lesson-opened-detail-ids` に開いたスポットID配列を保持し、ユニーク数で集計
- `mini-quiz-correct-count`
  - `LessonMapView.vue` の `miniQuizCorrectCount`
  - `localStorage` の `marker-mini-quiz-passed-{markerId}` を集計
  - `MarkerDetail.vue` の正解時 `mini-quiz-correct` emit で即時再集計
- `investigated-count` / `all-investigated`
  - `LessonMapView.vue` の `investigatedIds.size`
- `investigated-marker-ids`
  - `LessonMapView.vue` の `investigatedIds`
  - `achievements.js` の `unlockCondition.markerIds` に対象IDを配列で指定
- `learning-completed`
  - `LessonMapView.vue` の `learningCompleted`
  - `ConfirmationQuizModal.vue` で合格ライン以上なら `completed` emit
- `quiz-perfect-score`
  - `LessonMapView.vue` の `quizPerfectScoreCompleted`
  - `ConfirmationQuizModal.vue` で満点なら `perfect-score` emit

例:

```js
unlockCondition: {
  type: 'investigated-marker-ids',
  markerIds: ['shiki', 'funamoto-minato', 'suimon']
}
```

## 5) ポップアップ表示仕様（達成時）
- 実装場所: `LessonMapView.vue`
- `watch(achievements, ...)` で新規解除を検知して表示
- 表示済み管理キー: `achievement-notified-{achievementId}`
- 位置: 画面上中央

## 6) リセット時の注意（重要）
`resetUnderstoodChecks` で以下を消さないと、実績が誤って維持される。
- `marker-understood-{markerId}`
- `marker-mini-quiz-passed-{markerId}`
- `lesson-learning-completed`
- `lesson-quiz-perfect-completed`
- `lesson-opened-detail-once`
- `lesson-opened-detail-ids`
- `achievement-notified-{achievementId}`

## 7) 次回の依頼テンプレ（コピペ用）
以下を埋めて依頼すれば、そのまま追加可能。

- imgファイル内の画像名:
- 実績タイトル:
- 実績解説:
- 実績ウィンドウ表示後の追加解説:
- 解除条件タイプ（opened-detail-count / mini-quiz-correct-count / investigated-count / investigated-marker-ids / learning-completed / quiz-perfect-score / all-investigated）:
- countが必要なら数値:

## 8) 現在入っている実績（2026-07-21時点）
- はじめの一歩（解説ページを1つ開く）
- ひらめきの一問（はじめてミニクイズに正解する）
- しっかり理解（初めて「理解した」にチェックする）
- 学びの積み重ね（3か所で「理解した」にチェックする）
- 地域理解の達成者（7か所すべてで「理解した」にチェックする）
- 合格！！（最終確認問題で合格ライン以上正解する）
- 大垣博士（最終確認問題で満点を取る）
- 水辺の記憶をたどる（水辺エリア3地点をすべて理解）
- 歴史をたどる者（歴史エリア3地点をすべて理解）
- 水の都を知る者（水文化エリア3地点をすべて理解）
- 大垣探索ビギナー（解説ページを3つ開く）
- 大垣めぐり中（解説ページを5つ開く）
- 大垣探索マスター（7か所すべての解説ページを開く）
