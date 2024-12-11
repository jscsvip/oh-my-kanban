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


 

export default cardListSlice.reducer;
