let storeItemId = 1
const store = []

const insertIntoStore = (caption) =>{
    const todoItem = {
        id : storeItemId ++,
        caption:caption,
        isCompleted:false
    }

    store.push(todoItem)
    return todoItem
}


const getStoreData =(id) =>{
    if(id){
        return store[id-1]
    }else{
        return store
    }
}
module.exports ={
    insertIntoStore :insertIntoStore,
    getStoreData: getStoreData,
}