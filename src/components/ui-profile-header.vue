<template>
  <div class="ui-profile-header">
    <a
      class="ui-profile-header__link"
      @click.capture="onClickProfile($event)"
      :href="profileRoute"
    >
      <div class="ui-profile-header__image">
        <ui-lazy-invent
          :src="profileImage.smallest"
          :srcset="profileImage.srcSet"
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
          v-if="secondaryInfo !== ''"
        >
          {{ secondaryInfo }}
        </div>
      </div>
    </a>
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
import { ProfileImgUI } from '../types/Profile'

export default Vue.extend({
  name: 'UiProfileHeader',
  components: {
    UiLazyInvent
  },
  props: {
    profileImage: {
      type: Object as () => ProfileImgUI,
      default: () => ({})
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
      default: ''
    },
    profileRoute: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleMoreOptions(event: Event): void {
      event.preventDefault()
      this.$emit('on-more-options-clicked')
    },
    onClickProfile(event: Event): void {
      event.preventDefault()
      this.$emit('on-profile-clicked')
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
  &__link {
    display: flex;
  }

  &__image {
    border-radius: 50%;
    height: $spacing-size-7;
    margin-right: $spacing-size-2;
    min-width: $spacing-size-7;
    position: relative;
    overflow: hidden;
    width: $spacing-size-7;
  }

  &__info {
    color: $content-1;
    flex-grow: 2;
    font-size: $font-size-3;
    &__main-text {
      @include ellipsis(1, $line-height-1);
      line-height: $line-height-1;
      padding-right: $spacing-size-3;
    }
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
