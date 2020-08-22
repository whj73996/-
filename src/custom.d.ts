type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date; //TS的数据类型也可以写类
}               //复杂对象类型声明