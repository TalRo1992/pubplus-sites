"use client"// Because we're inside a server component
import React, { createContext, useState, useContext, useMemo, useEffect, useRef } from 'react';
// Create the context
const AppContext = createContext();
// Create a provider component
 export const AppProvider = ({ children }) => {
 const [state, setState] = useState({
    articleItemsLength: null,
    article: null,
    originalLastArticle: null,
    LastItemPosition: null,
 });

 const value = {
 state,
 setState,
 };
return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
 };
// Export the context
 export const useAppContext=()=> useContext(AppContext)