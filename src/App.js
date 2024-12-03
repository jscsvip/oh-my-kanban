/** @jsxImportSource @emotion/react */
import logo from "./logo.svg";
import "./App.css";
import React, { Children, useEffect, useState } from "react";
import AdminContext from "./context/AdminContext";
import { css } from "@emotion/react";
import KanbanBoard, {
  COLUMN_KEY_DONE,
  COLUMN_KEY_ONGOING,
  COLUMN_KEY_TODO,
} from "./KanbanBoard";
const DATA_STORE_KEY = "kanban-data-store";

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
  const [loading, setLoading] = useState(true);
  const updaters = {
    [COLUMN_KEY_TODO]: setTodoList,
    [COLUMN_KEY_ONGOING]: setOngoingList,
    [COLUMN_KEY_DONE]: setDoneList,
  };
  const handleAdd = (column, newCard) => {
    updaters[column]((currentStat) => [newCard, ...currentStat]);
  };
  const handleRemove = (column, cardToRemove) => {
    updaters[column]((currentStat) =>
      // currentStat.filter((item) => !Object.is(item, cardToRemove))
    currentStat.filter((item) => item.title !== cardToRemove.title)
    );
  };
  const handleSaveAll = () => {
    console.log("保存所有卡片");
    const data = JSON.stringify({ todoList, ongoingList, doneList });
    localStorage.setItem(DATA_STORE_KEY, data);
    alert("保存成功");
  };
  const [isAdmin, setIsAdmin] = useState(false);
  const handleToggleAdmin = (evt) => {
    setIsAdmin(!isAdmin);
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
          <label style={{ fontSize: "16px" }}>
            {" "}
            <input
              type="checkbox"
              value={isAdmin}
              onChange={handleToggleAdmin}
            />{" "}
            管理员模式{" "}
          </label>
        </h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <AdminContext.Provider value={isAdmin}>
        <KanbanBoard
          loading={loading}
          todoList={todoList}
          ongoingList={ongoingList}
          doneList={doneList}
          onAdd={handleAdd}
          onRemove={handleRemove}
        ></KanbanBoard>
      </AdminContext.Provider>
    </div>
  );
}

export default App;
