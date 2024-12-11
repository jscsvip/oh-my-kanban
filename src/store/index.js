import { configureStore } from "@reduxjs/toolkit";
import cardListSlice from "./features/cardListSlice";
 
const store = configureStore({
  reducer: {
    cardList: cardListSlice
  }
});

store.subscribe(() => console.log(store.getState()));

// store.dispatch(addCard({ newCard: { title: "开发任务-1" } }));
// // [{ title: '开发任务-1' }]
// store.dispatch(addCard({ newCard: { title: "测试任务-2" } }));
// // [{ title: '测试任务-2' }, { title: '开发任务-1' }]
// store.dispatch(removeCard({ title: "开发任务-1" }));
// [{ title: '测试任务-2' }]

export default store;
