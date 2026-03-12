# Buy From Africa (BFA)

A B2B/B2C e-commerce marketplace connecting African vendors with global buyers. Built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

## Features

### For Buyers
- Browse products by category
- Search and filter products
- Save favorite products to wishlist
- Request quotes from vendors
- Place orders and track status
- Real-time messaging with vendors

### For Vendors
- Complete storefront management
- Product inventory management (CRUD)
- Order management and fulfillment
- Customer relationship management
- Analytics dashboard
- Customizable store branding (logo, banner, description)
- Payment and shipping configuration

### For Admins
- User management
- Vendor verification
- CMS for homepage content
- Financial management (invoices, quotes, currencies)
- Platform analytics

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **File Storage:** MinIO (S3-compatible)
- **Real-time:** LiveKit (video calls)

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- MinIO server (for file uploads)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/gbabudoh/bfa.git
cd bfa
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/bfa"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# MinIO Configuration
MINIO_ENDPOINT="your-minio-endpoint"
MINIO_PORT="9000"
MINIO_ACCESS_KEY="your-access-key"
MINIO_SECRET_KEY="your-secret-key"
MINIO_BUCKET_NAME="bfa-storage"

# LiveKit (optional - for video calls)
LIVEKIT_API_KEY="your-livekit-key"
LIVEKIT_API_SECRET="your-livekit-secret"
LIVEKIT_URL="wss://your-livekit-url"
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

6. Seed the database (optional):
```bash
npx prisma db seed
```

7. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── buyer/             # Buyer dashboard
│   ├── vendor/            # Vendor dashboard
│   └── ...
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
├── types/                 # TypeScript type definitions
└── generated/             # Prisma generated client
```

## User Roles

- **BUYER** - Can browse, purchase, and manage orders
- **VENDOR** - Can manage storefront, products, and orders
- **ADMIN** - Can manage users and platform settings
- **SUPER_ADMIN** - Full platform access

## License

This project is proprietary software.

## Contact

For inquiries, please contact the development team.
