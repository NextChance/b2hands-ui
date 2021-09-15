<template>
  <div class="ui-profile-header">
    <div class="ui-profile-header__image">
      <ui-lazy-invent
        :src="profileImage.src"
        :srcset="profileImage.srcSets"
        :alt="alt"
        @on-image-error="onImageError(`nav-actions`)"
      />
    </div>
    <div class="ui-profile-header__info">
      <div
        class="ui-profile-header__info__main-text"
        :class="{
          'ui-profile-header__info__main-text--skeleton':
            !userName || userName === ''
        }"
        >{{ userName }}</div
      >
      <div
        class="ui-profile-header__info__secondary-text"
        :class="{
          'ui-profile-header__info__secondary-text--skeleton':
            !secondaryInfo || secondaryInfo === ''
        }"
      >
        {{ secondaryInfo }}
      </div>
    </div>
    <div class="ui-profile-header__more-options">
      <a
        href="#"
        class="ui-profile-header__more-options__link"
        @click="handleMoreOptions"
      >
        <i class="dots">
          {{ moreOptions }}
        </i>
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import UiLazyInvent from './ui-lazy-invent.vue'
import Image from '../types/Image'

export default Vue.extend({
  name: 'UiProfileHeader',
  components: {
    UiLazyInvent
  },
  props: {
    profileImage: {
      type: Object as () => Image,
      default: {}
    },
    alt: {
      type: String,
      default: 'image'
    },
    userName: {
      type: String,
      default: ''
    },
    secondaryInfo: {
      type: String,
      default: ''
    },
    moreOptions: {
      type: String,
      default: 'More Options'
    }
  },
  methods: {
    handleMoreOptions(event: Event): void {
      event.preventDefault()
      this.$emit('on-more-options-clicked')
    }
  }
})
</script>
<style scoped lang="scss">
.ui-profile-header {
  $ui-profile-header: &;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: $spacing-size-2;
  width: 100%;
  &__image {
    border-radius: 50%;
    height: $spacing-size-7;
    margin-right: $spacing-size-2;
    overflow: hidden;
    width: $spacing-size-7;
  }

  &__info {
    color: $content-1;
    flex-grow: 2;
    font-size: $font-size-3;
    &__main-text,
    &__secondary-text {
      display: block;
    }
    &__secondary-text {
      color: $content-3;
      @include detail('xs');
    }
  }

  &__more-options {
    &__link {
      display: flex;
      width: $spacing-size-5;
      > .dots {
        background-color: $black-100;
        border-radius: 50%;
        display: inline-block;
        font-size: 0;
        height: $spacing-size-1;
        margin-left: 7px;
        position: relative;
        width: $spacing-size-1;
        &:before,
        &:after {
          background-color: $black-100;
          border-radius: 50%;
          content: '';
          display: inline-block;
          height: $spacing-size-1;
          position: absolute;
          top: 0;
          width: $spacing-size-1;
        }
        &:before {
          left: -7px;
        }
        &:after {
          left: 7px;
        }
      }
    }
  }
}

.ui-profile-header__info__secondary-text,
.ui-profile-header__info__main-text {
  &--skeleton {
    @include text-skeleton;
    height: $spacing-size-3;
    width: 72px;
  }
}
</style>
