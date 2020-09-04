<template>
    <Layout>
      <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"></Tabs>
        <ol v-if="groupList.length>0">
          <li v-for="(group,index) in groupList" :key="index">
            <h3 class="title">{{beautify(group.title)}}<span>￥{{group.total}}</span></h3>
            <ol>
              <li v-for="item in group.items" class="record">
                <span>{{tagString(item.tags)}}</span>
                <span class="notes">{{item.notes}}</span>
                <span>￥{{item.amount}}</span>
              </li>
            </ol>
          </li>
        </ol>
      <div v-else>
        当前没有数据记录
      </div>
    </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs'
  import clone from '@/lib/clone';
  @Component({
    components: {Tabs,}
  })
  export default class Statistics extends Vue {
    type='-'
    recordTypeList=recordTypeList
    sortedList: RecordItem[]=[]

    mounted(){
      this.$store.commit('fetchRecords')
    }

    beautify(string: string){
      const now = dayjs()
      const day = dayjs(string)
      if(dayjs(string).isSame(now,'day')){
          return '今天'
        }else if(day.isSame(now.subtract(1,'day'),'day')){
          return '昨天'
        }else if(day.isSame(now.subtract(2,'day'),'day')){
        return '前天'
      }else if(day.isSame(now,'year')){
        return day.format('M月DD日')
      }else if (!day.isSame(now,'year')){
        return day.format('YYYY年M月DD日')
      }
    }
    tagString(tags: Tag[]){
      if(tags){
        const name = tags.map(item=>item.name)
        return name.length===0?' ':name.join()
      }
    }

    get recordList(){
      return (this.$store.state as RootState).recordList
    }
    get groupList(){
      const {recordList}=this
      if(recordList.length===0){
        return []
      }
       this.sortedList = clone(recordList)
        .filter(r=>r.type === this.type)
        .sort((a,b)=> dayjs(b.createdAt).valueOf()-dayjs(a.createdAt).valueOf())
      if(this.sortedList.length===0){return []}
      type Result = {title: string;total?: number;items: RecordItem[]}[]
      const result: Result=[{title:dayjs(this.sortedList[0].createdAt).format('YYYY-MM-DD'), items: [this.sortedList[0]]}]
      for(let i= 1;i<this.sortedList.length;i++){
        const current = this.sortedList[i]
        const last = result[result.length-1]
        if(dayjs(current.createdAt).isSame(last.title,'day')){
          last.items.push(current)
        }else {
          result.push({title:dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]})
        }
      }
      result.map(group=>{
        group.total=group.items.reduce((sum,item)=>sum+item.amount,0)
      })
      return result
    }
  }
</script>

<style scoped lang="scss">
  ::v-deep {
    .type-tabs-item {
      background-color:#c4c4c4;
      transition: all 0.3s ease;
      &.selected{
        background-color: white;
        &::after{
          display: none;
        }
      }
    }

  }

  %item{
    padding: 8px 16px;
    line-height: 24px;
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .title{
    @extend %item
  }
  .record{
    @extend %item;
    background-color: white;
  }
  .notes{
    margin-left: 8px;
    margin-right: auto;
    font-size: 12px;
    color:#fcb766 ;
    max-width: 80%;
    overflow: auto;
  }
</style>
