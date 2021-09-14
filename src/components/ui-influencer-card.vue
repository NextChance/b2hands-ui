<template>
  <div
    v-observe-visibility="{
      callback: onVisibilityChanged,
      intersection: {
        threshold: 0.9
      }
    }"
    class="ui-influencer-card"
    :class="[
      isAnimatedElementVisible
        ? 'animated-elements--visible'
        : 'animated-elements--hidden',
      {
        'animated-elements--show-animation': showAnimationElements,
        'animated-elements--hide-animation': hideAnimationElements
      }
    ]"
  >
    <ui-profile-header
      :profile-image="profile.image"
      :alt="profile.alt"
      :user-name="profile.name"
      :secondary-info="date"
      @on-more-options-clicked="onMoreOptionsClicked"
      @on-image-loaded="onImageLoaded"
    />
    <div class="ui-influencer-card__media" @click="onClickImage">
      <ui-lazy-invent
        class="ui-influencer-card__media__image-container"
        :src="postImage.src"
        :srcset="postImage.srcSets"
        :alt="postImage.alt"
        :sizes="sizes"
        :is-error-forced="isErrorForced"
        @on-image-loaded="onImageLoaded"
        @on-image-error="onImageError(`nav-actions`)"
      />
      <div :ref="`nav-actions`" class="nav-actions">
        <a
          id="icons"
          href="#"
          class="nav-actions__icons"
          @click.capture="onClickIcon($event)"
          @animationstart="onIconAnimationStart"
          @animationend="onIconAnimationEnd"
          ><i class="b2i-search-similars" />
          <div class="nav-actions__icons__text">
            <span class="nav-actions__label">
              {{ actionText }}
            </span>
          </div>
        </a>
      </div>
      <template v-if="isImageLoaded && !isErrorForced">
        <ol
          :class="['ui-influencer-card__bound-list']"
          :style="{
            height: imageSize.height,
            width: imageSize.width
          }"
        >
          <li
            v-for="(bound, key) in bounds"
            :key="`bound-selector-${key}`"
            :class="['ui-influencer-card__bound']"
            :style="{
              top: `${100 * (bound.top + bound.height / 2)}%`,
              left: `${100 * (bound.left + bound.width / 2)}%`
            }"
            @click="onSelectBound(bound)"
          >
            <span class="bound-dot"></span>
          </li>
        </ol>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
import Vue, { PropType } from 'vue'
import uiProfileHeader from './ui-profile-header.vue'
import UiLazyInvent from './ui-lazy-invent.vue'
import Profile from '../types/Profile'
import Bound from '../types/Bound'
import Image from '../types/Image'
interface Data {
  imageSize: {
    height: string
    width: string
  }
  isImageLoaded: boolean
  isImageMoreLandscape: boolean
  isVisible: boolean
  isReady: boolean
  showAnimationElements: boolean
  hideAnimationElements: boolean
  isAnimatedElementVisible: boolean
  isFirstTime: boolean
  hasClicked: boolean
  isAnimating: boolean
  delayAnimationTimeOut: ReturnType<typeof setTimeout>
}

