import { View, FlatList } from 'react-native'
import React, {useContext, useRef, useEffect, useState} from 'react'
import Task from './Task';
import Header from './Header';
import { TaskListContext } from '../providers/TaskProvider';

const TaskList = () => {

    const refFlatList = useRef<FlatList>(null)
    const [flatlistCount, setFlatlistCount] = useState<number | undefined>(undefined)
  
    const { taskList} = useContext(TaskListContext)

    useEffect(() => {
        if(flatlistCount && flatlistCount < taskList.length){
            refFlatList?.current?.scrollToIndex({
                index: 0,
                animated: true,
            })
        }
        setFlatlistCount(taskList.length)
    }, [taskList?.length, flatlistCount])
    

  return (
    <>
        <Header />
        <FlatList 
            ref={refFlatList}
            data={taskList}
            renderItem={({ item, index }) => <Task task={item} index={index} />}
        />
    </>
  )
}

export default TaskList