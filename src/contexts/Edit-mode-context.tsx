import { createContext, useContext, useState } from 'react'



const EditModeContext = createContext<{
    editMode: boolean, 
    toggleEditMode: () => void
    }>({
        editMode: false, 
        toggleEditMode: () => {},
    })

export const EditModeProvider = ({children}: {children: React.ReactNode}) => {
    const [editMode, setEditMode] = useState(false);
    const toggleEditMode = () => setEditMode((prev) => !prev)

    return (
        <EditModeContext.Provider value={{ editMode, toggleEditMode}}>
            {children}
        </EditModeContext.Provider>
    )
}

export const useEditMode = () => useContext(EditModeContext)