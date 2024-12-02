/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { KanbanColumnStyles } from './App';

export default function KanbanColumn({ children, bgColor, title, setIsDragSource = () => { }, setIsDragTarget = () => { }, onDrop }) {
  return (
    <section css={css`
    ${KanbanColumnStyles}
    background-color: ${bgColor};
    `}
      onDragStart={(e) => { setIsDragSource(true); } }
      onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; setIsDragTarget(true); } }
      onDragLeave={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'none'; setIsDragTarget(false); } }
      onDrop={(e) => { e.preventDefault(); onDrop && onDrop(e); } }
      onDragEnd={(e) => { e.preventDefault(); setIsDragSource(false); setIsDragTarget(false); } }

    >
      <h2>{title}</h2>
      <ul>
        {children}
      </ul>
    </section>
  );
}
