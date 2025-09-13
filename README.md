# 🎂 Julietta's Birthday App

A fun, task-based milestone tracker that helps friends contribute to Julietta's 24th birthday dreams! Complete daily tasks to unlock symbolic donations and help make birthday wishes come true.

## 🌟 What is this?

Think GoFundMe meets gamification! Instead of asking for real money, friends complete fun daily tasks (like running, taking selfies, logging mood) to earn symbolic "dollars" that contribute to Julietta's birthday wishlist. Each completed task unlocks the next milestone goal.

## ✨ Features

### 🎯 **Task-Based Donations**
- **Daily Run** (Gatekeeper) - Complete to unlock all other tasks (+$50)
- **Post-Workout Selfie** - Send a selfie to Julietta (+$50)
- **Mood Check** - Log your daily mood with emojis (+$50)
- **Personal To-Do** - Add items to your personal task list (+$50)
- **Weather Log** - Share what the weather's like where you are (+$50)

### 🏆 **Milestone System**
- **$50** - Pet a capybara 🦫
- **$100** - Be brave and curious ✨
- **$300** - Learn to sew and make clothes 👗
- **$500** - Travel to visit at least 3 friends worldwide ✈️
- **$750** - Get yoga teacher certification 🧘‍♀️
- **$1000** - Move to NYC 🗽

### 👥 **Community Features**
- **All Helpers Board** - See everyone who's contributed
- **Real-time Progress** - Watch the total grow as friends complete tasks
- **Personal Dashboard** - Track your own contributions and progress

## 🚀 Live Demo

**Production URL:** https://julietta0903-24-dmp1szrnq-juliettas-projects.vercel.app

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui components
- **Backend:** Supabase (Database + Authentication)
- **Deployment:** Vercel
- **Icons:** Lucide React
- **Notifications:** Sonner

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── HeroCard.tsx    # Main hero section with carousel
│   ├── TaskCard.tsx    # Individual task components
│   ├── MilestoneCard.tsx # Goal/milestone display
│   └── RecentHelpersCard.tsx # Community contributors
├── pages/              # Main application pages
│   ├── Landing.tsx     # Public landing page
│   ├── Index.tsx       # Authenticated dashboard
│   └── Auth.tsx        # Login/signup page
├── integrations/       # External service integrations
│   └── supabase/       # Database and auth setup
└── contexts/           # React context providers
    └── AuthContext.tsx # Authentication state
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/juliettazlt/julietta-tasks-for-dreams.git
   cd julietta-tasks-for-dreams
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   Run the migration scripts in `supabase/migrations/`:
   - `001_create_user_progress_tables.sql`
   - `002_add_user_name_field.sql`

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎮 How It Works

### User Flow
1. **Landing Page** → See the fundraiser overview and goals
2. **Sign Up/Login** → Create account with your name
3. **Dashboard** → Complete the "Daily Run" task to unlock others
4. **Task Completion** → Each task earns $50 toward the total
5. **Milestone Unlocking** → Watch goals unlock as the total grows
6. **Community** → See all helpers and their contributions

### Task System
- **Gatekeeper Logic:** Must complete "Daily Run" first to unlock other tasks
- **One-time Completion:** Each task can only be completed once per user
- **Real-time Updates:** Progress syncs across all users instantly
- **Persistent Data:** Your progress is saved and restored on login
- **Interactive Modals:** Each task has custom completion flows (mood selection, weather logging, etc.)

## 🎨 Design Philosophy

**Clean Notes App Aesthetic:**
- Light, minimal backgrounds
- Subtle shadows and clean cards
- Orange accent colors
- Modern, friendly typography
- Mobile-first responsive design

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Components

**HeroCard** - Main landing section with image carousel and progress display
**TaskCard** - Individual task with completion logic and modals
**MilestoneCard** - Goal tracking with unlock animations
**RecentHelpersCard** - Community contributors with scrollable list

## 🚀 Deployment

The app is automatically deployed to Vercel on every push to main branch.

**Manual deployment:**
```bash
vercel --prod
```

## 🤝 Contributing

This is a personal birthday project, but feel free to:
- Report bugs or issues
- Suggest new features
- Fork for your own birthday celebrations!

## 📱 Mobile Support

Fully responsive design optimized for:
- Mobile phones (primary use case)
- Tablets
- Desktop browsers

## 🎉 Special Features

- **SMS Integration** - Selfie task opens native messaging app with pre-filled message
- **Image Carousel** - Rotating background images on hero section
- **Smooth Animations** - Unlock animations and transitions
- **Toast Notifications** - Real-time feedback for task completion
- **Scroll Navigation** - Smooth scrolling between sections
- **Interactive Task Modals** - Custom completion flows for each task type
- **Mood & Weather Logging** - Visual selection interfaces with emojis
- **Locked Task System** - Tasks unlock progressively after completing the gatekeeper

## 📄 License

This project is for personal use. Feel free to use as inspiration for your own birthday celebrations!

---

**Made with ❤️ for Julietta's 24th Birthday**

*Help make birthday dreams come true, one task at a time!* 🎂✨