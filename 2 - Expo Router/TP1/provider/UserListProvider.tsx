import React, {createContext, useState} from 'react'

export type TUser = {
  id: number;
  name: string;
  email: string;
}

export type TUserListContext = {
  userList: TUser[];
  activeUser: number | undefined;
  setActiveUser: (id: number) => void;
  addUser: (user: TUser) => void;
  updateUser: (user: TUser) => void;
}

export const LIST_USERS: TUser[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
  },
  {
    id: 3,
    name: "John Smith",
    email: "john.smith@example.com",
  },
  {
    id: 4,
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
];

//Cette ligne, permet la création d'un contexte, contexte qui est nécessaire à la création d'un Provider
//La partie la création d'un contexte : "createContext"
//<{userList: TUser[]}> : application d'un type TS,
//{userList: []}: valeur par défaut du contexte
export const UserListContext = createContext<TUserListContext>({
    userList: [],
    activeUser: undefined,
    setActiveUser: () => {},
    addUser: () => {},
    updateUser: () => {},
})

const UserListProvider = ({children}: {children: React.ReactNode}) => {

    const [activeUser, setActiveUser] = useState<number | undefined>(undefined)
    const [listUser, setListUser] = useState<TUser[]>(LIST_USERS)

    const addUser = (user: TUser) => {
        setListUser([...listUser, user])
    }

    const updateUser = (user: TUser) => {
        setListUser(listUser.map(u => u.id === user.id ? user : u))
    }

  return (
    //J'utilise le contexte avec "createContext", pour créer un provider
    <UserListContext.Provider value={{userList: listUser, activeUser, setActiveUser, addUser, updateUser}}>
        {children}
    </UserListContext.Provider>
  )
}

export default UserListProvider