<script lang="ts" setup>
import { useModal } from '@/composables/modal'
import { onUnmounted } from 'vue'

const { modalEl, showModal, hideModal } = useModal()

onUnmounted(hideModal)

defineExpose({
  show: showModal,
  hide: hideModal,
})
</script>

<template>
  <div class="modal" tabindex="-1" ref="modalEl">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title"><slot name="title" /></h3>
        </div>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  &-dialog {
    max-width: 33rem;

    @include media-breakpoint-down(sm) {
      margin-left: auto;
      margin-right: auto;
    }
  }

  &-content {
    border: none;
    padding: 4rem 3rem;
    background-color: rgba(0, 0, 0, 0.75);
    border: 2px solid #fff;
    border-radius: 2rem;

    @include media-breakpoint-down(sm) {
      padding: 4rem 3rem 3rem;
    }
  }

  &-title {
    font-size: 3rem;
  }

  &-header {
    border-bottom: none;
    border-radius: 0;
    padding: 0;
    justify-content: center;
    align-items: center;

    .close {
      position: absolute;
      top: 2rem;
      right: 2rem;
      opacity: 1;
      padding: 0;
      display: flex;
      border: none;
      background: none;
      font-size: 3.6rem;
      z-index: 1000;

      @include media-breakpoint-down(lg) {
        top: 1.2rem;
        right: 1.2rem;
        font-size: 2.5rem;
      }
    }
  }

  &-body {
    padding: 0;
  }
}
</style>

<style>
.modal-backdrop {
  backdrop-filter: blur(0.7rem);
  --bs-backdrop-bg: rgba(0, 0, 0, 0.1) !important;
  --bs-backdrop-opacity: 1 !important;
}
</style>
