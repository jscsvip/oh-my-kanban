import { createSlice, configureStore } from "@reduxjs/toolkit";

const cardListSlice = createSlice({
  name: "cardList",
  initialState: [],
  reducers: {
    addCard(state, action) {
      state.unshift(action.payload.newCard);
    },
    removeCard(state, action) {
      const index = state.findIndex(
        (card) => card.title === action.payload.title
      );
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});
export const { addCard, removeCard } = cardListSlice.actions;

const store = configureStore({
  reducer: cardListSlice.reducer,
});
store.subscribe(() => console.log(store.getState()));

store.dispatch(addCard({ newCard: { title: "开发任务-1" } }));
// [{ title: '开发任务-1' }]
store.dispatch(addCard({ newCard: { title: "测试任务-2" } }));
// [{ title: '测试任务-2' }, { title: '开发任务-1' }]
store.dispatch(removeCard({ title: "开发任务-1" }));
// [{ title: '测试任务-2' }]
