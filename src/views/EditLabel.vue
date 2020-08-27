<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="back"
            @click="goBack"></Icon>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <form-item :value="tag.name"
                 @update:value="update"
                 field-name="标签名" placeholder="点击输入备注"></form-item>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem},
  })
  export default class EditLabel extends Vue {
    get tag(){
      return this.$store.state.currentTag
    }

    created() {
      const id = this.$route.params.id
      this.$store.commit('fetchTags')
      this.$store.commit('setCurrentTag',id)
      if (!this.tag) {
        this.$router.replace('/404'); //push回退不了
      }
    }

    update(name: string) {
      this.$store.commit('updateTag',{id:this.tag.id,name})
    }

    remove() {
      this.$store.commit('removeTag',this.tag.id)
      this.goBack()
    }

    goBack() {
      this.$router.back();
    }
  }
</script>

<style lang="scss" scoped>
  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 0;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .leftIcon {
      width: 24px;
      height: 24px;
    }

    > .title {

    }

    > .rightIcon {
      width: 24px;
      height: 24px;
    }

    > svg {
      width: 24px;
      height: 24px;
      color: #666;
      margin-right: 16px;
    }
  }

  .form-wrapper {
    background-color: white;
    margin-top: 8px;
  }

  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>