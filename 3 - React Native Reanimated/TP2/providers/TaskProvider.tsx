import React, { createContext, useEffect, useState } from 'react'

const INIT_TASK_LIST: TTask[] = [
  {
    id: "1",
    id_user: undefined,
    task: "Task 1",
  },
  {
    id: "2",
    id_user: undefined,
    task: "Task 2",
  },
  {
    id: "3",
    id_user: undefined,
    task: "Task 3",
  },
  {
    id: "4",
    id_user: undefined,
    task: "Task 4",
  },
  {
    id: "5",
    id_user: undefined,
    task: "Task 5",
  },
];

export type TTask = {
  id: string;
  id_user?: string;
  task: string;
}

type TTaskContext = {
  taskList: TTask[];
  addTask: (task: TTask) => void;
  updateTask: (task: TTask) => void;
  deleteTask: (id: string) => void;
}

export const TaskContext = createContext<TTaskContext>({
  taskList: INIT_TASK_LIST,
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
});

const TaskProvider = ({ children }: { children: React.ReactNode }) => {

    const [taskList, setTaskList] = useState<TTask[]>(INIT_TASK_LIST);

    useEffect(() => {
    }, [taskList])
    

    const addTask = (task: TTask) => {
        setTaskList([...taskList, task]);
    }

    const updateTask = (task: Partial<TTask>) => {
      const previousTask: TTask | undefined = taskList.find(t => {
        return t.id === task.id
      });
      if(!previousTask) {
        return;
      }
      const newTask = {
        ...previousTask,
        ...task,
      } as TTask

      setTaskList(taskList.map(t => t.id === task.id ? newTask : t));
    }
    
    const deleteTask = (id: string) => {
      setTaskList(taskList.filter(t => t.id !== id));
    }

  return (
    <TaskContext.Provider value={{ taskList, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskProvider