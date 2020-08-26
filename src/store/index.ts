import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createrId';

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: { //data
    recordList:[]as RecordItem[],
    tagList: []as Tag[],
  },
  mutations:{ //methods
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || `[]`) as RecordItem[];
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },
    createRecord(state,record: RecordItem) {
      const record2 = clone(record);    //直接push record的话，其实是浅拷贝，也就是说，每次push进来的record都是相同地址的那个对象，会出现localStorage里所有对象相同的情况
      record2.createdAt = new Date();                                                          //所以这里用了深拷贝
      state.recordList?.push(record2);
      store.commit('saveRecords')
    },
    createTag(state,name: string){

      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复');
        return '标签名重复';
      }
      const id = createId().toString()
      state.tagList.push({id, name: name});
      // this.saveTags();
      window.alert('添加成功')
      return '添加成功';

    },
  }
})


export default store