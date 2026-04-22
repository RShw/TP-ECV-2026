import React, { createContext, useState } from 'react'

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

const UserProvider = ({children}: {children: React.ReactNode}) => {


    const [listUser, setListUser] = useState<TUser[]>(LIST_USERS)

    const addUser = (user: TUser) => {
        setListUser([...listUser, user])
    }

    const updateUser = (user: TUser) => {
        setListUser(listUser.map(u => u.id === user.id ? user : u))
    }

    const deleteUser = (id: number) => {
        setListUser(listUser.filter(u => u.id !== id))
    }

  return (
    <UserContext.Provider value={{listUser: listUser, addUser, updateUser, deleteUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider