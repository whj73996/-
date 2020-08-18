<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="cash"/>
      花费
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="data"/>
      标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="label"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">

  import Icon from '@/components/Icon.vue';
  export default {
    name: 'Nav',
    components: {Icon}
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  nav{
    display: flex;
    box-shadow:0 -2px 6px rgba(0,0,0,0.1);
    > .item{
      padding: 4px 0;
      width: 33.33%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      >.icon{
        width: 32px;
        height: 32px;
      }
    }
    >.item.selected{
      color:$color-highlight;
    }
  }
</style>