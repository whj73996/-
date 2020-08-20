<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from  "vue"
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component,Watch} from 'vue-property-decorator';
  type Record = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
  }               //复杂对象类型声明
  @Component({
    components:{Tags, Notes, Types, NumberPad}
  })
  export default class Money extends Vue{
    tags=['衣','食','住','行','烫头'];
    recordList: Record[]=[]
    record: Record={
      tags:[],
      notes:'',
      type:'-',
      amount:0
    }

    onUpdateTags(value: string[]){
      this.record.tags=value;
    }
    onUpdateNotes(value: string){
      this.record.notes=value;
    }
    onUpdateAmount(value: string){
      this.record.amount=parseFloat(value);
    }
    saveRecord(){
      const record2= JSON.parse(JSON.stringify(this.record))    //直接push record的话，其实是浅拷贝，也就是说，每次push进来的record都是相同地址的那个对象，会出现localStorage里所有对象相同的情况
                                                                //所以这里用了深拷贝
      this.recordList.push(record2)
    }

    @Watch('recordList')
    onRecordListChange(){
      window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>