# SpaceShare - On-Demand Co-Working Space Platform

SpaceShare is a modern web application that connects workspace owners with professionals seeking flexible office spaces. Similar to Airbnb but specifically designed for co-working spaces, it allows users to find and book professional workspaces by the hour, day, week, or month.

## Features

### For Users
- 🔍 Advanced Search: Find spaces by location, date, and time
- 🗺️ Interactive Map: View available spaces in your desired area
- ⭐ Favorites: Save spaces you're interested in for later
- 📅 Flexible Booking: Book spaces by hour, day, week, or month
- 💳 Secure Payments: Safe and easy transaction processing
- 📱 Responsive Design: Perfect experience on any device

### For Hosts
- 📍 Space Listing: Advertise your workspace with detailed information
- 📸 Photo Management: Showcase your space with high-quality images
- 📊 Dashboard: Manage bookings and view analytics
- 💰 Revenue Management: Track earnings and manage pricing

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Authentication**: NextAuth.js
- **Database**: Prisma with SQLite
- **Styling**: Tailwind CSS
- **UI Components**: 
  - Shadcn UI
  - Radix UI Primitives
- **State Management**: Zustand
- **Icons**: Lucide Icons

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/iDevMode/SpaceShare.git
cd SpaceShare
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # App router pages and layouts
│   ├── (auth)/         # Authentication routes
│   ├── (dashboard)/    # Protected dashboard routes
│   ├── api/            # API routes
│   └── search/         # Search functionality
├── components/         # Reusable components
│   ├── common/         # Shared components
│   ├── layout/         # Layout components
│   └── map/           # Map-related components
├── lib/               # Utilities and configurations
│   ├── config/        # Configuration files
│   ├── store/         # Zustand store
│   └── utils/         # Helper functions
└── styles/            # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern co-working space platforms
- Built with best practices in React and Next.js
- Implements responsive and accessible design patterns
