import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { FaRegAddressCard } from "react-icons/fa";
import { HiMiniUserGroup } from "react-icons/hi2";

export default function Home() {
  return (
    <section className="w-full">
      <h1 className="text-md text-start text-gray-500">{"/"} Dashboard</h1>
      <div className="w-full flex flex-col md:flex-row gap-4 py-2">
        <Card className="w-[320px]">
          <CardBody>
            <FaRegAddressCard size={40} />
            <h2 className="text-lg font-semibold">Employees</h2>
            <p className="text-sm text-gray-500">Manage your employees</p>
            <Link
              showAnchorIcon
              size="sm"
              href="/employees"
              color="secondary"
              className="mt-2"
            >
              View Employees
            </Link>
          </CardBody>
        </Card>
        <Card className="w-[320px]">
          <CardBody>
            <HiMiniUserGroup size={40} />
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-sm text-gray-500">Manage your users</p>
            <Link
              showAnchorIcon
              size="sm"
              href="/users"
              color="secondary"
              className="mt-2"
            >
              View Users
            </Link>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
