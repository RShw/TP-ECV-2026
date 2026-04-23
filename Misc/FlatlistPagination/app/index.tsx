import { useCallback, useEffect, useMemo, useReducer } from "react";
import { FlatList, Text, View, StyleSheet, ActivityIndicator } from "react-native";

type TTask = {
  id: number;
  task: string;
};

type TStateTaskList = {
  taskList: TTask[];
  isLoading: boolean;
  isEndList: boolean;
  offSet: number;
  cursorId: number;
}

const ACTIONS_TASK_LIST = {
  BEGIN_LOADING: "BEGIN_LOADING",
  END_LOADING: "END_LOADING",
  END_LIST: "END_LIST",
} as const;

type TActionReducerTaskList = 
  | {type: keyof typeof ACTIONS_TASK_LIST, payload?: undefined}
  | {type: keyof typeof ACTIONS_TASK_LIST, payload: {newTaskList: TTask[]}}
  | {type: keyof typeof ACTIONS_TASK_LIST, payload: {newTaskList: TTask[]}}

const INIT_STATE_TASK_LIST = {
  taskList: [],
  isLoading: false,
  isEndList: false,
  offSet: 0,
  cursorId: 0,
}

export default function Index() {

  const TASK_LIST: TTask[] = useMemo(() => Array.from({ length: 41 }, (_, i) => ({
    id: i + 1,
    task: `Task ${i + 1}`,
  })), [])

  const reducer = (state: TStateTaskList, action: TActionReducerTaskList ): TStateTaskList => {
    switch(action.type) {
      case ACTIONS_TASK_LIST.BEGIN_LOADING:
        return {
          ...state,
          isLoading: true,
        }
      case ACTIONS_TASK_LIST.END_LOADING:
        return {
          ...state,
          isLoading: false,
          cursorId: state.cursorId + 20,
          offSet: state.offSet + 20,
          taskList: [...state.taskList, ...action?.payload?.newTaskList ?? []],
        }
      case ACTIONS_TASK_LIST.END_LIST: 
        return {
          ...state,
          isLoading: false,
          isEndList: true,
          cursorId: state.cursorId + 20,
          offSet: state.offSet + 20,
          taskList: [...state.taskList, ...action?.payload?.newTaskList ?? []],
        }
      default:
        return state
    }
  }

  const [stateTaskList, dispatch] = useReducer(reducer, INIT_STATE_TASK_LIST)

  const beginLoading = () => {
    dispatch({type: ACTIONS_TASK_LIST.BEGIN_LOADING})
  }

  const endLoading = ({newTaskList}: {newTaskList: TTask[]}) => {
    dispatch({type: ACTIONS_TASK_LIST.END_LOADING, payload: {newTaskList}})
  }

  const endList = ({newTaskList}: {newTaskList: TTask[]}) => {
    dispatch({type: ACTIONS_TASK_LIST.END_LIST, payload: {newTaskList}})
  }

  const getTasksByCursor = useCallback(() => {
    /*** Remplace une action de fetching envers une API ***/
    const tempArray = [...TASK_LIST];
    const newTaskList = tempArray.filter(task => task?.id > stateTaskList.cursorId).slice(0, 20);
    /*** Fin de : remplace une action de fetching envers une API ***/
    if(newTaskList.length < 20) {
      endList({newTaskList})
      return
    }
    endLoading({newTaskList})
  }, [TASK_LIST, stateTaskList])
  
  const loadMore = useCallback(() => {
    if(stateTaskList.isEndList) return;

    beginLoading()
    getTasksByCursor();
  }, [getTasksByCursor, stateTaskList])

  useEffect(() => {
    if(stateTaskList.taskList.length === 0) {
      loadMore();
    }
  }, [stateTaskList.taskList.length, loadMore])

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

    if(stateTaskList.isEndList) return <EndListFooter />;
    if(stateTaskList.isLoading) return <LoadingFooter />;
  }
  

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={stateTaskList.taskList}
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
