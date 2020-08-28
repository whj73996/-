<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Tabs class-prefix="type" :data-source="moneyTypeList" :value.sync="type"></Tabs>
    <div class="notes">
      <FormItem field-name="备注"
                @update:value="onUpdateNotes"
                placeholder="点击输入备注"
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
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';
  import moneyTypeList from '@/constants/moneyTypeList';
  import Tabs from '@/components/Tabs.vue';
  //Ts和js配合只能用require
  // const model = require ('@/model.js').default;
  // require不识别default，得自己在后面加一个Default
  //const {model} = require ('@/model.js') 也可以用析构
  //export {model} 也可以这么导出



  @Component({
    components:{Tabs, Button, Tags,FormItem,NumberPad},

  })
  export default class Money extends Vue{

    type='-'
    moneyTypeList=moneyTypeList


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



    onUpdateNotes(value: string){
      this.record.notes=value;
    }
    onUpdateAmount(value: string){
      this.record.amount=parseFloat(value);
    }
    saveRecord(){
     this.$store.commit('createRecord',this.record)
    }
    onUpdateTags(value: string[]){
      this.record.tags = value
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
  .notes{
    padding: 12px 0;
  }
</style>