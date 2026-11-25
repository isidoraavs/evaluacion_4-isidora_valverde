import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';import type {Theme} from '../types';
const Context=createContext<{theme:Theme;toggle:()=>void}|null>(null);
export function ThemeProvider({children}:{children:ReactNode}){const [theme,setTheme]=useState<Theme>(()=>localStorage.getItem('theme')==='dark'?'dark':'light');useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem('theme',theme)},[theme]);return <Context.Provider value={{theme,toggle:()=>setTheme(t=>t==='light'?'dark':'light')}}>{children}</Context.Provider>;}
export function useTheme(){const context=useContext(Context);if(!context)throw new Error('ThemeProvider requerido');return context;}
