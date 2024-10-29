'use client'

import React, { ReactElement, useState, SetStateAction, Dispatch } from "react";

type UserT = {
  email: string,
  name: string,
  _id: string,
  description: string,
  title: string,
  profileImage: string
}

type UserFunctionsT = {
  user: UserT | null,
  setUser: Dispatch<SetStateAction<UserT | null>>
}
export const UserContext = React.createContext<UserFunctionsT | null>(null);


export default function UserContextProvider(props: { children: ReactElement }) {
  const [user, setUser] = useState<UserT | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>
  )
}
