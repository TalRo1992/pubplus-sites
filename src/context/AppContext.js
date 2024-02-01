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

 const [uniqueIdCounter, setUniqueIdCounter] = useState(1);

 useEffect(() => {
   // Update the counter only once during component mount
   setUniqueIdCounter((prevCounter) => prevCounter + 1);
 }, []); // Empty dependency array ensures it runs only once

 const counterRef = useRef(uniqueIdCounter);

 const generateUniqueId = () => {
   counterRef.current = +counterRef.current + 1;
   return counterRef.current;
 };

 const memoizedGenerateUniqueId = useMemo(() => generateUniqueId, [generateUniqueId]);


// Define any functions or values you want to provide
 const value = {
 state,
 setState,
 generateUniqueId: memoizedGenerateUniqueId
 };
return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
 };
// Export the context
 export const useAppContext=()=> useContext(AppContext)