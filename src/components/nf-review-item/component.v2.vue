<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script lang='ts'>
import Vue, { PropType } from 'vue'
import { getElapsedTime } from '@/external/tools/elapsedTime'
import UiProfileHeader from '@/components/ui-profile-header/component.v2.vue'
import UiLazyInvent from '@/components/ui-lazy-invent/component.v2.vue'

import type { _ImageSlim, ReviewReply, User } from '@/types/NoFakes_Reviews'

export default Vue.extend({
  name: 'NfReviewItem',
  data() {
    return {
      isShowingEllipsis : false,
      isReviewOpen : false,
      isReplyOpen : false,
      hasScrollMsg : false,
      hasScrollReply : false,
      containerMaxHeight : '0px',
      BROKEN_IMAGE : 'https://broken-image.png/',
    }
  },
  components: {
    UiProfileHeader,
    UiLazyInvent
  },
  props: {
    user: {
      type: Object as () => User,
      default: () => ({})
    },
    text: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    rating: {
      type: Number,
      default: 0
    },
    showRatingValue: {
      type: Boolean,
      default: false
    },
    publishedAt: {
      type: Number,
      default: 0
    },
    isVerifiedReview: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: ''
    },
    reply: {
      type: Object as () => ReviewReply
    },
    businessName: {
      type: String,
      default: ''
    },
    businessId: {
      type: String,
      default: ''
    },
    isReply: {
      type: Boolean,
      default: false
    },
    images: {
      type: Array as PropType<_ImageSlim[]>,
      default: (): _ImageSlim[] => []
    },
    $t: {
      type: Function
    },
    locale: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasSkeletons (): Boolean {
      return !this.rating && !this.isReply
    },
    isPending (): Boolean {
      return this.status === 'pending'
    },
    getStatusMsg (): String {
      return this.status === 'pending' ? this.$t('review_status_pending_msg') : ''
    },
    formatDate (): String {
      const elapseTime = getElapsedTime(this.publishedAt, this.locale)
      return typeof elapseTime === 'string' ? elapseTime : this.$t(elapseTime.msg, { variable1: elapseTime.variable1 })
    }
  },
  watch: {
    text: {
      immediate: true,
      handler(): void {
        this.$nextTick(() => {
          const lineHeigth = 18
          const msgContainer = this.$refs.msgContainer as HTMLElement
          const replyContainer = this.$refs.replyContainer as HTMLElement
          if (msgContainer) {
            this.hasScrollMsg = (msgContainer.scrollHeight - msgContainer.offsetHeight) > lineHeigth
          }

          if (replyContainer) {
            this.hasScrollReply = (replyContainer.scrollHeight - replyContainer.offsetHeight) > lineHeigth
          }
        })
      }
    }
  },
  methods: {
    handleToogleMsg () {
      if (this.isReviewOpen) {
        this.containerMaxHeight = '0px'

        setTimeout(() => {
          this.isShowingEllipsis = false
          this.isReviewOpen = false
        }, 200)
      } else {
        this.isShowingEllipsis = true
        const msgContainer = this.$refs.msgContainer as HTMLElement
        this.containerMaxHeight = `${msgContainer.scrollHeight}px !important`

        setTimeout(() => {
          this.isReviewOpen = true
        }, 100)

        this.$emit('on-toggle-message', {
          reviewId: this.id,
          isReply: this.isReply
        })
      }
    },
    showOptions () {
      this.$emit('on-show-review-options', this.id)
    },
    onReplyVisibilityChange (isVisible:boolean) {
      if (isVisible && !!this.reply.text) {
        this.$emit('on-reply-visible', {
          businessId: this.businessId,
          reviewId: this.id,
          dateResponse: this.reply.repliedAt
        })
      }
    },
    handleImage (index: number) {
      const imageId = this.images[index].url.split('images/')[1] || ''

      this.$emit('on-image-selected', {
        index,
        images: this.images,
        imageId,
        reviewId: this.id
      })
    }
  }
})
</script>
