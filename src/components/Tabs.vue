<template>
  <ul class="tabs">
    <li v-for="item in dataSource"
        :key="item.value"
        class="tabs-item"
        :class="liClass(item)"
        @click="select(item)">{{item.text}}
    </li>
  </ul>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DataSourceItem = {text: string;value: string}

  @Component
  export default class Tabs extends Vue {
    @Prop() readonly value!: string;
    @Prop() readonly classPrefix?: string;
    @Prop({required: true, type: Array})
    dataSource!: { text: string; value: string }[];

    liClass(item: DataSourceItem) {
      return {
        selected: item.value === this.value,
        [this.classPrefix + '-tabs-item']: this.classPrefix
      };
    }

    select(item: DataSourceItem) {
      this.$emit('update:value', item.value);
      console.log(item.value);
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/style/helper";
  .tabs {
    background: #c4c4c4;
    display: flex;
    text-align: center;
    font-size: 24px;

     &-item {
      width: 50%;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

      &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: $selected-color;
        transform-origin: right;
        animation: selected 0.3s;
      }

       @keyframes selected {
         0%{
           transform: translateX(-100%);
         }

         100%{
           transform: translateX(0%);
         }
       }
    }
  }
</style>