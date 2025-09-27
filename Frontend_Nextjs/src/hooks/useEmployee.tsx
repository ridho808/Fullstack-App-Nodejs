"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "../libs/httpApi";

export default function UseEmployee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/employees`,
        {
          method: "GET",
        }
      );
      setEmployees(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id: string) => {
    try {
      const res = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/employees/id/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.success) {
        fetchEmployees();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("An error occurred while deleting the employee");
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  return { employees, loading, deleteEmployee };
}
