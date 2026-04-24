import React, { createContext, useContext, useState } from 'react'

export const UserContext = createContext({
  name: '',
  surname: '',
})

const UserProvider = ({children}: {children: React.ReactNode}) => {

    const [name] = useState('Jane')
    const [surname] = useState('Bob')

  return (
    <UserContext.Provider value={{name, surname}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
    const context = useContext(UserContext)
    if(!context) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    return context
}



export default UserProvider