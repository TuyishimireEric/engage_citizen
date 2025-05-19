# 🗣️ myVoice – Citizen Engagement Platform

[![Deployed on Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-%2300C7B7?logo=netlify)](https://your-myvoice.netlify.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-blue?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org)
[![React Query](https://img.shields.io/badge/React%20Query-5.0-pink?logo=react)](https://tanstack.com/query/latest)
[![Supabase](https://img.shields.io/badge/Supabase-2.0-green?logo=supabase)](https://supabase.io)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT4-brightgreen?logo=openai)](https://platform.openai.com)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

A community-driven platform empowering citizens to report public issues and interact with local governance through AI-enhanced multilingual communication.

## 🌍 Live Demo

➡️ [myVoice](https://myvoiceciti.netlify.app/)

## 📹 Images

### Landing page
![image](https://github.com/user-attachments/assets/8c18bf44-8e4e-4a6f-9be7-b5e83f20bada)
![image](https://github.com/user-attachments/assets/bb585cf9-414d-437f-9d86-b2fbbced8ff2)
![image](https://github.com/user-attachments/assets/1afa3d20-d92c-4f5f-81d1-bddfe565fabd)

### Add a complaint
![image](https://github.com/user-attachments/assets/713ae21f-c0fe-4900-a0f9-97531bedc4c2)
![image](https://github.com/user-attachments/assets/bd04da75-a114-4e1c-80af-9236bf852cdc)

### Public Complaints
![image](https://github.com/user-attachments/assets/dee02c26-d7ad-48a1-9be1-40c901324739)

### Track Complaint
![image](https://github.com/user-attachments/assets/ab586e84-424c-41cd-9a91-5c74ad89a69b)


### Auth
![image](https://github.com/user-attachments/assets/ebc87d41-332a-45c2-a9f3-ebf384d32bdd)
![image](https://github.com/user-attachments/assets/cfd9f9b2-166a-4f29-b583-b48b273cf08a)

### Dashboard
![image](https://github.com/user-attachments/assets/e9961309-8f0c-450a-a89c-1b3dfe45446a)

![image](https://github.com/user-attachments/assets/9e61d6a6-4e8c-468a-9052-a3664dbb329d)




## ✨ Key Features

- **Multilingual Complaint Submission**  
  Submit complaints in multiple languages (Kinyarwanda, English, etc.)
  
- **AI-Powered Processing**  
  GPT-4 for automatic summarization, categorization, and clarity enhancement

- **Real-time Data Management**  
  Supabase backend with instant updates and secure storage

- **Advanced Search & Filtering**  
  Find issues by location, category, or keywords

- **Responsive Dashboard**  
  Clean UI with interactive maps and data visualization

- **Secure Authentication**  
  Email/password and social login options

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router, Server Components)
- **TypeScript** (Type-safe development)
- **Tailwind CSS** (Utility-first styling)
- **React Query v5** (Data fetching and state management)
- **React Hook Form** (Form management)
- **Zod** (Schema validation)

### Backend
- **Supabase** (PostgreSQL database, authentication, storage)
- **OpenAI API** (GPT-4 for text processing)
- **Netlify Functions** (Serverless API routes)

### Infrastructure
- **Netlify** (Hosting and CI/CD)
- **Supabase Storage** (File uploads)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PNPM (recommended)
- Supabase account
- OpenAI API key
- Netlify account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/myvoice.git
   cd myvoice
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Then fill in your keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   OPENAI_API_KEY=your_openai_key
   ```

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 📂 Project Structure

```
myvoice/
├── app/                   # Next.js app router
│   ├── (public)/          # Public routes
│   ├── (admin)/           # admin routes
│   ├── api/               # API routes
├── components/            # Reusable UI components
├── config/                # App configuration
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── providers/             # Context providers
├── styles/                # Global styles
├── types/                 # TypeScript types
└── public/                # Static assets
```

## 🚀 Deployment with Netlify

### Automatic Deployment (Recommended)
1. Push your code to a GitHub/GitLab repository
2. Sign in to Netlify
3. Click "Add new site" → "Import an existing project"
4. Connect your Git provider and select the repository
5. Configure build settings:
   - Build command: `pnpm build`
   - Publish directory: `.next`
6. Add environment variables in Netlify UI (same as `.env.local`)
7. Click "Deploy site"

### Manual Deployment
1. **Build your project:**
   ```bash
   pnpm build
   ```
2. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```
3. **Deploy to Netlify:**
   ```bash
   netlify deploy --prod
   ```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the excellent backend services
- OpenAI for their powerful language models
- Netlify for seamless deployment
- All our contributors and beta testers

---

Made with ❤️ by TUYISHIMIRE ERIC | Let's make communities better together!
