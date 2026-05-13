# 💰 Expense Tracker | Marketing Mojito Assignment

A professional, responsive, and offline-first Expense Tracker application built with Next.js 15, Tailwind CSS, and Framer Motion. This project was developed as part of a web developer intern assignment for Marketing Mojito.

![Expense Tracker Mockup](https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200&h=400)

## ✨ Features

- **📊 Smart Dashboard**: Real-time summary of total spending and active budget.
- **📝 Expense Management**: Easily add, view, and delete expenses with categorized tracking.
- **💱 Live Currency Converter**: Real-time currency conversion using the Frankfurter API (with offline fallbacks).
- **📱 Responsive Design**: Fully optimized for desktop, tablet, and mobile screens.
- **💾 Offline Persistence**: Data is automatically saved to local storage so you never lose your records.
- **🎨 Premium UI**: Sleek dark/light mode aesthetics using Tailwind CSS and Radix UI components.

## 🚀 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Deployment**: [Netlify](https://www.netlify.com/)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/expense-tracker-app.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**: Visit [http://localhost:3000](http://localhost:3000) to see the app.

## 📦 Deployment

This project is optimized for deployment on **Netlify** using Static Site Generation (SSG).

1. **Static Export**: The project is configured with `output: 'export'` in `next.config.mjs`.
2. **Configuration**: A `netlify.toml` file is included to handle the build and deployment settings automatically.
3. **Routing**: A `_redirects` file in the `public` folder ensures client-side routing works seamlessly on refresh.

To deploy, simply connect your GitHub repository to Netlify, and it will handle the rest!

## 📜 License

This project was created for the Marketing Mojito internship assignment. All rights reserved.

---

Built with ❤️ by [Your Name]
