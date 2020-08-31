<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" :isClear="isClear"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"></Tabs>
    <div class="notes">
      <FormItem field-name="备注"
                :value.sync="record.notes"
                placeholder="点击输入备注"
                :isClear="isClear"
      />
    </div>
    <Tags @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from  "vue"
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component, Watch} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  //Ts和js配合只能用require
  // const model = require ('@/model.js').default;
  // require不识别default，得自己在后面加一个Default
  //const {model} = require ('@/model.js') 也可以用析构
  //export {model} 也可以这么导出



  @Component({
    components:{Tabs, Button, Tags,FormItem,NumberPad},

  })
  export default class Money extends Vue{

    @Watch('isClear')
    onIsClearChanged(){
      if(this.isClear)this.record.notes=''
    }

    beforeCreate(){
      if(this.$store.state.tagList.length===0){
        this.$store.commit('createTag','衣')
        this.$store.commit('createTag','食')
        this.$store.commit('createTag','住')
        this.$store.commit('createTag','行')
        this.$store.commit('createTag','娱')
      }
    }

    recordTypeList=recordTypeList
    isClear=false
    get recordList(){
      return this.$store.state.recordList
    }

    record: RecordItem={
      tags:[],
      notes:'',
      type:'-',
      amount:0
    };
    created(){
      this.$store.commit('fetchRecords')
      this.$store.commit('fetchTags')
    }

    saveRecord(){
      if(this.record.tags.length===0){
        this.isClear=false
        return window.alert('请选择类型')
      }
      this.$store.commit('createRecord',this.record)
      this.isClear=true
    }
    onUpdateTags(value: Tag[]) {
      this.record.tags = value
    }
  }
</script>

<style lang="scss" scoped>
   ::v-deep .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
  .notes{
    padding: 12px 0;
  }
</style>