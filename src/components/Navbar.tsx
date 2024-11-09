"use client";

import { Box, Button } from "@mantine/core";
import { clearSession } from "@/app/api/auth/route";
import { useSessionStore } from "@/store/sessionStore";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { session } = useSessionStore();
  return (
    <Box p="md">
      <div className="flex justify-between items-center">
        <h1>Life Kit</h1>
        {session ? (
          <Button onClick={clearSession}>Logout</Button>
        ) : (
          <Button onClick={() => router.push("/login")}>Login</Button>
        )}
      </div>
    </Box>
  );
};

export default Navbar;
