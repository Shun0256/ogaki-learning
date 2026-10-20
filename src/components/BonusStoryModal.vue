<template>
  <div v-if="visible" class="bonus-overlay" @click.self="emit('close')" @keydown.esc.stop="emit('close')">
    <article class="bonus-dialog" role="dialog" aria-modal="true" aria-labelledby="bonus-story-title">
      <div class="bonus-topbar">
        <span class="bonus-topbar-label">✦ 最終確認問題 クリア特典</span>
        <button ref="closeButton" type="button" class="bonus-close" aria-label="特別ページを閉じる" @click="emit('close')">
          閉じる <span aria-hidden="true">×</span>
        </button>
      </div>

      <header class="bonus-hero">
        <span class="bonus-eyebrow">SPECIAL STORY · 大垣市輪中館</span>
        <p class="bonus-congrats">学習完了、おめでとうございます。</p>
        <h2 id="bonus-story-title">水の都の、<br /><span>もう一つの物語。</span></h2>
        <p class="bonus-intro">
          7つの場所を巡り、確認問題をクリアしたあなたへ。<br class="desktop-break" />
          最後に、まだ紹介していなかった大垣の一面をお届けします。
        </p>
        <svg class="hero-waves" viewBox="0 0 760 90" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 37 Q95 5 190 37 T380 37 T570 37 T760 37 L760 90 L0 90Z" fill="#eaf5f8" opacity="0.32" />
          <path d="M0 58 Q95 28 190 58 T380 58 T570 58 T760 58 L760 90 L0 90Z" fill="#ffffff" opacity="0.95" />
        </svg>
      </header>

      <div class="bonus-content">
        <section class="bonus-section">
          <p class="section-number">01 / 水の都のもう一つの顔</p>
          <h3>水は、恵みであると同時に。</h3>
          <p>
            加賀野八幡神社の湧き水、水門川の景色、船町港跡の水運。
            これまで見てきた大垣の水は、まちに多くの恵みをもたらしてきました。
          </p>
          <p>
            しかし、水はいつも穏やかだったわけではありません。
            川の水があふれると、家や田畑が水につかり、人々の暮らしが脅かされることもありました。
          </p>
        </section>

        <section class="bonus-section">
          <p class="section-number">02 / 人々が築いた工夫</p>
          <h3>暮らしを囲む「輪中」</h3>
          <p>
            そこで人々が築いたのが<strong>輪中（わじゅう）</strong>です。
            輪中とは、集落や田畑を堤防で囲み、洪水から暮らしを守ろうとした地域のこと。
            水の多い土地で生活を続けるための、大切な工夫でした。
          </p>

          <figure class="waju-figure">
            <svg viewBox="0 0 680 250" role="img" aria-label="輪中の模式図。外側に川があり、堤防が集落や田畑を囲んでいる。">
              <rect width="680" height="250" rx="16" fill="#e6f3fa" />
              <path d="M0 42 Q170 10 350 38 T680 30" stroke="#b8dce9" stroke-width="15" fill="none" opacity=".7"/>
              <path d="M0 213 Q180 192 355 220 T680 208" stroke="#b8dce9" stroke-width="15" fill="none" opacity=".7"/>
              <rect x="134" y="34" width="412" height="182" rx="87" fill="#fcf4dd" stroke="#b38b53" stroke-width="16" />
              <path d="M177 118 L503 118 M250 65 L250 190 M427 65 L427 190" stroke="#decbaa" stroke-width="2" stroke-dasharray="6 8" fill="none" />
              <g fill="#708f68">
                <circle cx="234" cy="86" r="9"/><circle cx="447" cy="157" r="9"/><circle cx="466" cy="88" r="8"/>
              </g>
              <g fill="#d77756">
                <path d="M302 131 L326 109 L350 131Z"/><path d="M365 145 L389 123 L413 145Z"/>
              </g>
              <g fill="#fffaf0" stroke="#987c5a" stroke-width="2">
                <rect x="308" y="132" width="36" height="32"/><rect x="371" y="146" width="36" height="28"/>
              </g>
              <g fill="#315a67" font-size="17" font-weight="700" text-anchor="middle">
                <text x="340" y="92">集落・田畑</text>
                <text x="340" y="201" font-size="15" fill="#805b2e">堤防</text>
                <text x="74" y="132" font-size="15">川</text>
                <text x="610" y="132" font-size="15">川</text>
              </g>
            </svg>
            <figcaption>輪中のしくみを表したイメージ図（実際の地形とは異なります）</figcaption>
          </figure>

          <p>
            堤防を築くだけでなく、洪水に備えて高い場所に避難用の建物を設けたり、
            舟を用意したりするなど、日々の暮らしにもさまざまな知恵が生まれました。
          </p>
        </section>

        <section class="bonus-section">
          <p class="section-number">03 / 特別スポット</p>
          <h3>大垣市輪中館で、その歴史を知る</h3>
          <p>
            大垣市輪中館では、明治時代の輪中を再現した精密模型や、
            水害を防ぐための道具、昔の農具・漁具などが展示されています。
            展示を通して、水と向き合ってきた人々の暮らしや工夫を知ることができます。
          </p>
          <div class="museum-details">
            <div class="museum-mark" aria-hidden="true">水</div>
            <div>
              <strong>大垣市輪中館</strong>
              <p>岐阜県大垣市入方2丁目1611番地1</p>
              <a href="https://www.city.ogaki.lg.jp/0000000609.html" target="_blank" rel="noopener noreferrer">
                大垣市公式サイトで施設情報を見る <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section class="bonus-ending">
          <span class="ending-star" aria-hidden="true">✦</span>
          <h3>水がくれたもの。<br />水から守ってきたもの。</h3>
          <p>
            豊かな水を生かした暮らしも、水害から暮らしを守る知恵も、
            どちらも「水の都・大垣」の大切な物語です。
          </p>
          <p class="ending-thanks">ここまで学んでくれて、ありがとうございました。</p>
          <button type="button" class="bonus-finish" @click="emit('close')">地図に戻る</button>
        </section>
      </div>
    </article>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false }
})
const emit = defineEmits(['close'])
const closeButton = ref(null)

