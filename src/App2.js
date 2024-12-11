import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCard, removeCard } from './store';

export default function App() {
  const cardList = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => {
        const payload = { newCard: { title: '开发任务-1' } };
        dispatch(addCard(payload));
      }}>添加</button>
      <ul>
        {
          cardList.map(card => (
            <li key={card.title}>
              {card.title}
              <button onClick={() => {
                dispatch(removeCard({ title: '开发任务-1' }));
              }}>删除</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}