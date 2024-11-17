"use client";

import {
  Box,
  Container,
  Group,
  Button,
  Title,
  Menu,
  Avatar,
  Burger,
  Drawer,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { clearSession } from "@/app/api/auth/route";
import { useSessionStore } from "@/store/sessionStore";

const menuItems = [
  { label: "To-Do", link: "/to-do" },
  { label: "Goals", link: "/goals" },
  { label: "Finance", link: "/finance" },
  { label: "Ideas", link: "/ideas" },
];

const Navbar = () => {
  const router = useRouter();
  const { session } = useSessionStore();
  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <Box component="nav" className="bg-gray-900 shadow-md sticky top-0 z-10">
      <Container className="flex items-center justify-between py-4">
        {/* Brand Section */}
        <Title
          order={2}
          className="text-white font-bold text-xl cursor-pointer"
          onClick={() => router.push("/")}
        >
          Life Kit
        </Title>

        <Group className="hidden md:flex">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="subtle"
              className="text-gray-300 hover:text-white"
              onClick={() => router.push(item.link)}
            >
              {item.label}
            </Button>
          ))}
        </Group>

        <Group>
          {session ? (
            <>
              <Menu shadow="md" width={200} position="bottom-end">
                <Menu.Target>
                  <Avatar
                    radius="xl"
                    src={""}
                    alt="Profile"
                    className="cursor-pointer"
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Account</Menu.Label>
                  <Menu.Item onClick={() => router.push("/profile")}>
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    onClick={clearSession}
                    className="text-red-500 hover:bg-red-100"
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          ) : (
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white shadow"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          )}

          <Burger
            opened={drawerOpened}
            onClick={() => setDrawerOpened(!drawerOpened)}
            className="md:hidden"
            color="white"
          />
        </Group>
      </Container>

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        padding="md"
        size="sm"
        className="md:hidden"
      >
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="subtle"
              className="text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => {
                router.push(item.link);
                setDrawerOpened(false);
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </Drawer>
    </Box>
  );
};

export default Navbar;
