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
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { MdManageAccounts } from "react-icons/md";

const menuItems = [
  { label: "Home", link: "/" },
  { label: "To-Do", link: "/to-do" },
  { label: "Goals", link: "/goals" },
  { label: "Finance", link: "/finance" },
  { label: "Ideas", link: "/ideas" },
  { label: "Notes", link: "/notes" },
  { label: "Temp", link: "/temp" },
];

const Navbar = () => {
  const router = useRouter();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.push("/login");
  };

  return (
    <Box component="nav" className="bg-gray-900 shadow-md sticky top-0 z-10">
      <Container className="flex items-center justify-between py-4 relative">
        <Title
          order={2}
          className="text-white font-bold text-xl cursor-pointer"
          onClick={() => session && router.push("/")}
        >
          Life Kit
        </Title>

        <Group className="hidden md:flex ml-auto gap-4">
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

        <Menu
          position="bottom"
          withArrow
          transitionProps={{
            transition: "slide-up",
            duration: 100,
            timingFunction: "ease",
          }}
        >
          <Menu.Target>
            <Button
              variant="subtle"
              className={`text-gray-300 hover:text-white ml-auto hover:bg-gray-800 h-10 rounded-full flex items-center justify-center mr-5 ${
                session ? "w-10" : "border border-gray-500 rounded-full px-5"
              }`}
            >
              {session ? (
                <Avatar
                  src={session.user?.user_metadata.avatar_url}
                  alt={session.user?.email}
                  radius="xl"
                />
              ) : (
                <span className="text-sm flex items-center justify-center gap-1 ">
                  <MdManageAccounts />
                  Account
                </span>
              )}
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            {session ? (
              <>
                <Menu.Item onClick={() => router.push("/profile")}>
                  Profile
                </Menu.Item>
                <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item onClick={() => router.push("/login")}>
                  Login
                </Menu.Item>
                <Menu.Item onClick={() => router.push("/signup")}>
                  Signup
                </Menu.Item>
              </>
            )}
          </Menu.Dropdown>
        </Menu>

        <Burger
          opened={drawerOpened}
          onClick={() => setDrawerOpened(!drawerOpened)}
          aria-label="Toggle navigation"
          className="md:hidden"
          color="gray"
        />
      </Container>

      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        padding="md"
        size="sm"
        className="md:hidden"
      >
        {session && (
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
        )}
      </Drawer>
    </Box>
  );
};

export default Navbar;
