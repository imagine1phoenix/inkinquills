# HH Goa 2026 | ID Generator

An immersive, fully client-side identity card generator built for the HH Goa 2026 Hackathon. It allows builders to create beautiful, personalized, shareable ID cards with a rich "Goa Sunset" aesthetic, completely in the browser without any backend database or authentication requirements.

## 🌟 Features

- **Immersive Aesthetic**: Sunset gradients, glassmorphism UI, animated ocean waves, and swaying palm tree silhouettes for that true Goa vibe.
- **Real-time Canvas Rendering**: The ID card is drawn on a `<canvas>` element, updating instantly as the user types their details or adjusts their photo.
- **Smart Title Generation**: Typing a role (e.g. "React") automatically assigns a cool builder title (e.g. "UI Sorcerer"). Users can reroll this using the magic wand icon.
- **Privacy-First Photo Upload**: Photos are processed, resized, and cropped entirely on the client side using `heic2any` (for iPhone photos) and Canvas APIs. No images are sent to a server.
- **Drag-and-drop & Photo Controls**: Upload a photo by dragging it in, then precisely scale and pan it within the card.
- **Export & Sharing**: Download the generated card as a high-quality PNG with a celebratory confetti burst, or share directly to X (Twitter) via an edge API route that generates Open Graph tags.
- **Interactive 3D Tilt**: The card preview reacts to mouse movement using Framer Motion spring physics, complete with an environmental glare effect.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (spring physics, layout animations)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Image Processing**: Native HTML5 Canvas + `heic2any` (for HEIC support)

## 🚀 Upcoming Features (In Progress)

- **Team Name**: Add your hackathon team name to the card.
- **Card Customization**: Choose between different themes (Sunset, Midnight, Neon) and background textures (Grid, Scanlines, Dots).
- **Unique Barcode & Serial Number**: A deterministic serial number and barcode generated specifically for you to make the card feel authentic.

## 💻 Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## 📱 Browser Compatibility

- Fully responsive layout that scales down to mobile screens.
- Works perfectly on iOS Safari (HEIC image uploads are supported and converted on the fly).

## 🔒 Data Privacy

This app operates entirely without a database. All image processing and rendering happens in the user's browser. The only server interaction is an optional `/api/upload` endpoint used temporarily to host the image on Vercel Blob storage *only* if the user chooses to "Share to X", so that Twitter can read the Open Graph meta tags.
