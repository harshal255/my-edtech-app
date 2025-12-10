# 🚀 DevResource Hub

**Full-Stack Assignment for House of Edtech**

DevResource Hub is a modern, secure, and intelligent platform for developers to share, discover, and organize useful development resources.

This application goes beyond basic CRUD by integrating **AI-powered content generation**, secure **HTTP-only authentication**, and a fully responsive interface using **Next.js 16**.

🔗 **Live Deployment:** [Insert Your Vercel Link Here]
📂 **GitHub Repository:** [https://github.com/harshal255/my-edtech-app]

#### Testing User :

**username** : restartmyself@yopmail.com
**email** : Dev@123456789

---

## ✨ Key Features

### 🧠 Intelligent & Innovative

- **AI-Powered Descriptions:** Integrated **Google Gemini 2.0 Flash Lite** to automatically generate professional descriptions for resources, saving users time and enhancing content quality.
- **Smart Fallback System:** Implements a robust AI fallback strategy (Lite → Backup Models) to ensure availability even during high traffic.

### 🛡️ Secure & Robust

- **Authentication:** Custom-built secure authentication using **JWT** and **HTTP-Only Cookies** (stateless and secure against XSS).
- **Data Validation:** Strict type safety and validation using TypeScript and Server Actions.
- **Middleware Protection:** Protected routes ensure only authenticated users can access the dashboard.

### ⚡ Technical Excellence (Next.js 16)

- **Server Actions:** Utilizes Next.js 16 Server Actions for all data mutations (Create, Update, Delete) for zero-API-boilerplate efficiency.
- **Real-time UX:** Instant UI updates using `revalidatePath` and optimistic loading states.
- **Responsive UI:** Beautiful, accessible interface built with **Shadcn UI** and **Tailwind CSS**.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB (via Mongoose)
- **Styling:** Tailwind CSS, Shadcn UI, Lucide React
- **AI Integration:** Google Gemini API (Generative AI)
- **Auth:** BCrypt, JSONWebToken (JWT)
- **Notifications:** Sonner (Toast)
- **Deployment:** Vercel

---

## 🚀 Getting Started Locally

Follow these steps to run the project on your local machine.

### 1. Clone the Repository

```bash
git clone [https://github.com/harshal255/my-edtech-app.git](https://github.com/harshal255/my-edtech-app.git)
cd my-edtech-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a .env.local file in the root directory and add the following keys:
Code snippet

##### Database Connection

MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/devhub

##### Security

JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development

##### AI Integration (Google AI Studio)

GEMINI_API_KEY=your_gemini_api_key

### 4. Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

### 📂 Project Structure

```bash
    actions: Server Actions for Auth, Database, and AI logic.
    components: Reusable UI components (Shadcn + Custom Forms).
    models: Mongoose database schemas.
    lib: Database connection helper.
    app: Application pages and routes.
```

### 👤 Author Harshal

GitHub: @harshal255

LinkedIn: [https://linkedin.com/in/harshalkahar]

Built with ❤️ for the House of Edtech Fullstack Developer Assignment - Dec 2025
