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
  import store from '@/store/index2';

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    tag: { name: string; id: string } = store.findTag(this.$route.params.id);

    created() {
      if (!this.tag) {
        this.$router.replace('/404'); //push回退不了
      }
    }

    update(name: string) {
      if (this.tag) {
        store.updateTag(this.tag.id,name)
      }
    }

    remove() {
      if (this.tag) {
        if (store.removeTag(this.tag.id)) {
          this.$router.back();
        } else {
          window.alert('删除失败');
        }
      }
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