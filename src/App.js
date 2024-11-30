import logo from './logo.svg';
import './App.css';

const todoList = [
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
  },
  {
    title: '开发任务',
    status: '22-05-22 18:15'
  }
]
const ongoingList = [
  {
    title: '开发任务',
    status: '22-05-22 18:15'
  },
  {
    title: '开发任务',
    status: '22-05-22 18:15'
  }
]
const doneList = [
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
]

const KanbanCard = ({title,status}) => {
  return (
    <li className='kanban-card'>
      <div className='card-title'>{title}</div>
      <div className='card-status'>{status}</div>
    </li>
  )
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className='kanban-board'>
          <section className='kanban-column column-todo'>
            <h2>待处理</h2>
            <ul>
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
              return <KanbanCard {...item} />
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
