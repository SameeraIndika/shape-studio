## DOCUMENTATION

This documentation will guide you through the steps to clone the Shape Studio web application from GitHub and set it up locally on your machine.

## Prerequisites

Before you begin, make sure you have the following installed on your local machine:

• Node.js (Recommended version: v16.x or higher)
You can download Node.js from the official website: https://nodejs.org/en

• Git
Ensure that Git is installed on your system to clone the repository. You can download Git from: https://git-scm.com/

• Code Editor
It’s recommended to use a code editor like https://code.visualstudio.com/ for a better development experience.

## Step 1: Clone the GitHub Repository

Start by cloning the GitHub repository to your local machine using Git. Open your terminal/command prompt and run the following command:

```bash
git clone https://github.com/SameeraIndika/shape-studio.git
```

After cloning, navigate to the project folder:

```bash
cd shape-studio
```

## Step 2: Install Project Dependencies

Next, install all the required dependencies for the project. Make sure you're in the project directory, and run:

```bash
# npm
npm install
# yarn:
yarn install
```

This will download all the necessary packages listed in the package.json file.

## Step 3: Run the Development Server

To start the Next.js development server, run the following command:

```bash
# npm
npm run dev
# yarn
yarn dev
```

This will start the server on http://localhost:3000. Open this URL in your browser, and you should see your application running locally!
