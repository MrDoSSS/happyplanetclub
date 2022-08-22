<template>
  <footer class="py-2">
    <div class="container">
      <div class="d-flex align-items-center flex-column flex-lg-row py-1">
        <div class="flex-grow-1 text-center mb-2 mb-lg-0">
          Happy Planet Club. All rights reserved.
        </div>
        <div class="d-flex">
          <div class="me-2">
            <a href="https://twitter.com/HappyPlanetNFT" target="_blank">
              <i class="bi bi-twitter"></i>
            </a>
          </div>
          <div>
            <a href="https://discord.gg/dQqGuFuJvd" target="_blank">
              <i class="bi bi-discord"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
footer {
  @include media-breakpoint-down(lg) {
    font-size: 1.2rem;

    i {
      font-size: 3rem;
    }
  }
}
</style>
