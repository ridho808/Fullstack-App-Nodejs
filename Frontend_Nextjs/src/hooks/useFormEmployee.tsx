import { useState } from "react";
import { apiFetch } from "../libs/httpApi";
import { useRouter } from "next/navigation";

type EmployeeForm = {
  name: string;
  email: string;
  position: string;
  photoFile: File | null;
  photoUrl?: string | null;
};

export default function UseFormEmployee() {
  const [employee, setEmployee] = useState<EmployeeForm>({
    name: "",
    email: "",
    position: "",
    photoFile: null,
    photoUrl: null,
  });

  const router = useRouter();

  function mapApiToForm(data: any): Partial<EmployeeForm> {
    return {
      name: data?.name ?? "",
      email: data?.email ?? "",
      position: data?.position ?? "",
      photoUrl: data?.photoUrl ?? data?.photo ?? null,
    };
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setEmployee((prev) => ({ ...prev, photoFile: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !employee.name ||
      !employee.email ||
      !employee.position ||
      !employee.photoFile
    ) {
      alert("Please fill in all fields (photo required for create)");
      return;
    }

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("position", employee.position);
    formData.append("photo", employee.photoFile);

    try {
      const response = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/employees`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response?.success) {
        alert("Employee added successfully");
        setEmployee({
          name: "",
          email: "",
          position: "",
          photoFile: null,
          photoUrl: null,
        });
        return;
      }
      alert("Failed to add employee");
    } catch {
      alert("An error occurred while adding the employee");
    }
  };

  const GetUserId = async (id: string) => {
    try {
      const response = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/employees/id/${id}`,
        {
          method: "GET",
        }
      );
      if (response?.success) {
        const mapped = mapApiToForm(response.data);
        setEmployee((prev) => ({ ...prev, ...mapped }));
        return;
      }
    } catch {
      router.push("/employees");
    }
  };

  const handleUpdate = async (
    id: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!employee.name || !employee.email || !employee.position) {
      alert("Name, email, and position are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("position", employee.position);
    if (employee.photoFile) {
      formData.append("photo", employee.photoFile);
    }

    try {
      const response = await apiFetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/employees/id/${id}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (response?.success) {
        alert("Employee updated successfully");
        return;
      }
      alert("Failed to update employee");
    } catch {
      alert("An error occurred while updating the employee");
    }
  };

  return {
    employee,
    handleChange,
    handleFileChange,
    handleSubmit,
    GetUserId,
    handleUpdate,
  };
}
