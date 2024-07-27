"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface UserContextProps {
  users: User[];
  loading: boolean;
  fetchUserByCredentials: (user: any) => Promise<void>;
  createUser: (user: any) => Promise<void>;
  updateUser: (id: any, updatedUser: any) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const UsersContext = createContext<UserContextProps | undefined>(undefined);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserByCredentials = async (user: any) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/users/getById", user);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create User
  const createUser = async (user: any) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/users", user);
      if (res.status === 400) {
        toast.error("User already created!");
      }
      if (res.status === 201) {
        toast.success("Successfully created!");
        setUsers([...users, res.data]);
        router.push("/users");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Faild to create user!");
    } finally {
      setLoading(false);
    }
  };

  // Update User
  const updateUser = async (id: any, updatedUser: any) => {
    setLoading(true);
    try {
      const res = await axios.put("/api/users/", { id, ...updatedUser });
      if (res.status === 400) {
        toast.error("User already created with this email!");
      }
      if (res.status === 404) {
        toast.error("User not found!");
      }
      if (res.status === 200) {
        toast.success("Successfully updated!");
        const updatedUser = res.data;
        const updatedUsers = users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
        setUsers(updatedUsers);
        router.push("/users");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Faild to updating user!");
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const deleteUser = async (id: string) => {
    try {
      const res = await axios.delete("/api/users", {
        data: { id },
      });

      if (res.status === 404) {
        toast.error("User not found!");
      }

      if (res.status === 200) {
        const deletedUser = res.data;
        const updatedUserData = users.filter(
          (user: any) => user._id !== deletedUser._id
        );

        setUsers(updatedUserData);
        toast.success("Successfully deleted!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Faild to delete user!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        createUser,
        updateUser,
        deleteUser,
        fetchUserByCredentials,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
};
