<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { inject } from 'vue'
import { useWhitelistStore } from '@/store/whitelist'
import { useWalletStore } from '@/store/wallet'
import { useAuthStore } from '@/store/auth'

import 'swiper/css'

const mq = inject('mq') as any
const walletStore = useWalletStore()
const authStore = useAuthStore()
const whitelistStore = useWhitelistStore()
</script>

<template>
  <section class="mint" id="mint">
    <div class="mint-bg-mobile d-lg-none" />
    <div class="container">
      <div
        class="row justify-content-lg-between justify-content-center align-items-end"
      >
        <div class="col-12 col-lg-5">
          <div class="mint-text text-center text-lg-start">
            <h2>Hello, Earthling.</h2>
            <ul class="mb-4">
              <li>Launch Date: 08/27</li>
              <li class="mb-2">Supply: 3000</li>
              <li>Whitelist: 3:00PM EST</li>
              <li class="mb-2">2 FREE + 2 for 0.006 ETH</li>
              <li>Public: 3:20PM EST</li>
              <li>1 FREE + 2 for 0.009 ETH</li>
            </ul>
            <div class="mb-1 mint-amount-container d-inline-block">
              <select class="mint-amount">
                <option value="" disabled selected>How many?</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <i class="bi bi-caret-down-fill"></i>
            </div>
            <div>
              <button class="btn btn-primary mb-1">Mint (Soon)</button>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-7">
          <picture>
            <source srcset="/home/hero.webp" type="image/webp" />
            <source srcset="/home/hero.png" type="image/png" />
            <img src="/home/hero.png" />
          </picture>
        </div>
      </div>
    </div>
  </section>
  <section class="learn" id="learn">
    <div class="container">
      <div
        class="row justify-content-lg-start justify-content-center align-items-center gx-3"
      >
        <div class="col-12 col-md-6 col-lg-5 order-2 order-lg-1">
          <picture>
            <source srcset="/home/feature.webp" type="image/webp" />
            <source srcset="/home/feature.png" type="image/png" />
            <img src="/home/feature.png" />
          </picture>
        </div>
        <div class="col-12 col-lg-7 order-1 order-lg-2">
          <h2 class="text-primary">⍙⟒⌰☊⍜⎍ ☌⊑⏁ ⌰⟒⏁´⌇ ☌⍜</h2>
          <p>
            Welcome to your new home. A place where everything is possible and
            sadness is unknown. Find your perfect purpose, mix up with your
            fellow brothers and be happy. Happy Planet Club is a free-mint NFT
            collection on the ETH blockchain consisting of 3,000 tokens. Our
            characters are divided into 5 different races. Find a great variety
            of traits and unique combinations. No&nbsp;promises, no roadmap,
            just art.
          </p>
        </div>
      </div>
    </div>
  </section>
  <section class="sneeks">
    <div
      class="d-flex d-lg-none align-items-center justify-content-center mb-1"
    >
      Swipe left to see more <i class="bi bi-arrow-right-short"></i>
    </div>
    <Swiper :slides-per-view="mq.lgPlus ? 6 : 'auto'" :space-between="0">
      <SwiperSlide class="sneek" v-for="i in 6" :key="i">
        <picture>
          <source :srcset="`/home/sneek-${i}.webp`" type="image/webp" />
          <source :srcset="`/home/sneek-${i}.png`" type="image/png" />
          <img :src="`/home/sneek-${i}.png`" />
        </picture>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style lang="scss" scoped>
.mint {
  @include media-breakpoint-up(lg) {
    background: url('/home/bg.png') no-repeat center;

    @supports (background-image: -webkit-image-set(url('/home/bg.webp') 1x)) {
      background-image: -webkit-image-set(url('/home/bg.webp') 1x);
    }
  }

  &-bg-mobile {
    background: url('/home/bg.png') no-repeat center;

    @supports (background-image: -webkit-image-set(url('/home/bg.webp') 1x)) {
      background-image: -webkit-image-set(url('/home/bg.webp') 1x);
    }
    background-position: 60% 0;
    position: absolute;
    top: 15rem;
    left: 0;
    right: 0;
    height: 50vh;
    min-height: 50rem;
    z-index: -1;
  }

  &-text {
    padding: 5rem 0 8rem;

    h2 {
      position: relative;
      padding-bottom: 1.4rem;

      &:after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 3rem;
        height: 0.2rem;
        background-color: #d9d9d9;

        @include media-breakpoint-down(lg) {
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    ul {
      list-style: none;
      padding-left: 0;
    }
  }

  &-amount {
    appearance: none;
    background: #a2a2a2;
    border: 0.1rem solid #ffffff;
    border-radius: 1rem;
    color: #fff;
    outline: none;
    font-size: 1.8rem;
    text-align: center;
    padding: 0.64rem;
    min-width: 16.5rem;

    &-container {
      position: relative;

      i {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 1.2rem;
        font-size: 1.2rem;
      }
    }
  }

  button {
    min-width: 16.5rem;
  }
}

.learn {
  padding: 8rem 0;

  @include media-breakpoint-down(lg) {
    text-align: center;
  }

  @include media-breakpoint-down(sm) {
    padding: 5rem 0;

    h2,
    p {
      max-width: 28rem;
      margin: auto;
    }
  }

  img {
    @include media-breakpoint-up(lg) {
      position: relative;
      left: -2rem;
    }
  }

  p {
    font-size: 1.4rem;
    line-height: 1.6rem;
  }
}

.sneeks {
  i {
    font-size: 2rem;
    margin-left: 0.5rem;
  }
}
</style>

<style lang="scss">
.sneek {
  @include media-breakpoint-down(lg) {
    max-width: 45%;
  }

  @include media-breakpoint-down(sm) {
    max-width: 90%;
  }
}
</style>
