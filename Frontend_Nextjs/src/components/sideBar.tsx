"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { RxDashboard } from "react-icons/rx";
import { HiMiniUserGroup } from "react-icons/hi2";
import { Link } from "@heroui/link";
import { FaRegListAlt, FaRegAddressCard } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { Card } from "@heroui/card";

export default function SideBar() {
  return (
    <Card
      isBlurred
      className="hidden lg:block w-full h-full md:w-80 md:sticky md:top-16 p-4 rounded-md border-none bg-background/60 dark:bg-default-100/50"
      shadow="sm"
    >
      <div className="flex justify-center items-center gap-2 mb-4">
        <RxDashboard />
        <span className="text-md font-semibold">Menu</span>
      </div>
      <div className="flex justify-around items-center gap-2">
        <Accordion variant="splitted">
          <AccordionItem
            key="1"
            aria-label="Employees"
            startContent={<FaRegAddressCard size={20} />}
            title="Employees"
          >
            <ul>
              <li className="p-2">
                <Link
                  showAnchorIcon
                  href="/employees"
                  color="foreground"
                  className="text-sm gap-2"
                  anchorIcon={<FaRegListAlt size={16} />}
                >
                  List of Employees
                </Link>
              </li>
              <li className="p-2">
                <Link
                  showAnchorIcon
                  href="/employees/add"
                  color="foreground"
                  className="text-sm gap-2"
                  anchorIcon={<IoMdPersonAdd size={16} />}
                >
                  Add Employee
                </Link>
              </li>
            </ul>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Users"
            startContent={<HiMiniUserGroup size={20} />}
            title="Users"
          >
            <ul>
              <li className="p-2">
                <Link
                  showAnchorIcon
                  href="/users"
                  color="foreground"
                  className="text-sm gap-2"
                  anchorIcon={<FaRegListAlt size={16} />}
                >
                  List of Users
                </Link>
              </li>
            </ul>
          </AccordionItem>
        </Accordion>
      </div>
    </Card>
  );
}
