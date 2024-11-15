"use client";

import React from "react";
import { Button, Box } from "@mantine/core";

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white h-screen flex flex-col justify-center items-center text-center"
        style={{ backgroundImage: "url('/hero-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 px-6 md:px-12">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 tracking-tight text-yellow-400">
            Transform Your Life with LifeKit
          </h1>
          <p className="text-xl sm:text-2xl mb-6 max-w-3xl mx-auto text-gray-300">
            Unlock your full potential with LifeKit – a toolkit designed to help
            you master health, productivity, and balance in everyday life.
          </p>
          <Button
            variant="filled"
            color="yellow"
            size="xl"
            className="hover:bg-yellow-600 transition duration-300 ease-in-out px-8 py-4 text-lg"
            onClick={() => (window.location.href = "/contact")}
          >
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* About Section */}
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

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2024 LifeKit. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
