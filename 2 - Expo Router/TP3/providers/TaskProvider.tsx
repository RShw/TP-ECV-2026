import React, { createContext, useState } from 'react'

const INIT_TASK_LIST = Array.from({ length: 10 }, (_, i) => `Task ${i + 1}`);

type TTaskContext = {
  taskList: string[];
  addTask: (task: string) => void;
  updateTask: (task: string) => void;
  deleteTask: (task: string) => void;
}

export const TaskContext = createContext<TTaskContext>({
  taskList: INIT_TASK_LIST,
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
});

const TaskProvider = ({ children }: { children: React.ReactNode }) => {

    const [taskList, setTaskList] = useState<string[]>(INIT_TASK_LIST);

    const addTask = (task: string) => {
        console.log("addTask provider", task)
        setTaskList([...taskList, task]);
    }

    const updateTask = (task: string) => {
        setTaskList(taskList.map(t => t === task ? task : t));
    }
    
    const deleteTask = (task: string) => {
        setTaskList(taskList.filter(t => t !== task));
    }

  return (
    <TaskContext.Provider value={{ taskList, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider