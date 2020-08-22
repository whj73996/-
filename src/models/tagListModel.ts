const localStorageKeyName = 'tagList'
type Tag={
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => '标签名重复'|'新建成功'; // ts会提示接受信息者字符串内容(联合类型)
  save: () => void;
}

const tagListModel: TagListModel={
  data:[],
  fetch(){
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName)||`[]`)
    return this.data
  },
  create(name: string){
    const names = this.data.map(item => item.name)
    if(names.indexOf(name)>=0){
      return '标签名重复'
    }
    this.data.push({id:name,name:name});
    this.save();
    return '新建成功'
  },
  save(){
    window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data));
  }
}
export default tagListModel