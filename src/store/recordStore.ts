import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';


const recordStore = {
  //record store人
  recordList:[]as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || `[]`) as RecordItem[];
    return this.recordList;
  },
  saveRecords() {
    window.localStorage.setItem(localStorageKeyName,
      JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem) {
    const record2 = clone(record);    //直接push record的话，其实是浅拷贝，也就是说，每次push进来的record都是相同地址的那个对象，会出现localStorage里所有对象相同的情况
    record2.createdAt = new Date().toISOString();                                                          //所以这里用了深拷贝
    this.recordList?.push(record2);
    recordStore.saveRecords();
  },
};
recordStore.fetchRecords()

export default recordStore