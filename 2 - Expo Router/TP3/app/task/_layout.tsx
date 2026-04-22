import React from 'react'
import { Stack } from 'expo-router'
import TaskProvider from '@/providers/TaskProvider'

const TaskLayout = () => {
  return (
    <TaskProvider>
        <Stack />
    </TaskProvider>
  )
}

export default TaskLayout