import React, { createContext, useContext, useReducer } from 'react'

export type TUser = {
    id: number
    name: string
    email: string
}

type TUserContext = {
    listUser: TUser[],
    addUser: (user: TUser) => void,
    updateUser: (user: TUser) => void,
    deleteUser: (id: number) => void,
}

export const UserContext = createContext<TUserContext>({
    listUser: [],
    addUser: () => {},
    updateUser: () => {},
    deleteUser: () => {},
})

const LIST_USERS: TUser[] = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
    },
    {
        id: 3,
        name: 'John Smith',
        email: 'john.smith@example.com',
    },
    {
        id: 4,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
    },
]


const USER_ACTIONS = {
    ADD_USER: 'ADD_USER',
    UPDATE_USER: 'UPDATE_USER',
    DELETE_USER: 'DELETE_USER',
} as const

type TAction =
    | { type: typeof USER_ACTIONS.ADD_USER; payload: { user: TUser } }
    | { type: typeof USER_ACTIONS.UPDATE_USER; payload: { user: TUser } }
    | { type: typeof USER_ACTIONS.DELETE_USER; payload: { id: number } }

const reducer: React.Reducer<TUser[], TAction> = (state, action) => {
    switch(action.type) {
        case USER_ACTIONS.ADD_USER:
            return [...state, action.payload.user]
        case USER_ACTIONS.UPDATE_USER:
            return state.map(user => user.id === action.payload.user.id ? action.payload.user : user)
        case USER_ACTIONS.DELETE_USER:
            return state.filter(user => user.id !== action.payload.id)

        default:
            return state
    }
}

const UserProvider = ({children}: {children: React.ReactNode}) => {

    const [userState, dispatchUser] = useReducer(reducer, LIST_USERS)

    const addUser = (user: TUser) => {
        dispatchUser({type: USER_ACTIONS.ADD_USER, payload: {user}})
    }

    const updateUser = (user: TUser) => {
        dispatchUser({type: USER_ACTIONS.UPDATE_USER, payload: {user}})
    }

    const deleteUser = (id: number) => {
        dispatchUser({type: USER_ACTIONS.DELETE_USER, payload: {id}})
    }

  return (
    <UserContext.Provider value={{listUser: userState, addUser, updateUser, deleteUser}}>
        {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error('useUserProvider must be used within a UserProvider')
    }
    return {
        ...context
    }
}

export default UserProvider