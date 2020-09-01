<template>
  <div>
    <label class="formItem" >
      <Icon name="text" class="logo animate__animated animate__bounce" :class="{active:isActive}" ></Icon>
      <span class="name" >{{fieldName}}</span>
      <input type="text"
             :value="value"
             @input="onValueChanged($event.target.value)"
             @focusin="textFocusin"
             @focusout="textFocusout"
             :class="{active:isActive}"
             :placeholder="placeholder">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class FormItem extends Vue{
    @Prop({required:true})fieldName!: string
    @Prop()placeholder?: string
    @Prop({default:''})readonly value!: string
    @Prop()isClear!: boolean

    isActive=false

    //v-model = "value"可以代替
    // ：value 和 @ input = "value = $event.target.value"
    //是她两的语法糖
    textFocusin(){
      this.isActive=true
    }
    textFocusout(){
      this.isActive=false
    }

    onValueChanged(value: string){
      this.$emit('update:value',value)
    }
  }
</script>

<style lang="scss" scoped>
  @import "src/assets/style/helper";

  .formItem {
    font-size: 14px;
    padding-left: 8px;
    display: flex;
    align-items: center;



    .logo {
      height: 30px;
      width: 30px;
      margin-right: 5px;

      &.active{
        transition: all 0.3s;
        transform: scale(1.3);
        color: $selected-color;
      }
    }
    .name {
      padding-right: 16px;
    }
    input {
      height: 40px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>