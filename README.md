# CanChannels

A React-based content management platform with user and admin interfaces, powered by Supabase.

## Features

- **User Interface**: Browse and search posts, view exclusive content
- **Admin Dashboard**: Manage posts, add/edit/delete content
- **Real-time Data**: All content is fetched from Supabase database
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Built-in theme switching

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CanChannels
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

4. Set up your Supabase database:
   - Create a new table called `posts` with the following columns:
     - `id` (uuid, primary key)
     - `title` (text, not null)
     - `subtitle` (text)
     - `content` (text)
     - `image` (text)
     - `links` (jsonb)
     - `featured` (boolean, default false)
     - `category` (text)
     - `created_at` (timestamp with time zone, default now())

5. Run the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── backend/
│   ├── supabaseClient.js    # Supabase client configuration
│   └── postsService.js      # Posts data service
├── components/
│   ├── Admin/              # Admin-specific components
│   ├── Global/             # Shared components
│   └── User/               # User-specific components
├── pages/
│   ├── Admin/              # Admin pages
│   ├── Global/             # Shared pages
│   └── User/               # User pages
├── sections/
│   └── User/               # User page sections
└── styles/
    └── global.css          # Global styles
```

## Usage

### User Interface
- Browse posts on the homepage
- Search for specific content
- View exclusive content in the showcase section
- Navigate through different categories

### Admin Interface
- Access the admin dashboard
- Add new posts with images and content
- Edit existing posts
- Delete posts
- Mark posts as featured

## Technologies Used

- React 19
- Vite
- Tailwind CSS
- DaisyUI
- Supabase
- React Router DOM

## Development

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Deva Branch : https://deva-gamma.vercel.app/
