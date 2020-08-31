type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  createTagError: Error | null;
  currentTag?: Tag;
}

type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: string; //TS的数据类型也可以写类
}               //复杂对象类型声明

type Tag = {
  id: string;
  name: string;
}

interface Window {

}
