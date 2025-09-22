
# Umeedo AI

[![Umeedo Logo](path/to/umeedo_logo.png)](path/to/umeedo_logo.png)  
*Your mental wellness companion – A confidential, empathetic AI for youth mental health.*

---

## Table of Contents
- [Overview](#overview)  
- [Problem Statement](#problem-statement)  
- [Solution](#solution)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Getting Started](#getting-started)  
- [Screenshots](#screenshots)  
- [License](#license)  

---

## Overview

**Umeedo** is a web-based AI-powered mental wellness companion designed to support Indian youth.  
This project is developed as a **solution for the Google GenAI Exchange Hackathon 2025**, addressing the challenge of youth mental wellness in India.  

It provides a safe, confidential, and empathetic space for emotional expression, mood tracking, and mental health guidance.  

The current MVP allows users to:  
- Chat with **Umeedo**, an AI companion.  
- Log and track moods using the **Mood Compass** feature.  
- Access Privacy, Terms, and Contact information pages.  

⚠️ **MVP Limitation:** Only “Chat with Me” and “Mood Compass” features are currently available.


---

## Problem Statement

Mental health remains a significant societal taboo in India, creating barriers for young adults and students seeking support. Challenges include:  

- Limited confidential outlets for mental health concerns  
- High cost and limited accessibility of professional help  
- Social stigma associated with seeking mental health support  

**Objective:** Leverage generative AI to provide accessible, culturally sensitive, and impactful mental wellness solutions for youth.  

---

## Solution

Umeedo leverages **Google Cloud's Generative AI** to:  

- Provide empathetic conversations and emotional support  
- Track moods and emotional trends with Mood Compass  
- Offer guided exercises to promote relaxation and mindfulness  
- Facilitate access to licensed therapists (future implementation)  

It acts as a confidential companion to help users pause, reflect, and improve emotional well-being.

---

## Features

**Available in MVP:**  
| Feature | Description | Status |
|---------|-------------|--------|
| Chat with Me | Conversational AI for mental wellness support | ✅ Available |
| Mood Compass | Log feelings & track emotional journey | ✅ Available |
| Calm Minutes | Short exercises to relax mind | ⚠️ Coming Soon |
| Mind Gym | Fun exercises to boost focus & reduce stress | ⚠️ Coming Soon |
| Stress Escape Mini-Games | Interactive mini-games for stress relief | ⚠️ Coming Soon |
| Motivation Cards | Inspiring messages to lift mood | ⚠️ Coming Soon |

---

## Tech Stack

**Frontend:**  
- React 19  
- React Router DOM  
- Lottie React (for animations)  
- Recharts (for mood tracking visualizations)  
- CSS / Component-based styling  

**Backend:**  
- Node.js & Express  
- Google Cloud Generative AI  
- Firebase (Authentication & Firestore)  
- CORS  

**Build & Deployment:**  
- Vite (Frontend bundler)  
- Netlify / Vercel (Hosting)

---

## Project Structure

```
UMEEDO-AI
│
├─ client/               # Frontend
│  ├─ public/            # Public assets (favicon, redirects)
│  ├─ src/
│  │  ├─ assets/         # Images, icons, animations
│  │  ├─ components/     # React components (ChatWindow, Hero, Sidebar, etc.)
│  │  ├─ context/        # React Context (ChatContext)
│  │  ├─ firebase/       # Firebase config & initialization
│  │  └─ pages/          # Page components (Landing, Chat, MoodTracker, Privacy, Terms, Contact)
│  ├─ package.json
│  └─ vite.config.js
│
├─ server/               # Backend
│  ├─ config/            # Gemini / AI configs
│  ├─ index.js           # Express server entry
│  ├─ package.json
│  └─ .env               # Environment variables
```

---

## Project Architecture


## Getting Started

### Prerequisites
- Node.js ≥ 20  
- npm / yarn  

### Setup Frontend
```bash
cd client
npm install
npm run dev
```

### Setup Backend
```bash
cd server
npm install
npm run dev
```

> Open the frontend at `http://localhost:5173` and backend at your configured port.  

---

## Screenshots

**Landing Page:**  
![Landing Page Placeholder](path/to/landing_page_screenshot.png)

**Chat Window:**  
![Chat Window Placeholder](path/to/chat_window_screenshot.png)

**Mood Compass:**  
![Mood Compass Placeholder](path/to/mood_compass_screenshot.png)

**Privacy, Terms, Contact Pages:**  
![Privacy Page Placeholder](path/to/privacy_page_screenshot.png)

> Replace placeholders with actual images/screenshots.

---

## License

© 2025 **Umeedo**. Prototype for **GenAI Exchange Hackathon 2025**.  
All rights reserved.  
