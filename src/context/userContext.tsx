import axios from 'axios';
import Cookies from 'js-cookie';
import { useState, useEffect, createContext, ReactNode, useContext } from 'react';

export interface userModel {
  id: number;
  name: string;
  role: string;
  email: string;
  bio: string;
  location: string;
}

interface userContextType {
  user: userModel | null;
  setUser: (user: userModel | null) => void;
}

export const userContext = createContext<userContextType | undefined>(undefined);

interface userProviderProps {
  children: ReactNode;
}

const UserProvider = ({ children }: userProviderProps) => {
  const [user, setUser] = useState<userModel | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const jwtToken = Cookies.get('jwtToken');

      if (!jwtToken) {
        setUser(null);
        return;
      }

      try {
        const res = await axios.get(`http://lvh.me:3001/api/v1/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${jwtToken}`,
          },
        });
        const attrs = res.data.data.attributes;
        const userData: userModel = {
          id: Number(attrs.id),
          name: attrs.name,
          role: attrs.role,
          email: attrs.email,
          bio: attrs.bio,
          location: attrs.location
        };

        setUser(userData);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          Cookies.remove('jwtToken', { path: '/', domain: 'lvh.me' });
          Cookies.remove('jwtToken', { path: '/' });
        } else {
          console.error("Error fetching user:", err);
        }

        setUser(null);
      }
    }

    fetchUser();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export function useUser() {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default UserProvider;
