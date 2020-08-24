type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date; //TS的数据类型也可以写类
}               //复杂对象类型声明

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
}
interface Window {
  tagList: Tag[];
  createTag: (name: string) => void;
}