/** @jsxImportSource @emotion/react */
import logo from './logo.svg';
import './App.css';
import React,{Children, useEffect, useState} from 'react';
import {css} from '@emotion/react';
import KanbanBoard from './KanbanBoard';
import KanbanCard from './KanbanCard';
import KanbanNewCard from './KanbanNewCard';
import KanbanColumn from './KanbanColumn';
const DATA_STORE_KEY = 'kanban-data-store'
const COLUMN_KEY_TODO = 'todo'
const COLUMN_KEY_ONGOING = 'ongoing'
const COLUMN_KEY_DONE = 'done'



const buttonStyles = css `
  float: right;
  margin-top: .2rem;
  padding: .2rem .5rem;
  border: 0;
  border-radius: 1rem;
  height: 1.8rem;
  line-height: 1rem;
  font-size: 1rem;
`


const COLUMN_BG_COLORS = {
  loading: '#e3e3e3',
  todo: '#c9af',
  ongoing: '#ffe799',
  done: '#a9d0c7'
}
export const MINUTE = 60 * 1000
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const UPDATE_INTERVAL = MINUTE

function App() {
  const [todoList, setTodoList] = useState([
    
      {
        title: '开发任务-1',
        status: '2024-12-1 18:15'
      },
      {
        title: '开发任务-2',
        status: '2022-05-22 18:15'
      },
      {
        title: '开发任务-3',
        status: '2022-05-22 18:15'
      }
    
  ])
  const [loading, setLoading] = useState(true)
  const [ongoingList,setOngoingList] = useState([
    {
      title: '开发任务1',
      status: '2022-05-22 18:15'
    },
    {
      title: '开发任务2',
      status: '2022-05-22 18:15'
    }
  ])
  const [doneList,setDoneList] = useState([
    {
      title: '开发任务1',
      status: '2022-05-22 18:15'
    },
    {
      title: '开发任务2',
      status: '2022-05-22 18:15'
    },
    {
      title: '开发任务3',
      status: '2022-05-22 18:15'
    }
  ])

  const [showAdd, setShowAdd] = useState(false)
  const handleAdd = () => {
    setShowAdd(true)
  }
  const handleSubmit = (title) => {
    console.log(new Date().toLocaleString())
    setTodoList(currentTodoList=>[{title,status: new Date().toLocaleString() },...currentTodoList])
    // todoList.unshift({title,status: new Date().toDateString()})
    setShowAdd(false)
  }
  const handleSaveAll = () => {
    console.log('保存所有卡片')
    const data = JSON.stringify({todoList,ongoingList,doneList})
    localStorage.setItem(DATA_STORE_KEY,data)
    alert('保存成功')
  }
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragSource, setDragSource] = useState(null)
  const [dragTarget, setDragTarget] = useState(null)
  const handleDrop = (e) => {
    if(!draggedItem||!dragSource||!dragTarget||dragSource===dragTarget){
      return;
    }
    const updaters = {
      [COLUMN_KEY_TODO]:setTodoList,
      [COLUMN_KEY_ONGOING]:setOngoingList,
      [COLUMN_KEY_DONE]:setDoneList
    }
    if(dragSource){
      updaters[dragSource](currentList=>currentList.filter(item=>item.title!==draggedItem.title))
    }
    if(dragTarget){
      updaters[dragTarget](currentList=>[draggedItem,...currentList])
    }
  }
  // 初次加载
  useEffect(() => {
    const data = localStorage.getItem(DATA_STORE_KEY)
// 模拟异步加载数据
    setTimeout(() => {
      if(data){
        const {todoList,ongoingList,doneList} = JSON.parse(data)
        setTodoList(todoList)
        setOngoingList(ongoingList)
        setDoneList(doneList)
      }
      setLoading(false)
    }, 1000);
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{display:'flex',alignItems:'center'}}>我的看板<button onClick={handleSaveAll} css={css`
        ${buttonStyles}
        margin-left: 10px;
        `}>保存所有卡片</button></h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <KanbanBoard>
         {loading?(<KanbanColumn bgColor={COLUMN_BG_COLORS.loading} title='加载中...'></KanbanColumn>):(<><KanbanColumn bgColor={COLUMN_BG_COLORS.todo} title={
          <>
         待处理<button onClick={handleAdd}
        disabled={showAdd}>&#8853; 添加新卡片</button>
        </>
      } 
      setIsDragSource={(isDragSource) =>setDragSource(isDragSource?COLUMN_KEY_TODO:null)}
      setIsDragTarget={(isDragSource) =>setDragTarget(isDragSource?COLUMN_KEY_TODO:null)}
      onDrop={handleDrop}
      >
           
            {
              showAdd && <KanbanNewCard onSubmit={handleSubmit}/>
            }
            {/* {
              new Array(5).fill(0).map((item, index) => {
                return <li className='kanban-card'>
                <div className='card-title'>开发任务</div>
                <div className='card-status'>2022-05-22 18:15</div>
              </li>
              })
            } */}
             {/* {todoList.map((item, index) => {
              return <KanbanCard title={item.title} status={item.status} />
             })} */}
             {todoList.map((item, index) => {
              return <KanbanCard key={item.title} {...item} onDragStart={()=>setDraggedItem(item)} />
             })}
         </KanbanColumn>
         <KanbanColumn bgColor={COLUMN_BG_COLORS.ongoing} title='进行中'
        setIsDragSource={(isDragSource) =>setDragSource(isDragSource?COLUMN_KEY_ONGOING:null)}
        setIsDragTarget={(isDragSource) =>setDragTarget(isDragSource?COLUMN_KEY_ONGOING:null)}
        onDrop={handleDrop}

      >
            {ongoingList.map((item, index) => {
              return <KanbanCard  key={item.title}  {...item}  onDragStart={()=>setDraggedItem(item)}/>
             })}
         </KanbanColumn>
         <KanbanColumn bgColor={COLUMN_BG_COLORS.done} title='已完成'
        setIsDragSource={(isDragSource) =>setDragSource(isDragSource?COLUMN_KEY_DONE:null)}
        setIsDragTarget={(isDragSource) =>setDragTarget(isDragSource?COLUMN_KEY_DONE:null)}
        onDrop={handleDrop}
         >
            {doneList.map((item, index) => {
              return <KanbanCard  key={item.title}  {...item}  onDragStart={()=>setDraggedItem(item)}/>
             })}
         </KanbanColumn>
         </>)}
      </KanbanBoard>
    </div>
  );
}

export default App;
