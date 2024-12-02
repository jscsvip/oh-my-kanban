/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { MINUTE, HOUR, DAY, UPDATE_INTERVAL } from './App';
export const kanbanCardStyles = css`
  margin-bottom: 1rem;;
  padding: .6rem 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.4);
  text-align: left;
`
// 看板组件
export default function KanbanCard({ title, status, onDragStart }) {
  const [displayTime, setDisplayTime] = useState(status);
  useEffect(() => {
    const updateDisplayTime = () => {
      const timePassed = new Date() - new Date(status);
      console.log(timePassed);
      let relativeTime = '刚刚';
      if (MINUTE <= timePassed && timePassed < HOUR) {
        relativeTime = Math.floor(timePassed / MINUTE) + '分钟前';
      } else if (HOUR <= timePassed && timePassed < DAY) {
        relativeTime = Math.floor(timePassed / HOUR) + '小时前';
      } else if (DAY <= timePassed) {
        relativeTime = Math.floor(timePassed / DAY) + '天前';
      }
      setDisplayTime(relativeTime);
    };
    const interval = setInterval(updateDisplayTime, UPDATE_INTERVAL);
    updateDisplayTime();
    return () => {
      clearInterval(interval);
    };
  }, [status]);

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', title);
    onDragStart && onDragStart(e);
  };
  return (
    <li css={css`
      ${kanbanCardStyles}
     &:hover {
      box-shadow: 0 0.2rem 0.2rem rgba(0,0,0,0.2),inset 0 1px #fff;
    }
    `}
      draggable
      onDragStart={handleDragStart}
    >
      <div className='card-title'>{title}</div>
      <div className='card-status'>{displayTime}</div>
    </li>
  );
}
