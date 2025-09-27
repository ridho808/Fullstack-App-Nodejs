"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../libs/httpApi";

export default function UseUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        {
          method: "GET",
        }
      );
      setUsers(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.success) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user. Need Admin Role");
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    fetchUsers,
    deleteUser,
  };
}
