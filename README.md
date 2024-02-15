# WIP README.md

# Running the Next.js App - Quick Start Manual

## Prerequisites

1. [Node.js](https://nodejs.org/) installed on your machine.
2. A code editor (e.g., Visual Studio Code, Sublime Text).
3. Check whether you have installed all these packages:
   - sass (https://www.npmjs.com/package/sass)
   - sass-loader (https://www.npmjs.com/package/sass-loader)
   - css-loader (https://www.npmjs.com/package/css-loader)
   - style-loader(https://www.npmjs.com/package/style-loader)

## Steps

### 1. Clone the Repository

Open a terminal and navigate to the directory where you want to clone the repository. Run the following command to clone the repository:

```bash
git clone https://github.com/SE-Nex-Tech/Nex.Tech.git
```

### 2. Install dependencies

This command installs the necessary Node.js modules specified in the package.json file.

npm:
```bash
npm install
```

yarn:
```bash
yarn
```

### 3.1 Run the server in development mode

Start the development server with the following command:

npm:
```bash
npm run dev
```

yarn:
```bash
yarn dev
```

> Note: development mode is not the optimized version of the app; waiting times will be slow. Build the app instead if you don't need to debug the source code.

### 3.2 Build the app and run the server

Enter the commands for

npm:
```bash
npm run build
npm run start
```

yarn:
```bash
yarn build
yarn start
```

### 4. Access the App

Open a web browser and navigate to http://localhost:3000. You should see the Next.js app running locally.

Any changes you make to the code will automatically trigger hot reloading, so you can see updates without restarting the server.

### 6. Stop the server

To stop the development server, go back to the terminal where it's running and press Ctrl + C.
