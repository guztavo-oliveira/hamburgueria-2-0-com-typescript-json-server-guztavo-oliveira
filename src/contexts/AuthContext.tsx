import { createContext, ReactNode, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  password: string;
  name: string;
  id?: number;
}

interface UserCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  SignIn: (credentials: UserCredentials) => void;
  SignUp: (user: User) => void;
  LogOut: () => void;
  user: User;
  accessToken: string;
}

interface AuthState {
  accessToken: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const history = useHistory();

  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@Hamb:accessToken");
    const user = localStorage.getItem("@Hamb:user");

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const SignIn = (credentials: UserCredentials) => {
    api
      .post("/login", credentials)
      .then((response) => {
        const { accessToken, user } = response.data;

        localStorage.setItem("@Hamb:accessToken", accessToken);
        localStorage.setItem("@Hamb:user", JSON.stringify(user));
        localStorage.setItem("@Hamb:userId", JSON.stringify(user.id));

        setData({ accessToken, user });

        history.push("/dashboard");
      })
      .catch((err) => {
        toast.error("E-mail ou senha inválidos!");
      });
  };

  const SignUp = (user: User) => {
    api
      .post("/register", user)
      .then((response) => {
        history.push("/");
        toast.success("Cadastro realizado com sucesso! Faça o seu login");
      })
      .catch((err) => console.log(err));
  };

  const LogOut = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <AuthContext.Provider
      value={{
        SignIn,
        SignUp,
        LogOut,
        accessToken: data.accessToken,
        user: data.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
