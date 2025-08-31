# 🎂 Julietta’s Birthday App – Product Requirements Document (PRD)

## 1. Overview
A free, web-only app that looks like a **GoFundMe page** but instead of donating money, friends complete **tasks** (run, selfie, mood log, personal to-dos). Each completed task “donates” **symbolic dollars ($ points)** toward Julietta’s birthday dreams.  

The app will have:  
- A **landing page** with a progress bar and milestone list.  
- A **task to-do board** where users check off daily activities.  
- A **leaderboard** (“Helpers”) showing who contributed the most.  
- A **progress bar + milestone unlocks** (capybara, omakase, jeans, zoo, Amsterdam, etc.).  

**Important:** No real money is collected. All “$” are symbolic.

---

## 2. Objectives
- Celebrate Julietta’s birthday remotely with friends worldwide.  
- Encourage positive, healthy, and fun behaviors.  
- Create a sense of shared progress with milestones.  
- Keep it simple, **free**, and **trust-based** (no GPS, no payments).  

---

## 3. Target Audience
- Friends of Julietta (US, Japan, and worldwide).  
- Casual users with minimal tech friction.  
- Access via mobile browser

---

## 4. Key Features (MVP)

### Epic A: Landing & Onboarding
- **Feature:** Hero card with **progress bar**, milestone list (blur future goals), Donate CTA, and **banner “No real money.”**  
- **Feature:** Account creation with **unique nickname + password**, session stored in cookie.

### Epic B: Task System
- **Feature:** **Run task (gatekeeper)**  
  - Once/day. Modal message → “I ran” → confirm toast: “+ $10 donated 🎉.”  
  - Unlocks other tasks for the day.  
- **Feature:** **Selfie task**  
  - Once/day. Opens SMS/iMessage to Julietta’s hard-coded number.  
  - User taps **“I sent it”** to confirm → +$10.  
  - Trust-based (no file storage).  
- **Feature:** **Mood task**  
  - Once/day. Choose 😞 / 😐 / 🙂 → +$10.  
  - Stored as simple metadata.  
- **Feature:** **Personal to-dos**  
  - Add new task:  
    - First add = +$10  
    - Additional adds = +$1  
  - Check task = +$10  
  - Private to the user; not visible on leaderboard.

### Epic C: Points & Milestones
- **Feature:** Global total points shown in hero card.  
- **Feature:** Progress bar with “$X left to next milestone.”  
- **Feature:** Sequential milestones:  
  - Show current unlocked.  
  - Blur future ones.  
  - Confetti + card celebration when each milestone is hit.  

### Epic D: Leaderboard (Recent Helpers board)
- **Feature:** Recent helpers (users) by points (nickname + total).  

### Epic E: Feedback & Delight
- **Feature:** Toast after every completion (“+ $10 donated 🎉”).  
- **Feature:** Confetti + popup when milestone is unlocked.  

---

## 5. Out of Scope (MVP)
- Real payments (Stripe, PayPal).  
- GPS tracking, Strava, Apple Health, Google Fit.  
- File storage for selfies.  
- Forgot-password or email verification flows.  
- Social/community feed beyond leaderboard + recent helpers.  

---

## 6. Tech Stack
- **Frontend:** React 18 + TypeScript + Vite
- **UI:** Tailwind CSS + shadcn/ui + Radix UI + Lucide React
- **Backend/DB/Auth:** Supabase (Postgres)
- **Hosting/CI:** Lovable platform (auto-deploy from GitHub)
- **State/data fetching:** TanStack Query
- **Validation:** Zod + React Hook Form
- **Sessions:** Supabase Auth + cookies
- **Routing:** React Router DOM  

---

## 7. Database Schema (Supabase)

**Users**  
- id (uuid, pk)  
- nickname (text, unique)  
- password_hash (text)  
- created_at (timestamptz)  

**Tasks** (seeded: RUN, SELFIE, MOOD, ADD_TODO, CHECK_TODO)  
- code (text, pk)  
- title (text)  
- points (int)  
- cooldown_hours (int)  
- active (bool)  

**Task Completions**  
- id (uuid, pk)  
- user_id (uuid, fk users.id)  
- task_code (text, fk tasks.code)  
- completed_at (timestamptz)  
- meta (jsonb, optional: mood face, etc.)  

**Milestones**  
- id (serial, pk)  
- title (text)  
- threshold_points (int)  
- unlocked_at (timestamptz, null)  
- order_index (int)  

