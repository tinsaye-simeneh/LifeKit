"use client";

import { Box, Container, Group, Button, Title } from "@mantine/core";
import { clearSession } from "@/app/api/auth/route";
import { useSessionStore } from "@/store/sessionStore";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { session } = useSessionStore();

  return (
    <Box
      component="nav"
      style={{
        background: "linear-gradient(to right, #4F46E5, #9333EA)",
        padding: "8px 0",
      }}
    >
      <Container className="flex justify-between items-center">
        <Title order={2} style={{ color: "white" }}>
          Life Kit
        </Title>
        <Group>
          {session ? (
            <Button
              color="red"
              onClick={clearSession}
              styles={(theme) => ({
                root: {
                  backgroundColor: theme.colors.red[6],
                  "&:hover": { backgroundColor: theme.colors.red[7] },
                },
              })}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="green"
              onClick={() => router.push("/login")}
              styles={(theme) => ({
                root: {
                  backgroundColor: theme.colors.green[6],
                  "&:hover": { backgroundColor: theme.colors.green[7] },
                },
              })}
            >
              Login
            </Button>
          )}
        </Group>
      </Container>
    </Box>
  );
};

export default Navbar;
