# CampusBeacon 🚀

CampusBeacon is a premium, AI-powered full-stack web application designed to help students navigate their campus with ease. It features an intelligent AI assistant, task-based navigation, interactive smart maps, and a specialized "First Day Mode" for freshers.

## ✨ Features

- **🤖 AI Campus Assistant:** Chat with an intelligent bot to get instant info on locations, timings, and procedures.
- **🗺️ Smart Campus Map:** Interactive Leaflet-based map with custom markers and building details.
- **📋 Task-Based Navigation:** Search for tasks (like "ID card issuance") and get step-by-step guidance on where to go and what documents to bring.
- **🏁 First Day Mode:** A curated checklist for new students to handle onboarding without stress.
- **🔍 Explore Campus:** Discover top-rated study spots, cafeterias, and sports facilities.
- **🚨 Lost Mode:** One-tap assistance for when you're lost on campus.
- **💎 Premium UI:** Modern glassmorphism design with smooth Framer Motion animations and dark mode aesthetics.

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router), Tailwind CSS, Framer Motion
- **Backend:** Next.js API Routes
- **Database:** Firebase Firestore (Setup ready)
- **AI:** Google Gemini API
- **Maps:** Leaflet.js & OpenStreetMap
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- NPM or Bun

### Installation

1. Clone the repository or navigate to the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your API keys:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `src/app`: Next.js pages and API routes.
- `src/components`: Reusable UI components.
- `src/data`: Mock data for campus locations and tasks.
- `src/lib`: Utility functions and SDK initializations (Firebase, Gemini).
- `src/hooks`: Custom React hooks.

## 📄 License

MIT
