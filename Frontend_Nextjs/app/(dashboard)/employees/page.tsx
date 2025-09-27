"use client";

import UseEmployee from "@/src/hooks/useEmployee";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import Image from "next/image";

type Employee = {
  id: string;
  name: string;
  email: string;
  position: string;
  photoPath: string;
};

export default function EmployeesPage() {
  const { employees, deleteEmployee } = UseEmployee();
  const td = "align-middle py-3";
  return (
    <section className="w-full">
      <h1 className="text-md text-start text-gray-500">{"/"} Employees</h1>
      <div className="w-full flex flex-col md:flex-row gap-4 py-2"></div>
      <Table aria-label="Example empty table">
        <TableHeader>
          <TableColumn>{""}</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Position</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>

        <TableBody emptyContent="No rows to display.">
          {employees.map((employee: Employee) => (
            <TableRow key={employee.id}>
              <TableCell className={td}>
                <div className="flex items-center gap-3">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${employee.photoPath}`}
                    alt={employee.name}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </div>
              </TableCell>

              <TableCell className={td}>{employee.name}</TableCell>
              <TableCell className={td}>{employee.email}</TableCell>
              <TableCell className={td}>{employee.position}</TableCell>

              <TableCell className={td}>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Button
                    as={Link}
                    href={`/employees/${employee.id}`}
                    size="sm"
                    color="secondary"
                  >
                    Edit
                  </Button>
                  <Button
                    onPress={() => deleteEmployee(employee.id)}
                    size="sm"
                    color="danger"
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
