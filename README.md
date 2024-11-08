# LifeKit

LifeKit is a simple life management application built with Next.js, TypeScript, Supabase, and Mantine. It helps users organize various aspects of their life, including tasks, finances, ideas, goals, and personal notes.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)

## Features

- **Authentication**: User sign-up, log-in, and secure access using Supabase.
- **Task Management**: Organize tasks by priority (High, Medium, Low) and status.
- **Finance Tracking**: Log daily expenses, track remaining balance, and view monthly summaries for both cash and in-bank accounts.
- **Ideas Hub**: Store and revisit new business ideas.
- **Goals Management**: Set and track goals in categories like Skills, Projects, Finance, and Personal.
- **Personal Notes**: Save and organize personal text storage.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Mantine UI
- **Backend**: Supabase (for database and authentication)
- **State Management**: React Context API or Zustand (optional for larger scale)
- **Form Handling**: react-hook-form, yup (for validation)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/lifekit.git
   cd lifekit
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Install additional packages if needed** (see [Tech Stack](#tech-stack)).

## Environment Variables

Create a `.env.local` file in the root of your project and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Replace `your-supabase-url` and `your-anon-key` with the details from your Supabase project.

## Usage

To run the project locally, use:

```bash
npm run dev
```

This command starts the development server on `http://localhost:3000`.
