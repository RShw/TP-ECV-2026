import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from "react-native";

type TTask = {
  id: number;
  task: string;
};

export default function Index() {

  const TASK_LIST: TTask[] = useMemo(() => Array.from({ length: 41 }, (_, i) => ({
    id: i + 1,
    task: `Task ${i + 1}`,
  })), [])

  const [taskList, setTaskList] = useState<TTask[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isEndList, setIsEndList] = useState(false)
  const [offSet, setOffSet] = useState(0)
  const [cursorId, setcursorId] = useState(0)

  const getTasksByOffSet = useCallback(() => {
    /*** Remplace une action de fetching envers une API ***/
    const tempArray = [...TASK_LIST];
    const newTaskList = tempArray.slice(offSet, offSet + 20);
    if(newTaskList.length < 20) {
      setIsEndList(true)
    }
    setOffSet(offSet + 20);
    /*** Fin de : remplace une action de fetching envers une API ***/

    
    setTaskList([...taskList, ...newTaskList]);
    setIsLoading(false)
  }, [TASK_LIST, offSet, taskList])


  const getTasksByCursor = useCallback(() => {
    /*** Remplace une action de fetching envers une API ***/
    const tempArray = [...TASK_LIST];
    const newTaskList = tempArray.filter(task => task?.id > cursorId).slice(0, 20);
    if(newTaskList.length < 20) {
      setIsEndList(true)
    }
    setcursorId(newTaskList[newTaskList.length - 1].id)
    /*** Fin de : remplace une action de fetching envers une API ***/

    
    setTaskList([...taskList, ...newTaskList]);
    setIsLoading(false)
  }, [TASK_LIST, cursorId, taskList])
  
  const loadMore = useCallback(() => {
    if(isEndList) return;

    setIsLoading(true)
    setTimeout(() => {
      console.log("loadMore");
      getTasksByCursor();
    }, 1500);
  }, [getTasksByCursor, isEndList])

  useEffect(() => {
    if(taskList.length === 0) {
      loadMore();
    }
  }, [taskList.length, loadMore])

  const TaskItem = ({ item }: { item: TTask }) => {
    return (
      <View style={styles.taskItem}>
        <Text>{item.task}</Text>
      </View>
    )
  }

  const LoadingFooter = () => {
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator />
      </View>
    )
  }

  const EndListFooter = () => {
    return (
      <View style={styles.loadingFooter}>
        <Text>End of list</Text>
      </View>
    )
  }

  const Footer = () => {

    if(isEndList) return <EndListFooter />;
    if(isLoading) return <LoadingFooter />;
  }
  

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={taskList}
        onEndReached={loadMore}
        ListFooterComponent={Footer}
        renderItem={({ item }: { item: TTask }) => <TaskItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  loadingFooter: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
})
