# SchoolsTalk

A real-time video meeting application designed for students, teachers, and parents. Built with Next.js, Clerk for authentication, and Stream for live video streaming and chat.

## Features

- **User Authentication**: Secure sign-up/sign-in using [Clerk](https://clerk.com)
- **Video Conferencing**: High-quality, low-latency video calls powered by [Stream](https://getstream.io)
- **Role-Based Access**: Different access levels and UI for Students, Teachers, and Parents
- **Interactive Chat**: Real-time messaging alongside video calls
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org)
- **Authentication**: [Clerk](https://clerk.com)
- **Streaming & Chat**: [Stream](https://getstream.io)
- **UI Library**: Tailwind CSS & shadcn/ui
- **Icons**: Lucide Icons

## Getting Started

### Prerequisites

- Node.js (>= 16.x)
- npm or yarn
- A [Clerk](https://clerk.com) account with API keys
- A [Stream](https://getstream.io) account with API keys

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/video-meeting-app.git
   cd video-meeting-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**

   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   NEXT_PUBLIC_CLERK_FRONTEND_API=<your_clerk_frontend_api>
   CLERK_API_KEY=<your_clerk_api_key>

   NEXT_PUBLIC_STREAM_API_KEY=<your_stream_api_key>
   STREAM_API_SECRET=<your_stream_api_secret>
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Sign Up / Sign In**
   - Users can register or log in via Clerk.
   - Choose a role: Student, Teacher, or Parent.

2. **Create or Join a Room**
   - Teachers can create meeting rooms.
   - Students and Parents can join existing rooms via invite links.

3. **Start Video Call**
   - Real-time video and audio streaming via Stream.
   - Interactive chat sidebar for messaging during the call.

4. **End Call**
   - Hosts (Teachers) can end the call for all participants.

## Folder Structure

```text
├── components/         # Reusable UI components
├── pages/              # Next.js pages (routes)
├── styles/             # Global and component styles
├── utils/              # Utility functions and hooks
├── public/             # Static assets (logos, icons)
├── .env.local          # Environment variables (not committed)
├── next.config.js      # Next.js configuration
└── README.md           # This file
```

## Contributing

Contributions are welcome! Please open issues or create pull requests for enhancements and bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Demo view

https://schools-talk.vercel.app/
