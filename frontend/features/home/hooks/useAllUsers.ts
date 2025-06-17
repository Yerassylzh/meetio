import { User } from "@/types/db";
import { useCallback, useEffect, useState } from "react";
import { getAllUsers } from "../lib/users";

export default function useAllUsers() {
  const [users, setUsers] = useState<User[] | null>(null);

  const fetchUsers = useCallback(async () => {
    setUsers(await getAllUsers());
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return [users, fetchUsers];
}
