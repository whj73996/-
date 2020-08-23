<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注"
                @update:value="onUpdateNotes"
                placeholder="点击输入备注"
      />
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from  "vue"
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import {Component,Watch} from 'vue-property-decorator';
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';
  //Ts和js配合只能用require
  // const model = require ('@/model.js').default;
  // require不识别default，得自己在后面加一个Default
  //const {model} = require ('@/model.js') 也可以用析构
  //export {model} 也可以这么导出

  const recordList = recordListModel.fetch()
  tagListModel.fetch()

  @Component({
    components:{Tags,FormItem, Types, NumberPad}
  })
  export default class Money extends Vue{

    tags=tagListModel.data;

    record: RecordItem={
      tags:[],
      notes:'',
      type:'-',
      amount:0
    }
    recordList = recordList

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
      const record2 = recordListModel.clone(this.record);    //直接push record的话，其实是浅拷贝，也就是说，每次push进来的record都是相同地址的那个对象，会出现localStorage里所有对象相同的情况
      console.log(record2);
      record2.createdAt = new Date()                                                          //所以这里用了深拷贝
      this.recordList.push(record2)
      console.log('push进数据：'+ this.recordList);
    }

    @Watch('recordList')
    onRecordListChange(){
      recordListModel.save()
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