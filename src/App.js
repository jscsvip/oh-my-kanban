/** @jsxImportSource @emotion/react */
import logo from "./logo.svg";
import "./App.css";
import React, { Children, useEffect, useState } from "react";
import { css } from "@emotion/react";
import KanbanBoard from "./KanbanBoard";
import KanbanColumn from "./KanbanColumn";
const DATA_STORE_KEY = "kanban-data-store";
const COLUMN_KEY_TODO = "todo";
const COLUMN_KEY_ONGOING = "ongoing";
const COLUMN_KEY_DONE = "done";

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

function App() {
  const [todoList, setTodoList] = useState([
    {
      title: "开发任务-1",
      status: "2024-12-1 18:15",
    },
    {
      title: "开发任务-2",
      status: "2022-05-22 18:15",
    },
    {
      title: "开发任务-3",
      status: "2022-05-22 18:15",
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [ongoingList, setOngoingList] = useState([
    {
      title: "开发任务1",
      status: "2022-05-22 18:15",
    },
    {
      title: "开发任务2",
      status: "2022-05-22 18:15",
    },
  ]);
  const [doneList, setDoneList] = useState([
    {
      title: "开发任务1",
      status: "2022-05-22 18:15",
    },
    {
      title: "开发任务2",
      status: "2022-05-22 18:15",
    },
    {
      title: "开发任务3",
      status: "2022-05-22 18:15",
    },
  ]);

  const handleSubmit = (title) => {
    setTodoList((currentTodoList) => [
      { title, status: new Date().toLocaleString() },
      ...currentTodoList,
    ]);
    // todoList.unshift({title,status: new Date().toDateString()})
  };
  const handleSaveAll = () => {
    console.log("保存所有卡片");
    const data = JSON.stringify({ todoList, ongoingList, doneList });
    localStorage.setItem(DATA_STORE_KEY, data);
    alert("保存成功");
  };
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [dragTarget, setDragTarget] = useState(null);
  const handleDrop = (e) => {
    if (
      !draggedItem ||
      !dragSource ||
      !dragTarget ||
      dragSource === dragTarget
    ) {
      return;
    }
    const updaters = {
      [COLUMN_KEY_TODO]: setTodoList,
      [COLUMN_KEY_ONGOING]: setOngoingList,
      [COLUMN_KEY_DONE]: setDoneList,
    };
    if (dragSource) {
      updaters[dragSource]((currentList) =>
        currentList.filter((item) => item.title !== draggedItem.title)
      );
    }
    if (dragTarget) {
      updaters[dragTarget]((currentList) => [draggedItem, ...currentList]);
    }
  };
  // 初次加载
  useEffect(() => {
    const data = localStorage.getItem(DATA_STORE_KEY);
    // 模拟异步加载数据
    setTimeout(() => {
      if (data) {
        const { todoList, ongoingList, doneList } = JSON.parse(data);
        setTodoList(todoList);
        setOngoingList(ongoingList);
        setDoneList(doneList);
      }
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ display: "flex", alignItems: "center" }}>
          我的看板
          <button
            onClick={handleSaveAll}
            css={css`
              ${buttonStyles}
              margin-left: 10px;
            `}
          >
            保存所有卡片
          </button>
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <KanbanBoard>
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
              onAdd={handleSubmit}
              canAddNew={true}
            >
              {/* {showAdd && <KanbanNewCard onSubmit={handleSubmit} />} */}
            </KanbanColumn>
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
      </KanbanBoard>
    </div>
  );
}

export default App;
