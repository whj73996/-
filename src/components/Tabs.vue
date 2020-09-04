<template>
  <div>
    <ul class="tabs">
      <li v-for="(item,index) in dataSource"
          :key="item.value"
          class="tabs-item"
          :class="liClass(item)"
          @click="select(item,index)">
        {{item.text}}
      </li>
      <transition>
        <span class="selected-dot" :class="{move1:tab===1,move0:tab===0}"></span>
      </transition>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  type DataSourceItem = { text: string; value: string }

  @Component
  export default class Tabs extends Vue {
    @Prop() readonly value!: string;
    @Prop() readonly classPrefix?: string;
    @Prop({required: true, type: Array})
    dataSource!: { text: string; value: string }[];

    tab=0

    liClass(item: DataSourceItem) {
      return {
        selected: item.value === this.value,
        [this.classPrefix + '-tabs-item']: this.classPrefix
      };
    }

    select(item: DataSourceItem,index:string) {
      this.$emit('update:value', item.value);
      this.tab = parseInt(index)
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
    position: relative;


    .selected-dot{
      width: 50%;
      height: 4px;
      background:darken($selected-color,3%);
      position:absolute;
      bottom: 0;
      transition: all 0.3s ease;


      &.move1{
        left: 50%;
        /*transform: translateX(50vw);*/
      }
      &.move0{
        left: 0;
        /*transform: translateX(0);*/
      }
    }


    &-item {
      width: 50%;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;

/*            &.selected::after {
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
        0% {
          transform: translateX(-100%);
        }

        100% {
          transform: translateX(0%);
        }
      }*/
    }
  }
</style>