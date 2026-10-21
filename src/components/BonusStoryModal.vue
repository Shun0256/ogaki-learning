<template>
  <div v-if="visible" class="story-overlay" role="dialog" aria-modal="true" aria-labelledby="story-title">
    <article class="story-page">
      <header class="story-header">
        <p class="story-kicker">OGAKI · BONUS STORY</p>
        <button class="story-close" type="button" aria-label="地図に戻る" @click="$emit('close')">×</button>
        <h1 id="story-title">水の都の、<br class="mobile-break" />もう一つの物語。</h1>
        <p class="story-deck">水の恵みとともに、洪水と向き合ってきた人々の知恵。</p>
      </header>

      <div class="story-body">
        <section class="story-intro">
          <h2>Learning complete!</h2>
          <p>ここまで、大垣市のさまざまな場所を巡り、水の都の歴史や文化について学んできました。</p>
          <p>最後に、これまでとは少し違った視点から、大垣の水にまつわる物語を紹介します。</p>
        </section>

        <section class="story-section">
          <p class="section-index">01</p>
          <div>
            <h2>水の都のもう一つの顔</h2>
            <p>これまで学んできた大垣市の水は、豊かな湧き水や美しい水辺の景観、人や物を運ぶ水運など、さまざまな形で人々の暮らしを支えてきました。</p>
            <p>しかし、水はいつも人々に恵みをもたらしてきたわけではありません。</p>
            <p>大垣市周辺では、かつて川の氾濫による水害が発生し、家や田畑が水につかることもありました。</p>
            <p>人々は、そうした水害から暮らしを守るため、さまざまな工夫を重ねてきました。</p>
          </div>
        </section>

        <section class="story-section">
          <p class="section-index">02</p>
          <div>
            <h2>暮らしを守る「輪中」</h2>
            <p>その代表的なものが「輪中（わじゅう）」です。</p>
            <p>輪中とは、集落や田畑を堤防で囲み、洪水から暮らしを守ろうとした地域のことです。</p>

            <figure class="waju-diagram">
              <img :src="wajuImage" alt="大垣市輪中館に展示されている輪中の模型" />
              <figcaption>大垣市輪中館で、輪中の歴史や人々の暮らしについて学べます。</figcaption>
            </figure>

            <p>人々は堤防を築くだけでなく、水害に備えて高い場所に避難できるようにしたり、舟を用意したりするなど、日々の生活にも工夫を取り入れていました。</p>
            <p>こうした知恵は、水の多い土地で暮らし続けるために生まれたものです。</p>
          </div>
        </section>

        <section class="story-section">
          <p class="section-index">03</p>
          <div>
            <h2>大垣市輪中館</h2>
            <p>大垣市輪中館は、輪中の歴史や人々の暮らしについて学ぶことができる施設です。</p>
            <p>館内では、輪中の様子を再現した模型や昔の生活道具などを通して、水害と向き合ってきた人々の工夫を知ることができます。</p>
            <p>水の恵みだけでなく、水害から暮らしを守ってきた歴史を学ぶことで、大垣市と水との関わりをさらに深く理解することができます。</p>
          </div>
        </section>

        <section class="story-ending">
          <p class="section-index">04</p>
          <div>
            <h2>最後に</h2>
            <p>大垣市が「水の都」と呼ばれる背景には、豊かな水の恵みだけでなく、水と向き合ってきた人々の歴史があります。</p>
            <p>水を生かす工夫も、水から暮らしを守る知恵も、どちらも大垣市の大切な財産です。</p>
            <p class="thank-you">ここまで学んでくれて、ありがとうございました。</p>
          </div>
        </section>
      </div>

      <footer class="story-footer">
        <span>水の恵みと、人々の知恵。</span>
        <button type="button" @click="$emit('close')">地図に戻る</button>
      </footer>
    </article>
  </div>
</template>

<script>
export default {
  name: 'BonusStoryModal',
  props: {
    visible: { type: Boolean, default: false }
  },
  emits: ['close'],
  data() {
    return {
      wajuImage: `${import.meta.env.BASE_URL}img/waju.jfif`
    }
  }
}
</script>

<style scoped>
.story-overlay {
  position: fixed;
  inset: 0;
  z-index: 13000;
  display: grid;
  place-items: center;
  padding: 18px;
  background: rgba(13, 37, 54, 0.72);
  backdrop-filter: blur(5px);
}

