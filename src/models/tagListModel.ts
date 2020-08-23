import createId from '@/lib/createrId';

const localStorageKeyName = 'tagList';
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => '标签名重复' | '新建成功'; // ts会提示接受信息者字符串内容(联合类型)
  update: (id: string, name: string) => 'success' | 'notFound' | 'duplicated';
  remove: (id: string) => true;
  save: () => void;
};

const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || `[]`);
    return this.data;
  },
  create(name: string) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      return '标签名重复';
    }
    const id = createId().toString()
    this.data.push({id, name: name});
    this.save();
    return '新建成功';
  },
  update(id, name) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const nameList = this.data.map(item => item.name);
      if (nameList.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {
      return 'notFound';
    }
  },
  remove(id: string){
    let index = -1
    for(let i=0;i<=this.data.length;i++){
      if(this.data[i].id===id){
        index=i
        break
      }
    }
    this.data.splice(index,1)
    this.save()
    return true
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export default tagListModel;