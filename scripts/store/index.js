let storeItemId = 1
const store = []

const insertIntoStore = (caption) =>{
    const todoItem = {
        id : storeItemId ++,
        caption:caption,
        isCompleted:false
    }

    store.push(todoItem)
    // console.log(store)
    return todoItem
}


const getStoreData =(id) =>{
    if(id){
        console.log(store[id-1])
        return store[id-1]
    }else{
        return store
    }
}
module.exports ={
    insertIntoStore :insertIntoStore,
    getStoreData: getStoreData
}