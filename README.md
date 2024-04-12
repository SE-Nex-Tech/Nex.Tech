# README.md

# Running the Next.js App - Quick Start Manual

## Prerequisites

1. [Node.js](https://nodejs.org/), [Git](https://git-scm.com/downloads), and [PostgreSQL](https://www.postgresql.org/) installed on your machine.
2. A code editor (e.g., Visual Studio Code, Sublime Text).

## Steps

### 1. Clone the Repository

Open a terminal and navigate to the directory where you want to clone the repository. Run the following command to clone the repository:

```bash
git clone https://github.com/SE-Nex-Tech/Nex.Tech.git
```

### Make sure you are under the repository directory before proceeding to the next steps.

Go to the main branch and fetch the latest changes.
```bash
git checkout main
git pull
```

### 2. Install dependencies

This command installs the necessary Node.js modules specified in the package.json file.

```bash
yarn #or yarn install
```

### 3. PostgreSQL Setup

In the .env file, change DATABASE_URL based on your personal setup.

### 4. Populate using Prisma

**Delete prisma/migrations folder**.
Then, run the following commands:
```bash
npx prisma migrate dev #then y, then name it as seed
npx prisma db seed
node prisma/request_seed.js
```

### 5.1 Build the app and run the server (recommended for non-developers)

Enter the commands:
```bash
yarn build
yarn start
```

### OR

### 5.2 Run the server in development mode

Start the development server with the following command:

```bash
yarn dev
```

> Note: development mode is not the optimized version of the app; waiting times will be slow. Build the app instead if you don't need to debug the source code.

### 6. Access the App

Open a web browser and navigate to http://localhost:3000. You should see the Next.js app running locally.

Any changes you make to the code will automatically trigger hot reloading, so you can see updates without restarting the server.

### Optional Step: Access Prisma Studio (For Database Checking)
Run this command on a different terminal:
```bash
npx prisma studio
```
Prisma Studio will be accessible at http://localhost:5432.
