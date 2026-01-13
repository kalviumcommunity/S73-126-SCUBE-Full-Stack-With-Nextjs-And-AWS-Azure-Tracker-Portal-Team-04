# S73-126-SCUBE-Full-Stack-With-Nextjs-And-AWS-Azure-Tracker-Portal-Team-04

Here is your content **properly converted into a clean, professional GitHub `README.md`** using correct **Markdown syntax**.
You can **copy-paste this directly into `README.md`** — GitHub will render it perfectly.

---

# Internship Portal – Database Schema Design

This document describes the relational database schema designed for the **Internship Portal** project using **PostgreSQL** and **Prisma ORM**. The goal of this schema is to support scalable data storage, strong data integrity, and efficient querying for a full-stack **Next.js** application.

---

## Overview

The database schema models core entities required for managing users, projects, tasks, and discussions within the portal. Prisma ORM is used to define models, manage migrations, and interact with the PostgreSQL database in a type-safe manner.

---

## Core Entities

### User

Represents users of the application, including interns, mentors, and administrators.

* Each user has a unique email
* A user can be associated with multiple projects
* A user can be assigned multiple tasks

---

### Project

Represents an internship or work project.

* Each project can have multiple tasks
* Projects are associated with one or more users

---

### Task

Represents individual units of work within a project.

* Each task belongs to one project
* Tasks can be assigned to a user
* Tasks can have multiple comments

---

### Comment

Represents feedback or discussion related to a task.

* Each comment belongs to one task
* Used for progress updates and mentorship feedback

---

## Relationships

* **User → Project**: One-to-many
* **Project → Task**: One-to-many
* **Task → Comment**: One-to-many

Foreign keys are used to enforce referential integrity.
Cascading delete rules ensure dependent data is cleaned up automatically.

---

## Constraints & Indexes

* Primary keys are defined for all tables
* Unique constraint applied on user email
* NOT NULL constraints enforce required fields
* Indexes are added on frequently queried fields such as:

  * User email
  * Foreign keys (`projectId`, `userId`, `taskId`)

---

## Prisma ORM & Migrations

Prisma is used to manage the database schema and migrations.

### Migration Command

```bash
npx prisma migrate dev --name init_schema
```

This command creates all required tables and applies constraints in PostgreSQL.

---

## Seed Data

Seed data was added to verify schema correctness and relationships.

* Sample users, projects, tasks, and comments
* Relationships verified using Prisma Studio

### Prisma Studio

```bash
npx prisma studio
```

---

## Normalization & Design Choices

The schema follows **1NF, 2NF, and 3NF** principles:

* No repeating groups or multi-valued fields
* No partial dependencies
* No transitive dependencies

This ensures minimal redundancy and consistent data storage.

---

## Scalability Reflection

If the database needed to support **10× more users and data**, the following design choices would help scale efficiently:

* Indexed foreign keys for faster joins
* Normalized schema to reduce duplication
* Clear entity boundaries for easier sharding or read replicas
* Prisma migrations enabling safe schema evolution

---

## Conclusion

This database design provides a strong foundation for the Internship Portal application. It ensures data integrity, supports future scalability, and integrates seamlessly with the Next.js backend using Prisma ORM.

---

