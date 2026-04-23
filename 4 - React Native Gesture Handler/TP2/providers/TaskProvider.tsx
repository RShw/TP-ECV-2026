import React, { createContext, useEffect, useState } from 'react'

const INIT_TASK_LIST: TTask[] = [
  {
    id: "1",
    id_user: "2",
    task: "Task 1",
  },
  {
    id: "2",
    id_user: "1",
    task: "Task 2",
  },
  {
    id: "3",
    id_user: "1",
    task: "Task 3",
  },
  {
    id: "4",
    id_user: "2",
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
      console.log("taskList", taskList)
    }, [taskList])
    

    const addTask = (task: TTask) => {
        console.log("addTask provider", task)
        setTaskList([...taskList, task]);
    }

    const updateTask = (task: Partial<TTask>) => {
      console.log("task", task)
      const previousTask: TTask | undefined = taskList.find(t => {
        console.log("t", t)
        return t.id === task.id
      });
      console.log("previousTask", previousTask)
      if(!previousTask) {
        return;
      }
      console.log("previousTask", previousTask)
      const newTask = {
        ...previousTask,
        ...task,
      } as TTask

      console.log("newTask", newTask)
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