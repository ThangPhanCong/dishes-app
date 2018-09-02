import store from "store";

const getOrder = (key) => {
    return store.get(key)
};

const setOrder = (key, obj) => {
    const newOrder = getOrder(key);
    console.log("get ne:", newOrder)

    const newObj = {...obj, ...newOrder};
    console.log("newObj", newObj)
    return store.set(key, newObj);
}

export {setOrder, getOrder};