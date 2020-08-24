import tagListModel from '@/models/tagListModel';

export default {
  //tag store

  tagList: tagListModel.fetch(),
  findTag: function(id: string){
    return this.tagList.filter(t => t.id === id)[0];
  },
  createTag: (name: string) => {
    if (name) {
      const message = tagListModel.create(name);
      window.alert(message);
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  }
}