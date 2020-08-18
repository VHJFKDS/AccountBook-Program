import Vue from 'vue'
import Vuex from 'vuex'
import clone from '../lib/clone';

Vue.use(Vuex)
const localStorageKeyName = 'recordList'


const store = new Vuex.Store({
  state: {   //data
    recordList:[] as RecordItem[]
  },
  mutations:{  //methods
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
      
  },
    createRecord(state,record){
      const record2: RecordItem = clone(record)
      record2.createdAt = new Date()
      this.recordList && state.recordList.push(record2) // this.recordList?.push(record2) 
      store.commit('saveRecords')
      // recordStore.saveRecords()
    },
  saveRecords(state) {
    window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
  },
  },
  

})
export default store
