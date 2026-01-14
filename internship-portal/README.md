This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




Project 2.8

# Internship & Mentorship Portal

This project is a unified portal designed to help college students
track internship applications and mentorship feedback in one place.

## Folder Structure

src/
├── app/
│   └── Routes and pages using Next.js App Router (TSX)
├── components/
│   └── Reusable UI components written in TSX
├── lib/
│   └── Utility functions, helpers, and configuration files

## Why This Structure?

- Clear separation of concerns
- Improves maintainability and readability
- Enables parallel development in teams
- Scales well for future sprints

## Setup Instructions

1. Install dependencies:
   npm install

2. Start the development server:
   npm run dev

3. Open in browser:
   http://localhost:3000

## Reflection

This structure provides a strong foundation for future development.
By separating routing, components, and utilities, the team can scale
the application efficiently while maintaining clean and organized code.

## Screenshot

![Local App Running](./screenshot.png)


## 📘 API & System Documentation

### API Documentation
- Tool: Postman Collection
- Version: v1.0.0
- Base URL: http://localhost:3000
- Authentication: JWT (Bearer Token)
- Location: docs/postman_collection.json

### Architecture Documentation
- File: ARCHITECTURE.md
- Describes system design, data flow, security, and CI/CD

### Documentation Workflow
- API changes require Postman update
- Architecture changes require README + ARCHITECTURE.md update

### Reflection
Maintaining structured API and system documentation improves onboarding, reduces integration errors, and ensures long-term maintainability.
