import React, { createContext } from 'react'

export const AppContext = createContext()
export const AppProvider = ({ children }) => {
    const API = 'http://127.0.0.1:8000'

    return (
        <AppContext.Provider value={{ API }}>
            {children}
        </AppContext.Provider>
    )
}