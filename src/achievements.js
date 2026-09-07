export const achievementTemplates = [
  {
    id: 'first-step',
    imageName: 'first_step.png',
    title: 'はじめの一歩',
    description: '解説ページを1つ開く',
    detailAfterOpen: '「はじめの一歩」は、最初の解説ページを開いた利用者に与えられる実績です。\n\n大垣市の地域学習は、地図上の気になる場所を選び、その場所について知ることから始まります。最初のページを開くことは、地域の歴史や文化、水との関わりを学ぶための第一歩です。\n\nこの実績をきっかけに、ほかの場所にも目を向け、大垣市のさまざまな魅力を見つけていきましょう。',
    unlockCondition: {
      type: 'opened-detail-count',
      count: 1
    }
  },
  {
    id: 'first-mini-quiz-correct',
    imageName: 'inspiration.png',
    title: 'ひらめきの一問',
    description: 'はじめてミニクイズに正解する',
    detailAfterOpen: '「ひらめきの一問」は、ミニクイズではじめて正解した利用者に与えられる実績です。\n\nミニクイズは、解説ページで学んだ内容を確認するためのものです。正解できたということは、ただページを読んだだけでなく、その場所の特徴や内容を理解できていることを示しています。\n\nこの実績をきっかけに、ほかの場所の解説にも目を向けながら、クイズに挑戦して学びを深めていきましょう。',
    unlockCondition: {
      type: 'mini-quiz-correct-count',
      count: 1
    }
  },
  {
    id: 'first-understood-check',
    imageName: 'rikai_sikkari.png',
    title: 'しっかり理解',
    description: '初めて「理解した」にチェックする',
    detailAfterOpen: '「しっかり理解」は、初めて「理解した」にチェックを入れた利用者に与えられる実績です。\n\n解説ページを読むだけでなく、自分で内容を確認してチェックすることは、学習を進めるうえで大切な行動です。理解したことを記録することで、どの場所を学んだのかを振り返りやすくなります。\n\nこの実績は、利用者がただ眺めるだけでなく、内容を意識して学び始めたことを示しています。これからも各地点の特徴を確認しながら、学習を進めていきましょう。',
    unlockCondition: {
      type: 'investigated-count',
      count: 1
    }
  },
  {
    id: 'learning-progress-stack',
    imageName: 'manabi.png',
    title: '学びの積み重ね',
    description: '3か所で「理解した」にチェックする',
    detailAfterOpen: '「学びの積み重ね」は、3か所で「理解した」にチェックを入れた利用者に与えられる実績です。\n\n地域学習では、1つの場所だけでなく、複数の場所を比べながら見ることで理解が深まります。それぞれの地点には、歴史、自然、文化、まちづくりなど異なる視点があります。\n\nこの実績は、利用者が学習を少しずつ積み重ねていることを示しています。さらに多くの場所を確認することで、大垣市全体の特徴をより広く理解できるようになります。',
    unlockCondition: {
      type: 'investigated-count',
      count: 3
    }
  },
  {
    id: 'regional-understanding-achiever',
    imageName: 'rikai_mastar.png',
    title: '地域理解の達成者',
    description: '7か所すべてで「理解した」にチェックする',
    detailAfterOpen: '「地域理解の達成者」は、7か所すべてで「理解した」にチェックを入れた利用者に与えられる実績です。\n\nこの教材では、スイトピアセンター、大垣城、四季の広場、船町港跡、水門川、奥の細道結びの地記念館、加賀野八幡神社を通して、大垣市の地域的な特徴を学びます。\n\nすべての場所を理解することで、大垣市が持つ歴史、文化、水との関わり、地域施設の役割などを総合的に見ることができます。この実績は、利用者が大垣市について一通り学び終えたことを示す大きな達成です。',
    unlockCondition: {
      type: 'investigated-count',
      count: 7
    }
  },
  {
    id: 'final-quiz-passed',
    imageName: 'goukaku.png',
    title: '合格！！',
    description: '最終確認問題で合格ライン以上正解する',
    detailAfterOpen: '「合格！！」は、最終確認問題で合格ライン以上の正解をした利用者に与えられる実績です。\n\n確認問題は、解説ページで学んだ内容を振り返るためのものです。問題に正解することで、各地点の特徴や、大垣市の歴史・文化・水との関わりを理解できているかを確認できます。\n\nこの実績は、利用者が学習内容をしっかり振り返り、知識として身につけていることを示しています。間違えた問題があった場合も、もう一度解説を確認することで理解を深めることができます。',
    unlockCondition: {
      type: 'learning-completed'
    }
  },
  {
    id: 'ogaki-hakase',
    imageName: 'ogaki_hakase.png',
    title: '大垣博士',
    description: '最終確認問題で満点を取る',
    detailAfterOpen: '「大垣博士」は、最終確認問題で満点を取った利用者に与えられる実績です。\n\n満点を取るためには、各地点の解説を読み、内容を正しく理解している必要があります。大垣城や船町港跡の歴史、水門川や加賀野八幡神社に見られる水との関わり、スイトピアセンターや四季の広場の役割など、幅広い内容を振り返ることが大切です。\n\nこの実績は、大垣市について高い理解を示した利用者に与えられる特別な実績です。学んだ知識をもとに、実際のまちにも目を向けてみましょう。',
    unlockCondition: {
      type: 'quiz-perfect-score'
    }
  },
  {
    id: 'mizube-memory-trail',
    imageName: 'mizube.png',
    title: '水辺の記憶をたどる',
    description: '水辺エリアをすべて理解する',
    detailAfterOpen: '「水辺の記憶をたどる」は、水辺エリアにあるすべての場所を理解した利用者に与えられる実績です。\n\n水辺エリアには、四季の広場、船町港跡、水門川が含まれています。これらの場所は、大垣市が「水の都」と呼ばれる理由を知るうえで重要な場所です。\n\n水門川は、大垣市の中心部を流れる身近な川であり、まちの景観や人々の暮らしと深く関わっています。船町港跡は、かつて水運が利用されていた歴史を伝える場所です。また、四季の広場は、水辺の景色を楽しめる憩いの場として親しまれています。\n\nこの3つの場所を学ぶことで、大垣市の水辺が単なる風景ではなく、交通、生活、歴史、まちづくりと結びついてきたことを理解できます。',
    unlockCondition: {
      type: 'investigated-marker-ids',
      markerIds: ['shiki', 'funamoto-minato', 'suimon']
    }
  },
  {
    id: 'trace-history-spots',
    imageName: 'rekisi_spot.png',
    title: '歴史をたどる者',
    description: '歴史エリアをすべて理解する',
    detailAfterOpen: '「歴史をたどる者」は、歴史エリアにあるすべての場所を理解した利用者に与えられる実績です。\n\n歴史エリアには、大垣城、奥の細道結びの地記念館、船町港跡が含まれています。これらの場所は、大垣市の歴史や文化の成り立ちを知るうえで重要な場所です。\n\n大垣城は、城下町として発展してきた大垣の歴史を伝える場所です。奥の細道結びの地記念館は、松尾芭蕉の旅や文学との関わりを学ぶことができる場所です。また、船町港跡は、かつて水運が利用され、人や物の移動を支えていた歴史を伝えています。\n\nこの3つの場所を学ぶことで、大垣市が城下町としての歴史、文学とのつながり、水運による発展など、さまざまな面から形づくられてきたことを理解できます。',
    unlockCondition: {
      type: 'investigated-marker-ids',
      markerIds: ['ogaki-castle', 'oku-hosomichi', 'funamoto-minato']
    }
  },
  {
    id: 'know-water-capital',
    imageName: 'mizu_spot.png',
    title: '水の都を知る者',
    description: '水文化エリアをすべて理解する',
    detailAfterOpen: '「水の都を知る者」は、水文化エリアにあるすべての場所を理解した利用者に与えられる実績です。\n\n水文化エリアには、水門川、加賀野八幡神社、船町港跡が含まれています。これらの場所は、大垣市が水と深く関わりながら発展してきたことを知るうえで重要な場所です。\n\n水門川は、大垣市の中心部を流れ、まちの景観や暮らしと関わってきた川です。加賀野八幡神社は、湧き水や自噴水など、大垣の水の豊かさを感じられる場所です。また、船町港跡は、かつて水運が利用され、人や物の移動を支えていた歴史を伝えています。\n\nこの3つの場所を学ぶことで、大垣市の水が、景観だけでなく、暮らし、交通、地域の文化と深く結びついてきたことを理解できます。',
    unlockCondition: {
      type: 'investigated-marker-ids',
      markerIds: ['suimon', 'kagano-hachiman', 'funamoto-minato']
    }
  },
  {
    id: 'ogaki-explorer-beginner',
    imageName: 'biginer.png',
    title: '大垣探索ビギナー',
    description: '解説ページを3つ開く',
    detailAfterOpen: '「大垣探索ビギナー」は、解説ページを3つ開いた利用者に与えられる実績です。\n\n大垣市には、水辺の景観、歴史を感じられる場所、地域の学びにつながる施設など、さまざまな特徴を持つ場所があります。3つの解説ページを開いたということは、1つの場所だけでなく、複数の視点から大垣市を知り始めたことを表しています。\n\nこの実績をきっかけに、まだ見ていない場所にも目を向け、大垣市の魅力をさらに発見していきましょう。',
    unlockCondition: {
      type: 'opened-detail-count',
      count: 3
    }
  },
  {
    id: 'ogaki-meguri-midway',
    imageName: 'ogaki_meguri.png',
    title: '大垣めぐり中',
    description: '解説ページを5つ開く',
    detailAfterOpen: '「大垣めぐり中」は、解説ページを5つ開いた利用者に与えられる実績です。\n\nここまで学習を進めると、大垣市の特徴が少しずつつながって見えてきます。城下町としての歴史、水辺の景観、文化施設、地域に残る名所など、それぞれの場所には異なる役割があります。\n\nこの実績は、利用者が大垣市の複数の場所をめぐり、地域への理解を深めていることを示しています。残りの場所も確認しながら、大垣市全体の魅力をさらに見つけていきましょう。',
    unlockCondition: {
      type: 'opened-detail-count',
      count: 5
    }
  },
  {
    id: 'ogaki-explorer-master',
    imageName: 'mastar.png',
    title: '大垣探索マスター',
    description: 'すべての解説ページを開く',
    detailAfterOpen: '「大垣探索マスター」は、7か所すべての解説ページを開いた利用者に与えられる実績です。\n\nこの教材では、スイトピアセンター、大垣城、四季の広場、船町港跡、水門川、奥の細道結びの地記念館、加賀野八幡神社の7か所を通して、大垣市の歴史、文化、水との関わりについて学ぶことができます。\n\nすべての解説ページを開いたということは、大垣市のさまざまな場所に目を向け、地域の特徴を広く知ろうとしたことを表しています。\n\nここからは、それぞれの場所で学んだ内容を振り返りながら、大垣市がどのようなまちなのかをさらに深く考えてみましょう。',
    unlockCondition: {
      type: 'opened-detail-count',
      count: 7
    }
  }
]

