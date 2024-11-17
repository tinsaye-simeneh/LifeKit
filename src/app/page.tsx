"use client";

import React from "react";
import { Button, Box } from "@mantine/core";

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <section className="py-16 px-8 bg-white">
        <Box className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold mb-4">What is LifeKit?</h2>
          <p className="text-lg text-gray-700 mb-6">
            LifeKit is your personal toolkit for living a balanced and
            fulfilling life. Whether it&apos;s physical health, mental
            well-being, or productivity, we have everything you need to thrive.
          </p>
          <Button
            variant="outline"
            color="blue"
            size="lg"
            onClick={() => (window.location.href = "/about")}
          >
            Learn More
          </Button>
        </Box>
      </section>

      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2024 LifeKit. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
