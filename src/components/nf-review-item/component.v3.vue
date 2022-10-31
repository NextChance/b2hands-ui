<template src="./index.html"></template>
<style lang="scss" scoped src="./styles.scss"></style>

<script setup lang='ts'>
import { computed, ref, onMounted, watch } from 'vue'
import { getElapsedTime } from '@/external/tools/elapsedTime'
import UiProfileHeader from '../ui-profile-header/component.v2.vue'
import UiLazyInvent from '../ui-lazy-invent/component.v2.vue'

import type { _ImageSlim, ReviewReply, User } from '@/external/types/NoFakes_Reviews'
import { nextTick } from 'vue3'
const isShowingEllipsis = ref(false)
const isReviewOpen = ref(false)
const isReplyOpen = ref(false)
const hasScrollMsg = ref(false)
const hasScrollReply = ref(false)
const containerMaxHeight = ref('0px')
const BROKEN_IMAGE = 'https://broken-image.png/'
const msgContainer = ref<HTMLElement | null>(null)
const replyContainer = ref<HTMLElement | null>(null)

const onToggleMessage = 'on-toggle-message'
const onShowReviewOptions = 'on-show-review-options'
const onReplyVisible = 'on-reply-visible'
const onImageSelected = 'on-image-selected'
const emit = defineEmits<{
  (e: typeof onToggleMessage, {}): void;
  (e: typeof onShowReviewOptions, value: string): void;
  (e: typeof onReplyVisible, {}): void;
  (e: typeof onImageSelected, {}): void;
}>();

const props = withDefaults(
  defineProps<{
    user: User;
    text: string;
    id: string;
    rating: number;
    showRatingValue: Boolean;
    publishedAt: number;
    isVerifiedReview: Boolean;
    status?: string;
    reply?: ReviewReply;
    businessName: string;
    businessId: string;
    isReply: Boolean;
    images: _ImageSlim[];
    $t: Function;
    locale: string;
  }>(),
  {
    user: undefined,
    text: '',
    id: '',
    rating: 0,
    showRatingValue: Boolean,
    publishedAt: 0,
    isVerifiedReview: Boolean,
    status: '',
    reply: undefined,
    businessName: '',
    businessId: '',
    isReply: Boolean,
    // @ts-ignore
    images: [],
    $t: Function,
    locale: '',
  }
);


const hasSkeletons = computed(() => {
  return !props.rating && !props.isReply
})

const isPending = computed(() => {
  return props.status === 'pending'
})

const getStatusMsg = computed(() => {
  return props.status === 'pending' ? props.$t('review_status_pending_msg') : ''
})

const formatDate = computed(() => {
  const elapseTime = getElapsedTime(props.publishedAt, props.locale)
  return typeof elapseTime === 'string' ? elapseTime : props.$t(elapseTime.msg, { variable1: elapseTime.variable1 })
})

watch(() => props.text, () => {
  nextTick(() => {
    const lineHeigth = 18
    if (msgContainer) {
      const scrollHeight = msgContainer.value?.scrollHeight || 0
      const offsetHeight = msgContainer.value?.offsetHeight || 0
      hasScrollMsg.value = (scrollHeight - offsetHeight) > lineHeigth
    }

    if (replyContainer) {
      const scrollHeight = replyContainer.value?.scrollHeight || 0
      const offsetHeight = replyContainer.value?.offsetHeight || 0
      hasScrollReply.value = (scrollHeight - offsetHeight) > lineHeigth
    }
  })
}, {
  immediate: true
})

const handleToogleMsg = () => {
  if (isReviewOpen.value) {
    containerMaxHeight.value = '0px'

    setTimeout(() => {
      isShowingEllipsis.value = false
      isReviewOpen.value = false
    }, 200)
  } else {
    isShowingEllipsis.value = true
    containerMaxHeight.value = `${msgContainer.value?.scrollHeight || 0}px !important`

    setTimeout(() => {
      isReviewOpen.value = true
    }, 100)

    emit(onToggleMessage, {
      reviewId: props.id,
      isReply: props.isReply
    })
  }
}

const showOptions = () => {
  emit(onShowReviewOptions, props.id)
}

const onReplyVisibilityChange = (isVisible:boolean) => {
  if (isVisible && !!props.reply?.text) {
    emit(onReplyVisible, {
      businessId: props.businessId,
      reviewId: props.id,
      dateResponse: props.reply?.repliedAt
    })
  }
}

const handleImage = (index: number) => {
  const imageId = props.images[index].url.split('images/')[1] || ''

  emit(onImageSelected, {
    index,
    images: props.images,
    imageId,
    reviewId: props.id
  })
}
</script>
