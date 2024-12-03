/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";
import KanbanColumn from "./KanbanColumn";
export const COLUMN_KEY_TODO = "todo";
export const COLUMN_KEY_ONGOING = "ongoing";
export const COLUMN_KEY_DONE = "done";
const newLocal = css`
  flex: 10;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 0 1rem 1rem;
`;
const COLUMN_BG_COLORS = {
  loading: "#e3e3e3",
  todo: "#c9af",
  ongoing: "#ffe799",
  done: "#a9d0c7",
};

export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const UPDATE_INTERVAL = MINUTE;
export default function KanbanBoard({
  loading = true,
  doneList = [],
  todoList = [],
  ongoingList = [],
  onAdd,
  onRemove,
}) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);

  // const handleAdd = (newCard) => {
  //   // setTodoList((currentTodoList) => [newCard, ...currentTodoList]);
  //   onAdd && onAdd(newCard);
  // };
  const handleDrop = (e) => {
    if (
      !draggedItem ||
      !dragSource ||
      !dragTarget ||
      dragSource === dragTarget
    ) {
      return;
    }
    // const updaters = {
    //   [COLUMN_KEY_TODO]: setTodoList,
    //   [COLUMN_KEY_ONGOING]: setOngoingList,
    //   [COLUMN_KEY_DONE]: setDoneList,
    // };
    if (dragSource) {
      // updaters[dragSource]((currentList) =>
      //   currentList.filter((item) => item.title !== draggedItem.title)
      // );
      // 删除操作
      onRemove && onRemove(dragSource, draggedItem);
    }
    if (dragTarget) {
      // updaters[dragTarget]((currentList) => [draggedItem, ...currentList]);
      // 新增操作
      onAdd && onAdd(dragTarget, draggedItem);
    }
  };
  return (
    <main css={newLocal}>
      {loading ? (
        <KanbanColumn
          bgColor={COLUMN_BG_COLORS.loading}
          title="加载中..."
        ></KanbanColumn>
      ) : (
        <>
          <KanbanColumn
            bgColor={COLUMN_BG_COLORS.todo}
            title="待处理"
            setDraggedItem={setDraggedItem}
            setIsDragSource={(isDragSource) =>
              setDragSource(isDragSource ? COLUMN_KEY_TODO : null)
            }
            setIsDragTarget={(isDragSource) =>
              setDragTarget(isDragSource ? COLUMN_KEY_TODO : null)
            }
            onDrop={handleDrop}
            cardList={todoList}
            onAdd={onAdd.bind(null, COLUMN_KEY_TODO)}
            canAddNew={true}
          ></KanbanColumn>
          <KanbanColumn
            bgColor={COLUMN_BG_COLORS.ongoing}
            title="进行中"
            setDraggedItem={setDraggedItem}
            setIsDragSource={(isDragSource) =>
              setDragSource(isDragSource ? COLUMN_KEY_ONGOING : null)
            }
            setIsDragTarget={(isDragSource) =>
              setDragTarget(isDragSource ? COLUMN_KEY_ONGOING : null)
            }
            onDrop={handleDrop}
            cardList={ongoingList}
          ></KanbanColumn>
          <KanbanColumn
            bgColor={COLUMN_BG_COLORS.done}
            title="已完成"
            setDraggedItem={setDraggedItem}
            setIsDragSource={(isDragSource) =>
              setDragSource(isDragSource ? COLUMN_KEY_DONE : null)
            }
            setIsDragTarget={(isDragSource) =>
              setDragTarget(isDragSource ? COLUMN_KEY_DONE : null)
            }
            onDrop={handleDrop}
            cardList={doneList}
          ></KanbanColumn>
        </>
      )}
    </main>
  );
}