watch(() => props.visible, async (visible) => {
  if (!visible) return
  await nextTick()
  closeButton.value?.focus()
})
</script>

<style scoped>
.bonus-overlay {
  position: fixed;
  inset: 0;
  z-index: 13000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  background: rgba(13, 37, 54, .72);
}
.bonus-dialog {
  width: min(780px, 100%);
  max-height: 94vh;
  max-height: 94dvh;
  overflow-y: auto;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 22px 70px rgba(0, 15, 36, .3);
  color: #263f4c;
  overscroll-behavior: contain;
}
.bonus-topbar {
  position: sticky;
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 10px 22px;
  background: #f9fcfe;
  border-bottom: 1px solid #e4edf2;
}
.bonus-topbar-label { color: #386e84; font-size: .8rem; font-weight: 700; letter-spacing: .04em; }
.bonus-close {
  border: 1px solid #dce8ef;
  border-radius: 999px;
  padding: 6px 13px;
  background: #fff;
  color: #36576b;
  font-size: .82rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
}
.bonus-close span { margin-left: 6px; font-size: 1.1rem; }
.bonus-hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: 330px;
  padding: 42px 44px 90px;
  color: #fff;
  background: linear-gradient(125deg, #163f59 0%, #195f76 70%, #2b8191 100%);
}
.bonus-hero::before {
  content: '';
  position: absolute;
  right: -120px;
  top: -160px;
  width: 420px;
  height: 420px;
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 50%;
  box-shadow: 0 0 0 55px rgba(255,255,255,.035), 0 0 0 110px rgba(255,255,255,.025);
  pointer-events: none;
}
.bonus-eyebrow { display: inline-block; color: #c5ebdb; font-size: .74rem; letter-spacing: .13em; font-weight: 700; }
.bonus-congrats { margin: 28px 0 10px; font-size: .96rem; }
.bonus-hero h2 { margin: 0; font-size: clamp(1.85rem, 5vw, 2.8rem); letter-spacing: .04em; line-height: 1.45; }
.bonus-hero h2 span { color: #f5de9b; }
.bonus-intro { position: relative; z-index: 1; margin: 19px 0 0; line-height: 1.9; font-size: .93rem; color: #e3eff5; }
.hero-waves { position: absolute; left: 0; bottom: -1px; width: 100%; height: 90px; }
.bonus-content { padding: 4px 44px 44px; }
.bonus-section { padding: 31px 0; border-bottom: 1px solid #e6eef2; }
.section-number { margin: 0 0 9px; font-size: .76rem; font-weight: 700; color: #438394; letter-spacing: .06em; }
.bonus-section h3 { margin: 0 0 18px; color: #234f68; font-size: clamp(1.24rem, 3vw, 1.5rem); line-height: 1.5; }
.bonus-section p:not(.section-number) { margin: 0 0 13px; font-size: .95rem; line-height: 2; }
.bonus-section strong { color: #216d83; }
.waju-figure { margin: 25px 0; padding: 14px 14px 9px; background: #f2f8fa; border: 1px solid #e1ecf0; border-radius: 15px; }
.waju-figure svg { display: block; width: 100%; height: auto; }
.waju-figure figcaption { margin-top: 8px; color: #587484; text-align: center; font-size: .72rem; line-height: 1.5; }
.museum-details { display: grid; grid-template-columns: 54px 1fr; gap: 15px; align-items: center; margin-top: 20px; padding: 18px; background: #f5f9fa; border: 1px solid #dcebee; border-radius: 14px; }
.museum-mark { width: 54px; height: 54px; border-radius: 14px; display: grid; place-items: center; color: #fff; background: #367f87; font-size: 1.35rem; font-weight: 700; }
.museum-details strong { font-size: 1rem; }
.museum-details p { margin: 4px 0 !important; font-size: .85rem !important; line-height: 1.6 !important; }
.museum-details a { display: inline-block; margin-top: 5px; color: #176b94; font-size: .83rem; font-weight: 700; text-underline-offset: 3px; }
.bonus-ending { padding: 38px 25px 25px; text-align: center; }
.ending-star { font-size: 1.6rem; color: #b48f4b; }
.bonus-ending h3 { margin: 12px 0 18px; color: #23516a; font-size: clamp(1.4rem, 4vw, 1.9rem); line-height: 1.55; }
.bonus-ending p { max-width: 480px; margin: 0 auto 16px; font-size: .94rem; line-height: 1.9; }
.bonus-ending .ending-thanks { font-weight: 700; color: #305d6f; margin-top: 26px; }
.bonus-finish { margin-top: 10px; min-height: 43px; padding: 10px 30px; border: none; border-radius: 999px; background: #236983; color: #fff; font-weight: 700; cursor: pointer; }
.bonus-finish:hover { background: #184d63; }
.bonus-close:focus-visible, .bonus-finish:focus-visible, .museum-details a:focus-visible { outline: 3px solid #e5bb59; outline-offset: 3px; }
@media (max-width: 600px) {
  .bonus-overlay { align-items: flex-end; padding: 0; }
  .bonus-dialog { width: 100%; max-height: 97vh; max-height: 97dvh; border-radius: 18px 18px 0 0; }
  .bonus-topbar { padding: 10px 16px; }
  .bonus-topbar-label { font-size: .7rem; }
  .bonus-hero { min-height: 300px; padding: 34px 22px 75px; }
  .bonus-congrats { margin-top: 22px; }
  .bonus-content { padding: 0 21px 24px; }
  .bonus-section { padding: 26px 0; }
  .bonus-ending { padding: 32px 6px 14px; }
  .desktop-break { display: none; }
  .museum-details { grid-template-columns: 45px 1fr; gap: 10px; padding: 13px; }
  .museum-mark { width: 45px; height: 45px; }
}
</style>
