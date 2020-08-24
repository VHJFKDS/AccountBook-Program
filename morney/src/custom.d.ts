type RootState = {
  recordList:RecordItem[],
  createRecordError:Error | null,
    createTagError:Error | null,
    tagList:Tag[],
    currentTag?:Tag
}


type RecordItem = {   //类型声明 (记录类型)
    tags:Tag[]
    notes:string
    type:string
    amount:number  //数据类型 object|string
    createdAt?:string  //类/构造函数
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
