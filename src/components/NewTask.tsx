import styles from './NewTask.module.css'

import { PlusCircle, CheckCircle, Trash } from 'phosphor-react'

import Clipboard from '../assets/clipboard.svg'
import { ChangeEvent, useState } from 'react'

type Task = {
  id: number
  title: string
  completed: boolean
}

export function NewTask() {
  const [newTask, setNewTask] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])

  const handleCreateNewTask = () => {
    event?.preventDefault()

    if (newTask.trim() === '') {
      return
    }

    const newTaskData = {
      id: Math.random(),
      title: newTask,
      completed: false,
    }

    setTasks([...tasks, newTaskData]) 
    setNewTask('')
  }

  const handleChangeTaskStatus = (id: number) => {
    const updatedTasks = tasks.map(task => task.id === id ? {
      ...task,
      completed: !task.completed
    } : task)

    setTasks(updatedTasks)
  }

  const handleRemoveTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id)

    setTasks(updatedTasks)
  }

  const handleInputChange = (event: any) => {
    const { value } = event.target

    setNewTask(value)
  }

  const getCompletedTasks = () => {
    return tasks.filter(task => task.completed).length
  }

  return (
    <div className={styles.newTaskContainer}>
      <form onSubmit={handleCreateNewTask} className={styles.inputWrapper}>
        <input type="text" required placeholder="Adicione uma nova tarefa" value={newTask} onChange={handleInputChange}/>
        <button type="submit">
          Criar
          <PlusCircle size={15} color="#FFF"/>
        </button>
      </form>

      <div className={styles.tasksInfo}>
          <strong>
            Tarefas criadas
            <span>{tasks.length}</span>
          </strong>
          <strong>
            Concluídas
            <span>{getCompletedTasks()} de {tasks.length}</span>
          </strong>
      </div>

      <div className={styles.taskList}>
        { tasks.length === 0 ? (
          <div className={styles.tasksEmpty}>
            <img src={Clipboard} alt="clipboard" />
            <strong>
             Você ainda não tem tarefas cadastradas
            </strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        ) : (
          <>
            {
              tasks.map(task => {
                return <div key={task.id} className={task.completed ? styles.completedTask : styles.createdTask}>
                  { task.completed ? (
                    <button onClick={() => handleChangeTaskStatus(task.id)} className={styles.checkButton}>
                      <CheckCircle size={24} color="#5E60CE" weight="fill"/>
                    </button>
                  ) : (
                    <button onClick={() => handleChangeTaskStatus(task.id)} className={styles.taskCreatedCheckButton} />
                  )}
                  
                  <p>{task.title}</p>
                  <button className={styles.trash} onClick={() => handleRemoveTask(task.id)}>
                    <Trash size={24} color="#808080" />
                  </button>
                  
                </div>
              })
            }
          </>         
        )}
      </div>
    </div>
  )
}