import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';



// 看板组件
const KanbanCard = ({title,status}) => {
  return (
    <li className='kanban-card'>
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
    <li className='kanban-card'>
      <h3>添加新卡片</h3>
      <div className='card-title'>
        <input type="text" value={title} onChange={handleTitleChange} onKeyDown={handleKeyDown} n/>
      </div>
    </li>
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
      title: '开发任务',
      status: '22-05-22 18:15'
    },
    {
      title: '开发任务',
      status: '22-05-22 18:15'
    }
  ])
  const [doneList,setDoneList] = useState([
    {
      title: '开发任务',
      status: '22-05-22 18:15'
    },
    {
      title: '开发任务',
      status: '22-05-22 18:15'
    },
    {
      title: '开发任务',
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
    // setShowAdd(false)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className='kanban-board'>
          <section className='kanban-column column-todo'>
            <h2>待处理 <button onClick={handleAdd} disabled={showAdd}>添加新卡片</button></h2>
            <ul>
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
            </ul>
          </section>
          <section className='kanban-column column-ongoing'>
            <h2>进行中</h2>
            <ul>
            {ongoingList.map((item, index) => {
              return <KanbanCard {...item} />
             })}
            </ul>
          </section>
          <section className='kanban-column column-done'>
            <h2>已完成</h2>
            <ul>
            {doneList.map((item, index) => {
              return <KanbanCard {...item} />
             })}
            </ul>
          </section>
        </main>
    </div>
  );
}

export default App;
