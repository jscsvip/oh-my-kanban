/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useRef } from "react";
import { css } from "@emotion/react";
import { kanbanCardStyles } from "./KanbanCard";

// 看板添加状态
export default function KanbanNewCard({ onSubmit }) {
  const [title, setTitle] = useState("");
  const inputElem = useRef(null);
  useEffect(() => {
    inputElem.current.focus();
  }, []);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit(title);
      console.log(title);
    }
  };
  return (
    <li
      css={css`
        ${kanbanCardStyles}
      `}
    >
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onKeyDown={handleKeyDown}
          ref={inputElem}
        />
      </div>
    </li>
  );
}