export function resolveAchievements({ investigatedCount, totalMarkers, openedDetailCount = 0, miniQuizCorrectCount = 0, investigatedIds = [], learningCompleted = false, quizPerfectScoreCompleted = false }) {
  return achievementTemplates.map((achievement) => {
    const unlocked = isAchievementUnlocked(achievement.unlockCondition, {
      investigatedCount,
      totalMarkers,
      openedDetailCount,
      miniQuizCorrectCount,
      investigatedIds,
      learningCompleted,
      quizPerfectScoreCompleted
    })
    return {
      ...achievement,
      unlocked,
      image: achievement.imageName ? `${import.meta.env.BASE_URL}img/${achievement.imageName}` : null
    }
  })
}

function isAchievementUnlocked(condition, context) {
  if (!condition || !condition.type) return false
  const { investigatedCount, totalMarkers, openedDetailCount, miniQuizCorrectCount, investigatedIds, learningCompleted, quizPerfectScoreCompleted } = context

  if (condition.type === 'opened-detail-count') {
    const targetCount = Number(condition.count || 0)
    return openedDetailCount >= targetCount
  }

  if (condition.type === 'investigated-count') {
    const targetCount = Number(condition.count || 0)
    return investigatedCount >= targetCount
  }

  if (condition.type === 'mini-quiz-correct-count') {
    const targetCount = Number(condition.count || 0)
    return miniQuizCorrectCount >= targetCount
  }

  if (condition.type === 'all-investigated') {
    return totalMarkers > 0 && investigatedCount >= totalMarkers
  }

  if (condition.type === 'learning-completed') {
    return Boolean(learningCompleted)
  }

  if (condition.type === 'quiz-perfect-score') {
    return Boolean(quizPerfectScoreCompleted)
  }

  if (condition.type === 'investigated-marker-ids') {
    const markerIds = Array.isArray(condition.markerIds) ? condition.markerIds : []
    if (markerIds.length === 0) return false
    const investigatedIdSet = investigatedIds instanceof Set ? investigatedIds : new Set(investigatedIds)
    return markerIds.every(markerId => investigatedIdSet.has(markerId))
  }

  return false
}
