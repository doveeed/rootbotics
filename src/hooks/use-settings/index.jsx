
import React, { createContext, useContext } from 'react';


const SettingsContext = createContext({
  enableDynamicTables: false,
  enableCCPSupport: false
});

export function SettingsContextProvider({
  children,
  ...props
}) {
  return (
    <SettingsContext.Provider value={{...props}}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
