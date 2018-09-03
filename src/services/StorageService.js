import store from "store";

const getOrder = (key) => {
    return store.get(key)
};

const setOrder = (key, obj) => {
    const newOrder = getOrder(key);

    const newObj = {...newOrder, ...obj};
    return store.set(key, newObj);
};

const removeOrder = (key) => {
    return store.remove(key)
};

export {setOrder, getOrder, removeOrder};