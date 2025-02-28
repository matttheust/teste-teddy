// contexts/UserContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);