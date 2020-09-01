<template>
  <div id="app">
    <transition>
      <router-view ></router-view>
    </transition>
  </div>
</template>


<style lang="scss">
  @import "~@/assets/style/helper.scss";
  @import "~@/assets/style/reset.scss";
  body{
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
    font-family: $font-hei;
    font-size: 16px;
    line-height: 1.5;
    background-color:#f5f5f5 ;
    transition: all .3s;
  }
</style>