.story-page {
  display: flex;
  flex-direction: column;
  width: min(900px, 100%);
  max-height: min(94vh, 980px);
  overflow: hidden;
  border: 1px solid #d4e6e8;
  border-radius: 8px;
  background: #fbfdfb;
  box-shadow: 0 24px 70px rgba(8, 28, 43, 0.3);
}

.story-header {
  position: relative;
  flex: 0 0 auto;
  padding: 34px 56px 30px;
  color: #f5fbfb;
  background: linear-gradient(118deg, #123c50 0%, #176879 58%, #388d97 100%);
}

.story-kicker,
.intro-label {
  margin: 0 0 14px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.story-kicker {
  color: #b4dfe1;
}

.story-header h1 {
  max-width: 700px;
  color: #fff;
  font-size: 2.25rem;
  line-height: 1.35;
}

.mobile-break {
  display: none;
}

.story-deck {
  margin: 14px 0 0;
  color: #d5eded;
  font-size: 1rem;
  line-height: 1.7;
}

.story-close {
  position: absolute;
  top: 20px;
  right: 22px;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(240, 252, 252, 0.45);
  border-radius: 50%;
  background: transparent;
  color: #fff;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}

.story-body {
  overflow-y: auto;
  padding: 32px 56px 40px;
  color: #29434e;
}

.story-body p {
  margin: 0;
  font-size: 1rem;
  line-height: 1.95;
}

.story-body p + p {
  margin-top: 12px;
}

.story-intro {
  margin-bottom: 34px;
  padding: 22px 26px;
  border-left: 4px solid #3e9397;
  background: #edf6f4;
}

.intro-label {
  margin-bottom: 8px;
  color: #317d80;
}

.story-intro h2 {
  margin: 0 0 14px;
  color: #183c4a;
  font-size: 1.35rem;
  line-height: 1.5;
}

.story-section,
.story-ending {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 20px;
  padding: 28px 0;
  border-top: 1px solid #dce9e8;
}

.section-index {
  padding-top: 4px;
  color: #438b8c;
  font-size: 0.8rem !important;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.story-section h2,
.story-ending h2 {
  margin: 0 0 16px;
  color: #183c4a;
  font-size: 1.4rem;
  line-height: 1.45;
}

.waju-diagram {
  margin: 22px 0;
}

.waju-diagram img {
  display: block;
  width: 100%;
  max-height: 520px;
  object-fit: contain;
  border: 1px solid #d5e5e5;
  background: #edf6f4;
}

.waju-diagram figcaption {
  margin-top: 8px;
  color: #607681;
  font-size: 0.8rem;
  line-height: 1.6;
  text-align: center;
}

.story-ending {
  padding-bottom: 12px;
}

.thank-you {
  margin-top: 22px !important;
  color: #1d626c;
  font-size: 1.1rem !important;
  font-weight: 700;
}

.story-footer {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 24px 16px 56px;
  border-top: 1px solid #dce9e8;
  background: #f3f8f6;
  color: #45636a;
  font-size: 0.85rem;
}

.story-footer button {
  min-height: 44px;
  padding: 10px 20px;
  border: 0;
  border-radius: 4px;
  background: #176879;
  color: #fff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 640px) {
  .story-overlay {
    display: block;
    padding: 0;
  }

  .story-page {
    width: 100%;
    max-height: 100vh;
    max-height: 100dvh;
    height: 100%;
    border: 0;
    border-radius: 0;
  }

  .story-header {
    padding: 28px 22px 24px;
  }

  .story-header h1 {
    max-width: calc(100% - 22px);
    font-size: 1.8rem;
  }

  .mobile-break {
    display: initial;
  }

  .story-deck {
    max-width: 32rem;
    padding-right: 8px;
    font-size: 0.9rem;
  }

  .story-close {
    top: 14px;
    right: 14px;
    width: 38px;
    height: 38px;
  }

  .story-body {
    padding: 22px 20px 30px;
  }

  .story-body p {
    font-size: 1rem;
    line-height: 1.9;
  }

  .story-intro {
    margin-bottom: 22px;
    padding: 18px 16px;
  }

  .story-intro h2 {
    font-size: 1.2rem;
  }

  .story-section,
  .story-ending {
    grid-template-columns: 30px minmax(0, 1fr);
    gap: 10px;
    padding: 22px 0;
  }

  .story-section h2,
  .story-ending h2 {
    font-size: 1.2rem;
  }

  .waju-diagram img {
    max-height: 400px;
  }

  .story-footer {
    padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  }

  .story-footer span {
    max-width: 48%;
    line-height: 1.5;
  }

  .story-footer button {
    white-space: nowrap;
  }
}
</style>