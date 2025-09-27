"use client";

import UseUsers from "@/src/hooks/useUsers";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";

type Users = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export default function UsersPage() {
  const { users } = UseUsers();
  return (
    <section className="w-full">
      <h1 className="text-md text-start text-gray-500">{"/"} Users</h1>
      <div className="w-full flex flex-col md:flex-row gap-4 py-2"></div>
      <Table aria-label="Example empty table">
        <TableHeader>
          <TableColumn>Username</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Role</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No rows to display."}>
          {users.map((user: Users) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
