import L from 'leaflet'

const imageBaseUrl = `${import.meta.env.BASE_URL}img/`

// POI一覧 — 必要なら座標は微調整してください
const markers = [
  {
    id: 'ogaki-castle',
    name: '大垣城',
    color: '#d9534f',
    image: `${imageBaseUrl}ogaki-castle.jpg`,
    lat: 35.36197778,
    lon: 136.61607222,
    description: '大垣城（復元天守）',
    title: '歴史を見守り続けた名城',
    explanation: '大垣城は、大垣市を代表する歴史的建造物です。戦国時代から重要な役割を果たし、現在は郷土資料などを展示する歴史資料館として公開されています。',
    sections: [
      {
        subtitle: '概要',
        text: '大垣城は、大垣市を代表する歴史的建造物です。戦国時代から重要な役割を果たし、現在は郷土資料などを展示する歴史資料館として公開されています。'
      },
      {
        subtitle: '見どころ',
        text: '・城内で歴史資料を見学できる\n・最上階から市街地を眺められる\n・四季によって変わる城の景色'
      },
      {
        subtitle: '豆知識',
        text: '現在の天守は戦後に再建されたもので、大垣市のシンボルとして親しまれています。'
      }
    ],
    miniQuiz: {
      question: '大垣城は何として知られていますか？',
      choices: [
        { key: 'A', text: '日本一高い城', correct: false },
        { key: 'B', text: '関ヶ原の戦いで西軍の拠点となった城', correct: true },
        { key: 'C', text: '海に浮かぶ城', correct: false }
      ]
    }
  },
  {
    id: 'shiki',
    name: '四季の広場',
    // Nominatim: 四季の広場, 馬場町
    image: `${imageBaseUrl}shiki.jpeg`,
    lat: 35.3577073,
    lon: 136.6123776,
    description: '四季の広場 — 船町・馬場町付近の公園',
    title: '湧水と自然を感じる憩いの空間',
    explanation: '四季の広場は、水門川沿いに整備された広場です。豊かな湧水や季節の草花を楽しみながら散策でき、水の都・大垣らしい景観を身近に感じられます。',
    sections: [
      {
        subtitle: '概要',
        text: '四季の広場は、水門川沿いに整備された広場です。豊かな湧水や季節の草花を楽しみながら散策でき、水の都・大垣らしい景観を身近に感じられます。'
      },
      {
        subtitle: '見どころ',
        text: '・湧水を間近で見ることができる\n・ベンチがあり休憩に最適\n・季節の花や緑が楽しめる'
      },
      {
        subtitle: '豆知識',
        text: '地下水の豊富な大垣では、市内のさまざまな場所で湧水を見ることができ、四季の広場もその魅力を体感できるスポットの一つです。'
      }
    ],
    miniQuiz: {
      question: '四季の広場で楽しめるものとして最も適切なのはどれですか？',
      choices: [
        { key: 'A', text: 'ジェットコースター', correct: false },
        { key: 'B', text: '動物園', correct: false },
        { key: 'C', text: '四季折々の花や水辺の景観', correct: true }
      ]
    }
  },
  {
    id: 'oku-hosomichi',
    name: '奥の細道むすびの地記念館',
    color: '#5bc0de',
    image: `${imageBaseUrl}oku-hosomichi.jpg`,
    // Wikipedia に掲載の座標（北緯35°21'22.4" 東経136°36'42.6"）
    // 小数表記: 35.35622222, 136.61183333
    lat: 35.35622222,
    lon: 136.61183333,
    description: '奥の細道むすびの地記念館（むすびの泉あり）',
    title: '芭蕉が旅を締めくくった場所',
    explanation: '江戸時代の俳人・松尾芭蕉が『奥の細道』の旅を終えた場所として知られています。現在は記念施設やモニュメントが整備され、多くの観光客が訪れます。',
    sections: [
      {
        subtitle: '概要',
        text: '江戸時代の俳人・松尾芭蕉が『奥の細道』の旅を終えた場所として知られています。現在は記念施設やモニュメントが整備され、多くの観光客が訪れます。'
      },
      {
        subtitle: '見どころ',
        text: '・芭蕉の旅を紹介する展示\n・記念碑やモニュメント\n・水辺と歴史が調和した景観'
      },
      {
        subtitle: '豆知識',
        text: '『奥の細道』は約2,400kmに及ぶ旅の記録で、大垣はその締めくくりの地です。'
      }
    ],
    miniQuiz: {
      question: '奥の細道むすびの地記念館で紹介されている人物は誰ですか？',
      choices: [
        { key: 'A', text: '徳川家康', correct: false },
        { key: 'B', text: '松尾芭蕉', correct: true },
        { key: 'C', text: '織田信長', correct: false }
      ]
    }
  },
  {
    id: 'suimon',
    name: '水門川（船町川湊周辺）',
    color: '#5cb85c',
    image: `${imageBaseUrl}suimon.jpg`,
    // 船町川湊付近の代表点（大垣市公式ページを参照）
    lat: 35.3568,
    lon: 136.6130,
    description: '水門川 — 船町川湊の水辺（たらい舟の発着等）',
    title: '大垣の暮らしを支える水辺',
    explanation: '水門川は、市内中心部を流れる川で、大垣市が「水の都」と呼ばれる理由を感じられる代表的な場所です。豊かな地下水によって美しい水辺の景観がつくられています。',
    sections: [
      {
        subtitle: '概要',
        text: '水門川は、市内中心部を流れる川で、大垣市が「水の都」と呼ばれる理由を感じられる代表的な場所です。豊かな地下水によって美しい水辺の景観がつくられています。'
      },
      {
        subtitle: '見どころ',
        text: '・四季折々の景色が楽しめる\n・舟下りが行われることもある\n・湧水と川がつながる景観'
      },
      {
        subtitle: '豆知識',
        text: '春には桜、夏にはたらい舟など、季節ごとに違った魅力があります。'
      }
    ],
    miniQuiz: {
      question: '水門川が大垣市で重要な理由は何ですか？',
      choices: [
        { key: 'A', text: '日本で一番長い川だから', correct: false },
        { key: 'B', text: '海に直接つながっているから', correct: false },
        { key: 'C', text: '「水の都」を特徴づける川だから', correct: true }
      ]
    }
  },
  {
    id: 'suitopia-center',
    name: 'スイトピアセンター',
    color: '#f0ad4e',
    // Nominatim: スイトピアセンター（大垣市）
    image: `${imageBaseUrl}suitopia-center.jpg`,
    lat: 35.3642795,
    lon: 136.6079016,
    description: 'スイトピアセンター（公園/施設）',
    title: '文化と水が調和する大垣の交流拠点',
    sections: [
      {
        subtitle: '概要',
        text: 'スイトピアセンターは、大垣市の文化や学習活動の中心となる複合施設です。図書館や学習施設、美術展示などがあり、水の都・大垣の魅力を知る拠点として親しまれています。'
      },
      {
        subtitle: '見どころ',
        text: '・図書館や学習施設が利用できる\n・イベントや企画展が開催される\n・周辺には水辺空間が広がる'
      },
      {
        subtitle: '豆知識',
        text: '「スイトピア」は「水都」と「ユートピア」を組み合わせた名前です。'
      }
    ],
    miniQuiz: {
      question: 'スイトピアセンターはどのような施設ですか？',
      choices: [
        { key: 'A', text: '歴史・文化・学習を体験できる複合施設', correct: true },
        { key: 'B', text: '大垣市役所', correct: false },
        { key: 'C', text: 'ショッピングセンター', correct: false }
      ]
    }
  },
  {
    id: 'funamoto-minato',
    name: '船町港跡',
    color: '#9b59b6',
    image: `${imageBaseUrl}minato.jpg`,
    lat: 35.3570,
    lon: 136.6123,
    description: '船町港跡',
    title: '水運で栄えた大垣の玄関口',
    explanation: '船町港跡は、かつて水門川を利用した舟運の拠点として栄えた場所です。江戸時代には人や物資を運ぶ舟が行き交い、大垣の経済や文化の発展を支えました。現在は史跡として整備され、当時の面影を感じることができます。',
    sections: [
      {
        subtitle: '概要',
        text: '船町港跡は、かつて水門川を利用した舟運の拠点として栄えた場所です。物資を運ぶ舟が行き交い、大垣の経済や文化を支えました。現在は史跡として整備されています。'
      },
      {
        subtitle: '見どころ',
        text: '・江戸時代の舟運の歴史を学べる\n・水門川沿いの落ち着いた景観\n・「水の都」を支えた交通の拠点'
      },
      {
        subtitle: '豆知識',
        text: '大垣は「水の都」として豊かな水に恵まれていたため、水運が発達しました。船町港からは多くの荷物が運ばれ、人々の暮らしや商業を支えていました。'
      }
    ],
    miniQuiz: {
      question: '船町港跡は昔どのような役割を果たしていましたか？',
      choices: [
        { key: 'A', text: '空港として利用されていた', correct: false },
        { key: 'B', text: '水運の拠点として人や物資を運んでいた', correct: true },
        { key: 'C', text: '漁港として栄えた', correct: false }
      ]
    }
  },
  {
    id: 'kagano-hachiman',
    name: '加賀野八幡神社',
    color: '#e74c3c',
    image: `${imageBaseUrl}yahata-jinja.jpg`,
    lat: 35.3548,
    lon: 136.6155,
    description: '加賀野八幡神社',
    title: '地中から湧き出る大垣の名水',
    explanation: '加賀野八幡神社の境内には、地下水が自然に湧き出る「自噴井戸」があります。大垣市の豊富な地下水を象徴する場所として知られ、「水の都」の魅力を実際に感じることができるスポットです。',
    sections: [
      {
        subtitle: '概要',
        text: '加賀野八幡神社の境内には、地下水が自然に湧き出る「自噴井戸」があります。大垣市の豊かな地下水を象徴する場所として、多くの人に親しまれています。'
      },
      {
        subtitle: '見どころ',
        text: '・地下から自然に湧き出る自噴井戸\n・透き通った美しい湧水\n・大垣の豊かな地下水を間近で体感できる'
      },
      {
        subtitle: '豆知識',
        text: '加賀野八幡神社の自噴井戸は、環境省が選定した「名水百選」の一つに選ばれています。豊富な地下水は現在も絶えず湧き続けており、大垣市が「水の都」と呼ばれる理由を知ることができる代表的な場所です。'
      }
    ],
    miniQuiz: {
      question: '加賀野八幡神社が知られている理由は何ですか？',
      choices: [
        { key: 'A', text: '日本一高い鳥居があること', correct: false },
        { key: 'B', text: '温泉が湧いていること', correct: false },
        { key: 'C', text: '豊かな湧水があるため', correct: true }
      ]
    }
  }
]

