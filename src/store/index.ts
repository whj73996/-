import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone';
import createId from '@/lib/createrId';
import router from '@/router';


Vue.use(Vuex)
type rootState = {
    recordList: RecordItem[];
    tagList: Tag[];
    currentTag?: Tag;
}
const store =  new Vuex.Store({
  state: {
    recordList:[],
    tagList: [],
    currentTag:undefined
  }as rootState,
  mutations:{ //methods
    setCurrentTag(state,id: string){
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
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

    fetchTags(state){
      state.tagList= JSON.parse(window.localStorage.getItem('tagList') || `[]`);
      return this.tagList;
    },
    createTag(state,name: string){
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复');
        return '标签名重复';
      }
      const id = createId().toString()
      state.tagList.push({id, name: name});
      store.commit('saveTags');
      window.alert('添加成功')
      return '添加成功';
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
    updateTag(state, payload: { id: string; name: string }) {
      const {id,name}=payload
      const idList = state.tagList.map(item => item.id)as string[];
      if (idList.indexOf(id) >= 0) {
        const nameList = state.tagList.map(item => item.name) as string[];
        console.log(nameList);
        if (nameList.indexOf(name) >= 0) {
          window.alert('标签名重复了')
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
    removeTag(state,id: string){
      let index = -1
      for(let i=0;i<=state.tagList.length;i++){
        if(state.tagList[i].id===id){
          index=i
          break
        }
      }
      if (index>=0){
        state.tagList.splice(index,1)
        store.commit('saveTags')
        router.back()
      }else {
        window.alert('删除失败')
      }
    },
    findTag(state,id: string){
      return state.tagList.filter(t => t.id === id)[0];
    },
  }
})


export default store