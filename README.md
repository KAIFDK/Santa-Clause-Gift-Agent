# 🎄 Santa Christmas Workshop

A monorepo containing an interactive **3D Christmas Tree experience** and **Santa’s AI-powered Gift Assistant**. Built with modern web technologies, this project demonstrates 3D rendering, modular frontends, and a simple AI-backed chat system.

---

## ✨ Features

- Interactive **3D Christmas Tree** using Three.js  
- Camera rotation & scene interaction  
- Embedded **Santa’s Gift Assistant** (AI chatbot via iframe)  
- Monorepo architecture (frontend + backend)  
- Modern, responsive UI with reusable components  

---

## 🗂 Project Structure

├── backend/ # Node.js + Express API
├── holiday-sparkle-button-main/ # UI component showcase
├── santa-s-gift-assistant-main/ # Santa AI chat frontend
├── src/ # Main React 3D app source
└── package.json


---

## 🧰 Tech Stack

### Frontend
- React 18  
- TypeScript  
- Vite  
- Three.js  
- Tailwind CSS  
- shadcn/ui & Radix UI  
- TanStack React Query  

### Backend
- Node.js  
- Express.js  
- Supabase  
- dotenv & CORS  

---

## ⚙️ Prerequisites

- Node.js **v16+**
- npm or yarn
- Git

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd santa-christmas-workshop

### 2. Install dependencies
npm install
cd backend && npm install && cd ..


(Optional sub-projects)

cd holiday-sparkle-button-main && npm install && cd ..
cd santa-s-gift-assistant-main && npm install && cd ..

▶️ Running the Project

Open three terminals:

Backend API
cd backend
npm run dev


Runs on http://localhost:3001

Main 3D Christmas Tree App
npm run dev


Runs on http://localhost:5173

Santa’s Gift Assistant
cd santa-s-gift-assistant-main
npm run dev


Runs on http://localhost:5175

🧪 Usage

Open http://localhost:5173

Explore the 3D Christmas tree

Rotate the camera using UI controls

Open Santa’s Gift Assistant

Ask Santa for gift suggestions

🔌 Environment Variables

Create a .env file inside backend/:

PORT=3001
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

🏗 Build
npm run build


For sub-projects:

cd santa-s-gift-assistant-main && npm run build
cd holiday-sparkle-button-main && npm run build

📄 License

See license.txt for license details.

🙌 Author

Zaheer Bt
Full Stack Developer | React | Three.js | Node.js

