/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
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
  children,
  bgColor,
  title,
  setIsDragSource = () => {},
  setIsDragTarget = () => {},
  onDrop,
}) {
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
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
}
