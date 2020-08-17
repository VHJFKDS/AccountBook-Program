type RecordItem = {   //类型声明 (记录类型)
    tags:string[]
    notes:string
    type:string
    amount:number  //数据类型 object|string
    createdAt?:Date  //类/构造函数
}

type Tag = {
    id:string
    name:string
  }

type TagListModel = {
      data:Tag[],
      fetch:() =>Tag[]
      create:(name:string)=> 'success' | 'duplicated'  //联合类型 success 表示成功，duplicated 表示类名重复
      update:(id:string,name:string) => 'success' | 'not found' |'duplicated'
      remove:(id:string) => boolean
      save:()=>void
  }

interface Window{
  // store:{
  //   tagList:Tag[]
  //   createTag:(name:string)=>void //空
  //   findTag:(id:string)=>Tag | undefined
  //   removeTag:(id:string) =>boolean
  //   updateTag:TagListModel['update']  //这两相同
  //   recordList:RecordItem[]
  //   createRecord:(record:RecordItem)=>void
  // }
 
}