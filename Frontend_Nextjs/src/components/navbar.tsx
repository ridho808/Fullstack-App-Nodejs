import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";

import { Link } from "@heroui/link";
import NextLink from "next/link";
import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { Logo } from "@/src/components/icons";
import clsx from "clsx";
import { Button } from "@heroui/button";
import { cookies } from "next/headers";
import { LogoutAction } from "../actions/LogoutAction";

export const Navbar = async () => {
  let isLogin = false;
  const accessToken = (await cookies()).get("accessToken")?.value;
  const refreshToken = (await cookies()).get("refreshToken")?.value;
  if (accessToken || refreshToken) {
    isLogin = true;
  }

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p
              className={clsx("font-bold text-inherit", {
                "text-violet-600": true,
              })}
            >
              {siteConfig.name}
            </p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
          {isLogin && (
            <form action={LogoutAction}>
              <Button type="submit" color="secondary">
                Log out
              </Button>
            </form>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
