/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import KanbanCard from "./KanbanCard";
import KanbanNewCard from "./KanbanNewCard";

// import { buttonStyles } from './App';
const buttonStyles = css`
  float: right;
  margin-top: 0.2rem;
  padding: 0.2rem 0.5rem;
  border: 0;
  border-radius: 1rem;
  height: 1.8rem;
  line-height: 1rem;
  font-size: 1rem;
`;
export const KanbanColumnStyles = css`
  flex: 1 1;
  display: flex;
  border: 1px solid gray;
  border-radius: 1rem;
  flex-direction: column;
  & > h2 {
    margin: 0.6rem 1rem;
    padding-bottom: 0.6rem;
    border-bottom: 1px solid gray;
  }
  & > h2 > button {
    ${buttonStyles}
  }
  & > ul {
    flex: 1;
    flex-basis: 0;
    margin: 1rem;
    padding: 0;
    overflow: auto;
  }
`;
export default function KanbanColumn({
  bgColor,
  title,
  setIsDragSource = () => {},
  setIsDragTarget = () => {},
  onDrop,
  cardList = [],
  setDraggedItem,
  canAddNew = false,
  onAdd,
  onRemove,
}) {
  const [showAdd, setShowAdd] = useState(false);
  const handleAdd = () => {
    setShowAdd(true);
  };
  const handleSubmit = (newCard) => {
    // setTodoList((currentTodoList) => [
    //   { title, status: new Date().toLocaleString() },
    //   ...currentTodoList,
    // ]);
    onAdd && onAdd(newCard); // 执行属性传过来的回调函数
    setShowAdd(false);
  };
  return (
    <section
      css={css`
        ${KanbanColumnStyles}
        background-color: ${bgColor};
      `}
      onDragStart={(e) => {
        setIsDragSource(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setIsDragTarget(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "none";
        setIsDragTarget(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop && onDrop(e);
      }}
      onDragEnd={(e) => {
        e.preventDefault();
        setIsDragSource(false);
        setIsDragTarget(false);
      }}
    >
      <h2>
        {title}
        {canAddNew && (
          <button onClick={handleAdd} disabled={showAdd}>
            &#8853; 添加新卡片
          </button>
        )}
      </h2>
      <ul>
        {canAddNew && showAdd && <KanbanNewCard onSubmit={handleSubmit} />}

        {cardList.map((item, index) => {
          return (
            <KanbanCard
              key={item.title}
              {...item}
              onDragStart={() => setDraggedItem(item)}
              onRemove={onRemove}
            />
          );
        })}
      </ul>
    </section>
  );
}
