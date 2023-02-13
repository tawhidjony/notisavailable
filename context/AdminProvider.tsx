import React, { createContext, useState } from "react";

interface ContextInterface {
  isLogin: boolean;
  user: object;
  token: string;
}

type PropType = {
  children: React.ReactNode;
};

export const AdminContext = createContext<ContextInterface | null>(null);

const AdminProvider: React.FC<PropType> = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<object>({});
  const [token, setToken] = useState<string>("");

  const context: ContextInterface = {
    isLogin,
    user,
    token,
  };

  return (
    <AdminContext.Provider value={context}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;