export default Vue.extend({
  name: 'UiInfluencerCard',
  components: { uiProfileHeader, UiLazyInvent },
  props: {
    profile: {
      type: Object as () => Profile,
      default: {}
    },
    postImage: {
      type: Object as () => Image,
      default: {}
    },
    description: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    bounds: {
      type: Array as PropType<Array<Bound>>,
      default: []
    },
    sizes: {
      type: String,
      default: ''
    },
    isErrorForced: {
      type: Boolean,
      default: false
    },
    actionText: {
      type: String,
      default: ''
    }
  },
  data(): Data {
    return {
      imageSize: {
        height: '100%',
        width: '100%'
      },
      isImageMoreLandscape: false,
      isImageLoaded: false,
      isVisible: false,
      isReady: false,
      showAnimationElements: false,
      hideAnimationElements: false,
      isAnimatedElementVisible: false,
      isFirstTime: false,
      hasClicked: false,
      isAnimating: false,
      delayAnimationTimeOut: setTimeout(() => {}, 0)
    }
  },
  methods: {
    onMoreOptionsClicked(): void {
      this.$emit('open-more-options')
    },

    onImageError(refName: string): void {
      const element = this.$refs[refName] as HTMLElement
      element.classList.add('nav-actions--error')
    },

    onImageLoaded(): void {
      this.isImageLoaded = true
    },

    onVisibilityChanged(isVisible: boolean): void {
      this.isVisible = isVisible
      if (isVisible) {
        this.delayAnimationTimeOut = setTimeout(() => {
          this.isAnimatedElementVisible = true
          this.showAnimationElements = true
          this.hideAnimationElements = false
        }, 1000)
      } else {
        clearTimeout(this.delayAnimationTimeOut)
        if (this.showAnimationElements) {
          this.hideAnimationElements = true
        }
        this.showAnimationElements = false
        this.isAnimatedElementVisible = false
        this.hasClicked = false
      }
      console.log(`>${this.profile.name} is visible`, this.isVisible)
    },

    onSelectBound(bound: Bound): void {
      this.$emit('on-select-bound', bound)
    },

    onClickImage(): void {
      this.hasClicked = true
      if (!this.isAnimating) {
        this.showAnimationElements = !this.showAnimationElements
        this.hideAnimationElements = !this.hideAnimationElements
        this.isAnimatedElementVisible = !this.isAnimatedElementVisible
      }
    },

    onClickIcon($event: MouseEvent): void {
      $event.preventDefault()
      //¿enviamos algun id o similar?
      this.$emit('click', $event)
    },

    onIconAnimationStart() {
      this.isAnimating = true
    },

    onIconAnimationEnd(ev) {
      const isParent = ev.currentTarget.id === 'icons'
      if (isParent) {
        this.isAnimating = false
        if (this.isAnimatedElementVisible && !this.hasClicked) {
          console.log('>>this.isAnimatedElementVisible', this.isAnimatedElementVisible, this.profile.name)
          console.log('>>this.hasClicked', this.hasClicked)
          this.showAnimationElements = false
          this.hideAnimationElements = true
          this.isAnimatedElementVisible = false
        } else {
          console.log('>> NO SE CUMPLE this.isAnimatedElementVisible && !this.hasClicked')
          this.hideAnimationElements = false
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.ui-influencer-card {
  $uiInfluencerCard: &;
  padding-top: $spacing-size-3;
  &__media {
    height: 100%;
    object-fit: contain;
    position: relative;
    width: 100%;
  }
  &__selected-mark {
    bottom: 0;
    left: 0;
    margin: auto;
    position: absolute;
    right: 0;
    top: 0;

    &__veil {
      opacity: 0.4;
    }
  }
  &__bound-list {
    bottom: 0;
    left: 0;
    margin: auto;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  &__bound {
    $size: 28px;
    align-items: center;
    background-color: rgba($background-inverse, 0.16);
    border-radius: 50%;
    color: $background-inverse;
    cursor: pointer;
    display: flex;
    font-size: $font-size-3;
    height: $size;
    justify-content: center;
    margin-left: -1 * $size / 2;
    margin-top: -1 * $size / 2;
    position: absolute;
    transform: scale(1);
    transform-origin: center;
    //transition: transform .2s;
    width: $size;
    z-index: 1;
    .bound-dot {
      display: block;
      background: $background-1;
      height: $spacing-size-3;
      width: $spacing-size-3;
      border-radius: 50%;
    }
  }
  @media (min-width: $breakpoint-s) {
    $size: $spacing-size-8;
    &__bound-list {
      height: 100% !important;
      width: 100% !important;
    }
    &__bound {
      margin-left: -1 * $size / 2;
      margin-top: -1 * $size / 2;
      height: $size;
      width: $size;
      .bound-dot {
        height: $spacing-size-4;
        width: $spacing-size-4;
      }
    }
  }
  .nav-actions {
    &__icons {
      $navActionIcons: &;
      $padding: ($font-size-9 - $font-size-6) / 2;
      align-items: center;
      display: flex;
      line-height: 1rem;
      padding: $padding;
      position: relative;
      text-align: left;

      i {
        line-height: 1rem;
        vertical-align: middle;
      }

      &__text {
        @include body('s');
        display: block;
        opacity: 0;
        padding-left: $padding;
        padding-right: $padding;
        white-space: nowrap;
      }
    }
  }

  &.animated-elements {
    &--visible {
      opacity: 1;
      #{$uiInfluencerCard} {
        &__bound-list {
          opacity: 1;
        }
      }
      .nav-actions {
        &__icons {
          border-radius: 1rem;
          max-width: 22rem;
          width: initial;
          &__text {
            opacity: 1;
          }
        }
      }
    }

    &--hidden {
      /deep/ {
        .ui-profile-header__info__main-text {
          color:red;
        }
      }
      #{$uiInfluencerCard} {
        &__bound-list {
          opacity: 0;
        }
      }
      .nav-actions {
        &__icons {
          border-radius: 1rem;
          max-width: $font-size-9;
          width: initial;
          &__text {
            opacity: 0;
          }
        }
      }
    }

    &--show-animation {
      #{$uiInfluencerCard} {
        &__bound-list {
          animation: displayBounds 1000ms linear;
        }
      }
      .nav-actions {
        &__icons {
          animation: fabActionIconExpand 1000ms ease-in-out;
          &__text {
            animation: favActionShowText 1000ms ease-in-out;
          }
        }
      }
    }

    &--hide-animation {
      /deep/ .ui-profile-header__info__secondary-text {
        color:green;
      }
      #{$uiInfluencerCard} {
        &__bound-list {
          animation: hideBounds 1000ms linear;
        }
      }
      .nav-actions {
        &__icons {
          animation: favActionIconContract 1000ms ease-in-out;
          &__text {
            animation: favActionHideText 1000ms ease-in-out;
          }
        }
      }
    }
  }
}

@keyframes fabActionIconExpand {
  0% {
    max-width: $font-size-9;
  }

  100% {
    max-width: 22rem;
  }
}

@keyframes favActionIconContract {
  0% {
    max-width: 22rem;
  }

  100% {
    max-width: $font-size-9;
  }
}

@keyframes favActionShowText {
  0% {
    opacity: 0;
  }

  15% {
    opacity: 0;
  }

  25% {
    opacity: 0;
  }

  65% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
}

@keyframes favActionHideText {
  0% {
    opacity: 1;
  }

  25% {
    opacity: 1;
  }

  75% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}

@keyframes displayBounds {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes hideBounds {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
