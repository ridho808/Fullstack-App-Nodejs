"use client";

import UseFormEmployee from "@/src/hooks/useFormEmployee";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function EditPage() {
  const { id } = useParams();
  const { employee, handleChange, handleFileChange, GetUserId, handleUpdate } =
    UseFormEmployee();

  useEffect(() => {
    if (id) {
      GetUserId(Array.isArray(id) ? id[0] : id);
    }
  }, [id]);

  return (
    <section className="w-full">
      <h1 className="text-md text-start text-gray-500">{"/"} Edit Employee</h1>
      <Card className="w-[50%] mx-auto mt-5">
        <CardHeader>
          <p className="text-sm font-bold">Edit Employee </p>
        </CardHeader>
        <CardBody>
          <form
            onSubmit={(e) => handleUpdate(Array.isArray(id) ? id[0] : id!, e)}
            className="flex flex-col gap-4"
          >
            <Input
              label="Name"
              id="name"
              required
              name="name"
              value={employee.name}
              onChange={handleChange}
              placeholder="masukkan nama"
            />
            <Input
              label="Email"
              id="email"
              required
              name="email"
              value={employee.email}
              onChange={handleChange}
              placeholder="masukkan email"
            />
            <Input
              label="Position"
              id="position"
              required
              name="position"
              value={employee.position}
              onChange={handleChange}
              placeholder="masukkan posisi"
            />
            <Input
              label="Photo"
              id="photo"
              name="photo"
              type="file"
              onChange={handleFileChange}
              placeholder="masukkan foto"
            />
            <Button variant="solid" color="secondary" type="submit">
              Edit Employee
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}
