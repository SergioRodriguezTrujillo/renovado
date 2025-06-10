"use client"

import { createContext, useContext, useState } from "react"

const UserContext = createContext()

export function useUser() {
  return useContext(UserContext)
}

export function UserProvider({ children }) {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "nuevo",
      email: "nuevo@gmail.com",
      role: "administración",
      active: true,
      createdAt: "2024-01-01T10:00:00Z",
      avatar: "n",
    },
    {
      id: 2,
      name: "prueba",
      email: "prueba@gmail.com",
      role: "colaborador",
      active: true,
      createdAt: "2024-01-02T11:00:00Z",
      avatar: "p",
    },
    {
      id: 3,
      name: "Tobi",
      email: "tobi@gmail.com",
      role: "colaborador",
      active: true,
      createdAt: "2024-01-03T12:00:00Z",
      avatar: "T",
    },
    {
      id: 4,
      name: "María García",
      email: "maria@gmail.com",
      role: "cliente",
      active: true,
      createdAt: "2024-01-04T13:00:00Z",
      avatar: "M",
    },
    {
      id: 5,
      name: "Carlos López",
      email: "carlos@gmail.com",
      role: "cliente",
      active: true,
      createdAt: "2024-01-05T14:00:00Z",
      avatar: "C",
    },
  ])

  const createUser = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      active: true,
      createdAt: new Date().toISOString(),
      avatar: userData.name.charAt(0).toUpperCase(),
    }
    setUsers((prev) => [...prev, newUser])
    return newUser
  }

  const updateUser = (userId, userData) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, ...userData } : user)))
  }

  const deleteUser = (userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))
  }

  const toggleUserStatus = (userId) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, active: !user.active } : user)))
  }

  const getUsersByRole = (role) => {
    return users.filter((user) => user.role === role)
  }

  const getRecentUsers = (limit = 5) => {
    return users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, limit)
  }

  const value = {
    users,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    getUsersByRole,
    getRecentUsers,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
