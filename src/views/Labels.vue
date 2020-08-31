<template>
  <Layout>
    <div class="tags">
      <router-link class="tag" :to="`/labels/edit/${tag.id}`" v-for="tag in tagList" :key="tag.id">
        <span >{{tag.name}}</span>
        <Icon name="right"></Icon>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">
        新建标签
      </Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import {mixins} from 'vue-class-component';
  import {TagHelper} from '@/mixins/TagHelper';

  @Component({
    components:{Button},

  })
  export default class Tags extends mixins(TagHelper){

    get tagList(){
      return this.$store.state.tagList
    }

    created(){
      this.$store.commit('fetchTags')
    }


  }
</script>

<style lang="scss" scoped>
  @import "src/assets/style/helper";
  .tags{
    background-color: white;
    font-size: 16px;
    padding-left: 16px;
    >.tag{
      min-height: 44px;
      display: flex;
      padding-left: 100px;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      >span{
        padding: 2px 8px;
        background-color: #ededed;
        border-radius: 8px;
      }
      >svg{
        width: 24px;
        height: 24px;
        color: #666;
        margin-right: 16px;
      }
    }
  }
  .createTag{
    background-color: darken($beSelected-color,42%);
    color: white;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
    &-wrapper{
      text-align: center;
      padding: 16px;
      margin-top: 44-16px;
    }
  }
</style>