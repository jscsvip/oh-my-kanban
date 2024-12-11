import { createSlice, configureStore } from "@reduxjs/toolkit";

const bookListSlice = createSlice(
  {
    name: "bookList",
    initialState: [
      {
        title: "Book 1",
        id: "1",
      },
      {
        title: "Book 2",
        id: "2",
      },
    ],
    reducers: {
      addBook(state, action) {
        state.unshift(action.payload.newBook);
      },
      removeBook(state, action) {
        const index = state.findIndex((book) => book.id === action.payload.id);
        if (index !== -1) {
          state.splice(index, 1);
        }
      },
    },
  },
  {
    name: "favsList",
    initialState: ["1", "3"],
    reducers: {
      addFavs(state, action) {
        state.unshift(action.payload.newFavs);
      },
      removeFavs(state, action) {
        const index = state.findIndex((favs) => favs === action.payload);
        if (index !== -1) {
          state.splice(index, 1);
        }
      },
    },
  }
);
export const { addBook, removeBook } = bookListSlice.actions;
export const { addFavs, removeFavs } = bookListSlice.actions;

const store = configureStore({
  reducer: bookListSlice.reducer,
});

// store.dispatch(addBook({ newBook: { title: "Book 3", id: "3" } }));
// store.dispatch(removeBook({ title: "Book 4", id: "4" } ));
// store.dispatch(addFavs({ newFavs: "2" }));
// store.dispatch(removeFavs({ id: "2" } ));

export default store;
