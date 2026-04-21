import React, {createContext, useState} from 'react'

type TTaskListContext = string[];
type TTaskListContextProvider = {
    taskList: TTaskListContext;
    addTask: (task: string) => void;
    deleteTask: (index: number) => void;
}

export const TaskListContext = createContext<TTaskListContextProvider>({
    taskList: [],
    addTask: () => {},
    deleteTask: () => {},
})

const INIT_TASK_LIST = Array.from({ length: 1000 }, (_, i) => `Task ${i + 1}`);

const TaskProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {

    
    const [taskList, setTaskList] = useState<TTaskListContext>(INIT_TASK_LIST);

    const addTask = (task: string) => {
        setTaskList([task, ...taskList]);
    }

    const deleteTask = (index: number) => {
        setTaskList(taskList.filter((_, i) => i !== index));
    }

  return (
    <TaskListContext.Provider value={{taskList, addTask, deleteTask}}>
        {children}
    </TaskListContext.Provider>
  )
}

export default TaskProvider