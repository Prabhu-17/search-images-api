import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const AppContext=createContext()

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches
  const storedDarkMode = localStorage.getItem('darkTheme') === 'true'

  return storedDarkMode || prefersDarkMode
}

export const AppProvider=({children})=>{
     const [isDarkTheme,setIsDarkTheme]=useState(getInitialDarkMode())
     const [searchText,setSearchText]=useState('cat')
     const toggleDarkTheme=()=>{
       const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
     }

     useEffect(()=>{
        document.body.classList.toggle('dark-theme', isDarkTheme)
     },[isDarkTheme])
     
     return <AppContext.Provider value={{isDarkTheme,toggleDarkTheme,searchText,setSearchText}}>
        {children}
     </AppContext.Provider>
}

export const useGlobalContext=()=>{
    return useContext(AppContext)
}