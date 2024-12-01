/** @jsxImportSource @emotion/react */
import logo from './logo.svg';
import './App.css';
import React,{Children, useState} from 'react';
import {css} from '@emotion/react';
const kanbanCardStyles = css`
  margin-bottom: 1rem;;
  padding: .6rem 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.4);
  text-align: left;
`
const KanbanColumnStyles = css`
  flex: 1 1;
  display: flex;
  border: 1px solid gray;
  border-radius: 1rem;
  flex-direction: column;
  & > h2{
      margin: 0.6rem 1rem;
      padding-bottom: .6rem;
      border-bottom: 1px solid gray;
    }
  &> h2 > button {
    float: right;
    margin-top: .2rem;
    padding: .2rem .5rem;
    border: 0;
    border-radius: 1rem;
    height: 1.8rem;
    line-height: 1rem;
    font-size: 1rem;
  }
  &> ul{
    flex: 1;
    flex-basis: 0;
    margin: 1rem;
    padding: 0;
    overflow: auto;
  }
`
// 看板组件
const KanbanCard = ({title,status}) => {
  return (
    <li css={css`
      ${kanbanCardStyles}
     &:hover {
      box-shadow: 0 0.2rem 0.2rem rgba(0,0,0,0.2),inset 0 1px #fff;
    }
    `}>
      <div className='card-title'>{title}</div>
      <div className='card-status'>{status}</div>
    </li>
  )
}
// 看板添加状态
const KanbanNewCard = ({onSubmit}) => {
  const [title, setTitle] = useState('')
  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      onSubmit(title)
      console.log(title)
    }
  }
  return (
    <li css={css`
      ${kanbanCardStyles} 
    `}>
      <h3>添加新卡片</h3>
      <div className='card-title'>
        <input type="text" value={title} onChange={handleTitleChange} onKeyDown={handleKeyDown} n/>
      </div>
    </li>
  )
}
const KanbanBoard = ({children}) => {
  return (
    <main css={css`
      flex: 10;
      display: flex;
      flex-direction: row;
      gap: 1rem;
      margin: 0 1rem 1rem;
      `
    }>
      {children}
    </main>
  )
}

const KanbanColumn = ({children,className,title}) => {
  const combinedClassName = `${className}`
  return (
    <section className={combinedClassName} css={css`
    ${KanbanColumnStyles}
    
    `}>
      <h2>{title}</h2>
      <ul> 
        {children}      
      </ul>
    </section>
  )
}
function App() {
  const [todoList, setTodoList] = useState([
    
      {
        title: '开发任务-1',
        status: '22-05-22 18:15'
      },
      {
        title: '开发任务-2',
        status: '22-05-22 18:15'
      },
      {
        title: '开发任务-3',
        status: '22-05-22 18:15'
      }
    
  ])
  const [ongoingList,setOngoingList] = useState([
    {
      title: '开发任务1',
      status: '22-05-22 18:15'
    },
    {
      title: '开发任务2',
      status: '22-05-22 18:15'
    }
  ])
  const [doneList,setDoneList] = useState([
    {
      title: '开发任务1',
      status: '22-05-22 18:15'
    },
    {
      title: '开发任务2',
      status: '22-05-22 18:15'
    },
    {
      title: '开发任务3',
      status: '22-05-22 18:15'
    }
  ])

  const [showAdd, setShowAdd] = useState(false)
  const handleAdd = () => {
    setShowAdd(true)
  }
  const handleSubmit = (title) => {
    setTodoList(currentTodoList=>[{title,status: new Date().toDateString()},...currentTodoList])
    // todoList.unshift({title,status: new Date().toDateString()})
    setShowAdd(false)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <KanbanBoard>
         <KanbanColumn className='column-todo' title={
          <>
         待处理<button onClick={handleAdd}
        disabled={showAdd}>&#8853; 添加新卡片</button>
        </>
      } >
           
            {
              showAdd && <KanbanNewCard onSubmit={handleSubmit}/>
            }
            {/* {
              new Array(5).fill(0).map((item, index) => {
                return <li className='kanban-card'>
                <div className='card-title'>开发任务</div>
                <div className='card-status'>22-05-22 18:15</div>
              </li>
              })
            } */}
             {/* {todoList.map((item, index) => {
              return <KanbanCard title={item.title} status={item.status} />
             })} */}
             {todoList.map((item, index) => {
              return <KanbanCard key={item.title} {...item} />
             })}
         </KanbanColumn>
         <KanbanColumn className='column-ongoing' title='进行中'>
            {ongoingList.map((item, index) => {
              return <KanbanCard  key={item.title}  {...item} />
             })}
         </KanbanColumn>
         <KanbanColumn className='column-done' title='已完成'>
            {doneList.map((item, index) => {
              return <KanbanCard  key={item.title}  {...item} />
             })}
         </KanbanColumn>
      </KanbanBoard>
    </div>
  );
}

export default App;
