# Holiday Manager (Work in Progress 🚧)

A modern Employee Leave Management System (SaaS) designed to streamline holiday requests, approvals, and team availability tracking.

## 🚀 Live Preview
- **URL:** [https://holidaymanager.vercel.app/](https://holidaymanager.vercel.app/)
- *Note: This project is currently under active development (approx. 20% complete).*

## 💡 The Vision
The goal of Holiday Manager is to replace messy spreadsheets with a clean, automated dashboard where:
- **Employees** can easily request leaves and check their remaining balance.
- **Managers** can oversee team availability through an interactive calendar and approve/reject requests with one click.
- **Administrators** can manage company structures, public holidays, and user roles.

## 🛠 Tech Stack (Target)
- **Frontend:** Next.js (App Router), React, JavaScript (ES6+)
- **UI Library:** Mantine UI / Tailwind CSS (for modern, accessible interface)
- **State Management:** React Context API / TanStack Query
- **Backend:** Node.js / Next.js API Routes
- **Database:** MongoDB (Mongoose) / PostgreSQL
- **Authentication:** NextAuth.js (supporting Google/GitHub OAuth and Credentials)

## 📈 Current Progress & Features
- [x] Initial Project Architecture & Routing (Next.js App Router).
- [x] Core UI Layout and Navigation (Mantine UI integration).
- [x] Basic Dashboard Interface.
- [ ] User Authentication & Role-Based Access (In Progress).
- [ ] Leave Request Workflow & Calendar View.
- [ ] Admin Management Panel.

## 🏗 Engineering Goals
- **Scalability:** Designing a multi-tenant architecture.
- **Data Integrity:** Ensuring complex date-range logic for overlapping leave requests.
- **UX Focus:** Building a highly intuitive, "zero-training" interface for employees.

## 🛠 Installation & Setup (Local)
1. Clone the repository: `git clone https://github.com/RafalSprengel/holiday-manager`
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
