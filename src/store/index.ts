import Vue from 'vue'
import Vuex from 'vuex'
import clone from '../lib/clone';
import createId from '../lib/idCreator';
import router from '../router/index';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {   //data
    recordList: [],
    tagList: [],
    createRecordError: null,
    createTagError: null,
    currentTag: undefined,
    isCreateTagVisible:false
  } as RootState,
  mutations: {  //methods
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣')
        store.commit('createTag', '食')
        store.commit('createTag', '住')
        store.commit('createTag', '行')
      }
    },
    setCreateTagVisible(state,status){
      state.isCreateTagVisible = status
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
   
    updateTag(state,name){
      if(state.currentTag){
        state.currentTag.name = name
      }
    },
    removeTag(state, id: string) {
      if(state.currentTag){
        let index = -1
        for (let i = 0; i < state.tagList.length; i++) {
          if (state.tagList[i].id === state.currentTag.id) {
            index = i
            break
          }
        }
        if (index >= 0) {
          state.tagList.splice(index, 1)
          store.commit('saveTags')
          router.back()
        } else {
          window.alert('删除失败')
        }
      }
    },
   
    createTag(state, name: string) {
      state.createTagError = null
      const names = state.tagList.map(item => item.name)
      if (names.indexOf(name) >= 0) {
        // window.alert('标签名重复了')
        state.createTagError = new Error('tag name duplicated')
        return
      }
      const id = createId().toString()
      state.tagList.push({ id, name: name })
      store.commit('saveTags')
    },
    saveTag(state) {
      if(state.currentTag){
        const { id, name } = state.currentTag
        const idList = state.tagList.map(item => item.id)
        if (idList.indexOf(id) >= 0) {
           if(state.tagList.filter(item => item.name === name).length>1){
            window.alert('标签名重复')
           }else{
            const tag = state.tagList.filter(item => item.id === id)[0]
            tag.name = name
            store.commit('saveTags')
            router.back()
           }
        }
      }    
    },
    saveTags(state){
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
   

    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];

    },
    createRecord(state, record:RecordItem) {
      const record2: RecordItem = clone(record)
      record2.createdAt = record2.createdAt || new Date().toISOString()
      state.recordList.push(record2) // this.recordList?.push(record2) 
      store.commit('saveRecords')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },



  },

})
export default store
