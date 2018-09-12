<template>
  <div class="loading-wrapper" v-show="active">
    <div class="loading-content-wrapper">
      <p class="loading-content" v-html="content"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loadingData',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      default: 'loading...',
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>
  .loading-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    color: #FFF;
    font-size: 1.4rem;
    background-color: rgba(0, 0, 0, .5);
  }
  .loading-content-wrapper {
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    animation: rotate-y 3s linear infinite;
  }
  .loading-content-wrapper:before {
    content: '';
    display: block;
    position: fixed;
    top: calc(50vh - 12rem);
    left: calc(50vw - 12rem);
    height: 24rem;
    width: 24rem;
    padding: 5rem;
    border-top: 1rem solid #ef8060;
    border-right: 1rem solid #00ff80;
    border-bottom: 1rem solid #ffff00;
    border-left: 1rem solid #00ffff;
    border-radius: 50%;
    box-sizing: border-box;
    /* animation: name duration timing-function delay iteration-count direction fill-mode; */
    animation: rotate-infinite 1s linear infinite;
  }
  .loading-content {
    /* animation: rotate-reverse-y 3s linear infinite; */
  }
  @keyframes rotate-infinite {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes rotate-y {
    from {
      transform: rotateY(0);
    }
    to {
      transform: rotateY(360deg);
    }
  }
  @keyframes rotate-reverse-y {
    from {
      transform: rotateY(360deg);
    }
    to {
      transform: rotateY(0);
    }
  }
</style>