**Views**  
- Leaderboard (nickname + SUM(points))  
- Recent Helpers (last 10 completions)  
- Global total points  

---

## 8. User Flow (Basic)

1. User clicks invite link → lands on GoFundMe-style page.  
2. Sees hero card, progress bar, Donate button, “No real money” banner.  
3. Clicks **Donate** → signs up (nickname + password).  
4. Redirect to To-Do hub:  
   - Global progress bar + milestone card.  
   - Leaderboard + Recent Helpers.  
   - Task list.  
5. Sees “Run” task (gatekeeper).  
6. Clicks “Run” → modal prompt → taps **“I ran.”**  
   - Adds +$10 to global total, leaderboard, progress bar.  
   - Unlocks Selfie, Mood, Personal to-do.  
7. Completes additional tasks. Each:  
   - Adds points to leaderboard, global total.  
   - Progress bar updates with “$X left to next milestone.”  
   - Toast appears.  
8. When milestone is reached:  
   - Confetti + card pops up.  
   - Next milestone becomes active (future ones stay blurred).  

---

## 8.1 Detailed User Flow: Run Task (Gatekeeper)

### **Step-by-Step Flow:**

**Step 1: User Sees Run Task Card**
- Location: Main dashboard, prominently displayed
- Visual: Card with "Daily Run" title, "+$10" points, "once/day" indicator
- State: Shows as incomplete (play icon) or completed (checkmark)
- Action: User clicks "Start Run Task" button

**Step 2: Modal Dialog Appears**
- **Title:** "🏃‍♂️ Daily Run Check"
- **Message:** "Confirm that you ran today and are happy with your physical exercise."
- **Primary Button:** "I ran" (full-width, prominent)
- **Secondary Button:** "Cancel" (outline style)
- **Design:** Clean, centered layout with clear call-to-action

**Step 3: User Confirms Run**
- User clicks "I ran" button
- Button shows loading state: "Recording..."
- Modal remains open during processing

**Step 4: Success Feedback**
- **Toast Notification:** Appears at top-right corner
  - **Title:** "🎉 Run Completed!"
  - **Message:** "+$10 donated"
  - **Duration:** Auto-dismisses after 3 seconds
  - **Style:** Success variant (green/positive colors)

**Step 5: UI Updates**
- Modal closes automatically
- Run task card updates to completed state:
  - Checkmark icon replaces play icon
  - "Completed today" status text
  - Button disappears
  - Card becomes muted/disabled appearance
- Hero card progress bar updates with new total
- Leaderboard refreshes with new points
- Other tasks (Selfie, Mood, To-dos) become unlocked

### **Technical Requirements:**

**Frontend Components:**
- `RunTaskCard` - Main task display component
- `RunTaskModal` - Confirmation dialog component
- Toast notification system (existing)

**State Management:**
- Track completion status per user per day
- Update global points total
- Trigger milestone checks
- Update leaderboard rankings

**Database Operations:**
- Insert record in `task_completions` table
- Update user's total points
- Check for milestone unlocks
- Log activity for recent helpers feed

**Error Handling:**
- Network failure: Show error toast, keep modal open
- Duplicate submission: Prevent double-counting
- Rate limiting: Enforce once/day restriction

### **Success Criteria:**
- ✅ User can complete run task once per day
- ✅ Clear visual feedback at each step
- ✅ Points are accurately added to global total
- ✅ Other tasks unlock after run completion
- ✅ Leaderboard updates in real-time
- ✅ Toast notification confirms completion

---
- # sign-ups (unique nicknames).  
- # tasks completed (per type).  
- Total symbolic $ “donated.”  
- # milestones unlocked.  
- Daily active users (on birthday week).  

---

## 10. Risks & Mitigations
- **AI farming (bots auto-click tasks):** enforce per-task once/day cooldown in DB; store timestamps.  
- **Nickname abuse:** unique constraint; optional profanity filter later.  
- **Confusion about real money:** persistent banner disclaimer.  
- **Storage costs:** no selfie uploads in MVP.  

---

## 11. Release Plan
**Week 1**: Project setup (GitHub repo, Vercel, Supabase, schema, landing page).  
**Week 2**: Auth (nickname+password), Run task.  
**Week 3**: Selfie, Mood, To-do tasks.  
**Week 4**: Leaderboard, progress bar, milestones.  
**Week 5**: Confetti, polish copy, deploy, invite friends.  
