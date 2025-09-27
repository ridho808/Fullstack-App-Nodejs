"use client";

import UseFormEmployee from "@/src/hooks/useFormEmployee";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";

export default function AddEmployeePage() {
  const { employee, handleChange, handleFileChange, handleSubmit } =
    UseFormEmployee();
  return (
    <section className="w-full">
      <h1 className="text-md text-start text-gray-500">{"/"} Add Employee</h1>
      <Card className="w-[50%] mx-auto mt-5">
        <CardHeader>
          <p className="text-sm font-bold">Add New Employee</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              Add Employee
            </Button>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}
