import { Container } from "@mantine/core";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 text-white py-6 border-t-2 border-gray-400">
      <Container size="lg" className="text-center">
        <p className="mt-5">
          &copy; {currentYear} LifeKit. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
