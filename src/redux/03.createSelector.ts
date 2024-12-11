import { createSelector } from "@reduxjs/toolkit";

interface RootState {
  books: { id: number; title: string }[]
  user: { favIds: number[]}
}

const state: RootState = {
  books: [
    { id: 0, title: "红楼梦" },
    { id: 1, title: "三国演义" },
  ],
  user: {
    favIds: [0]
  },
};
// ...
const selectBooks = (state:RootState) => state.books;
const selectFavIds = (state:RootState) => state.user.favIds;

export const selectFavBooks = createSelector(
  selectBooks,
  selectFavIds,
  (books, ids) => {
    // 返回用户喜爱的图书信息
    return books.filter((book) => ids.includes(book.id));
  }
);

// 输入自己的state
const favBooks = selectFavBooks(state);
console.log(favBooks);