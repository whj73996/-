<template>
  <div>
    <label class="notes">
      <span class="name">{{fieldName}}</span>
      <input type="text"
             v-model="value"
             :placeholder="placeholder">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component,Watch,Prop} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue{
    @Prop({required:true})fieldName: string
    @Prop()placeholder?: string
    value='' //v-model = "value"可以代替
            // ：value 和 @ input = "value = $event.target.value"
            //是她两的语法糖
    @Watch('value')
    onValueChanged(value: string){
      this.$emit('update:value',value)
    }
  }
</script>

<style lang="scss" scoped>
  .notes {
    font-size: 14px;
    background: #f5f5f5;
    padding-left: 16px;
    display: flex;
    align-items: center;
    .name {
      padding-right: 16px;
    }
    input {
      height: 64px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>