export function addMarkers(map, onMarkerClick) {
  if (!map) return
  // SVGベースの色付きアイコンを作るユーティリティ
  function coloredIcon(color){
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="42" viewBox="0 0 30 42">
      <path d="M15 0C8 0 2.5 5.5 2.5 12.5C2.5 22 15 42 15 42C15 42 27.5 22 27.5 12.5C27.5 5.5 22 0 15 0Z" fill="${color}"/>
      <circle cx="15" cy="12.5" r="5" fill="white"/>
    </svg>`
    return L.icon({
      iconUrl: 'data:image/svg+xml;utf8,' + encodeURIComponent(svg),
      iconSize: [30,42],
      iconAnchor: [15,42],
      popupAnchor: [0,-35]
    })
  }

  markers.forEach(m => {
    const icon = coloredIcon(m.color || '#3388ff')
    const marker = L.marker([m.lat, m.lon], { icon }).addTo(map)
    marker.bindTooltip(m.name, { direction: 'top', offset: [0, -10], opacity: 0.9 })
    // クリック時に外部ハンドラが渡されていれば呼び出す
    if (typeof onMarkerClick === 'function') {
      marker.on('click', () => {
        if (marker.getPopup && marker.getPopup()) {
          marker.closePopup()
        }
        onMarkerClick(m)
      })
    }
  })
}

export function getMarkers() {
  return markers
}
