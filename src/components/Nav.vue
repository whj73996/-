<template>
  <nav>
    <router-link to="/money" class="tag" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link to="/labels" class="tag" active-class="selected">
      <Icon name="label"/>
      标签
    </router-link>
    <router-link to="/statistics" class="tag" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
  export default {
    name: 'Nav'
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  nav {
    @extend %outerShadow;
    display: flex;
    flex-direction: row;
    font-size: 12px;
    > .tag {
      padding: 4px 0 10px 0;
      width: 33.33333%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon {
        width: 32px;
        height: 32px;
      }
    }
    > .tag.selected{
      color:$selected-color;
    }
  }
</style>