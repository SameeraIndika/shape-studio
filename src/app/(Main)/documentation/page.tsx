"use client";

import React, { useEffect, useState } from "react";

import PageLoader from "@/components/spinners/PageLoader";
import CodeBlock from "@/components/custom/CodeBlock";

export default function Documentation() {
  const [showPageLoader, setShowPageLoader] = useState(true);

  // Show page loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPageLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showPageLoader) {
    return <PageLoader />;
  }

  return (
    <div className="relative flex flex-col w-full gap-y-6 px-5 py-4 rounded-lg bg-tc_black bg-opacity-40">
      <h2 className="flex w-full font-semibold text-xl text-tc_accent capitalize">
        Documentation
      </h2>
      <p className="flex w-full font-normal text-15 text-tc_muted">
        This documentation will guide you through the steps to clone the Shape
        Studio web application from GitHub and set it up locally on your
        machine.
      </p>

      {/* Prerequisites */}
      <section className="flex flex-col w-full h-fit gap-y-4 p-5 rounded-lg bg-tc_black/40">
        <h3 className="flex w-full font-medium text-lg text-tc_accent capitalize">
          Prerequisites
        </h3>
        <p className="flex w-full font-normal text-15 text-tc_muted">
          Before you begin, make sure you have the following installed on your
          local machine:
        </p>
        <ul className="list-disc flex flex-col w-full gap-y-2 ml-8 pr-4 font-normal text-15 text-tc_muted">
          <li>
            <strong>Node.js (Recommended version: v16.x or higher)</strong>
            <br />
            <p className="w-full gap-x-1 font-normal text-15 text-tc_muted">
              You can download Node.js from the official website:
              <a
                href="https://nodejs.org/en"
                target="_blank"
                className="mx-1 text-tc_custom-purple"
                style={{ overflowWrap: "anywhere" }}
              >
                https://nodejs.org/en
              </a>
            </p>
          </li>
          <li>
            <strong>Git</strong>
            <br />
            <p className="w-full gap-x-1 font-normal text-15 text-tc_muted">
              Ensure that Git is installed on your system to clone the
              repository. You can download Git from:
              <a
                href="https://git-scm.com/"
                target="_blank"
                className="mx-1 text-tc_custom-purple"
                style={{ overflowWrap: "anywhere" }}
              >
                https://git-scm.com/
              </a>
            </p>
          </li>
          <li>
            <strong>Code Editor</strong>
            <br />
            <p className="w-full gap-x-1 font-normal text-15 text-tc_muted">
              It’s recommended to use a code editor like
              <a
                href="https://code.visualstudio.com/"
                target="_blank"
                className="mx-1 text-tc_custom-purple"
                style={{ overflowWrap: "anywhere" }}
              >
                https://code.visualstudio.com/
              </a>
              for a better development experience.
            </p>
          </li>
        </ul>
      </section>

      {/* Repo Cloning */}
      <section className="flex flex-col w-full h-fit gap-y-4 p-5 rounded-lg bg-tc_black/40">
        <h3 className="flex w-full font-medium text-lg text-tc_accent capitalize">
          Step 1: Clone the GitHub Repository
        </h3>
        <p className="flex w-full font-normal text-15 text-tc_muted">
          Start by cloning the GitHub repository to your local machine using
          Git. Open your terminal/command prompt and run the following command:
        </p>
        <CodeBlock
          code="git clone https://github.com/SameeraIndika/shape-studio.git"
          language={"javascript"}
        />
        <p className="flex w-full font-normal text-15 text-tc_muted">
          After cloning, navigate to the project folder:
        </p>
        <CodeBlock code="cd shape-studio" language={"javascript"} />
      </section>

      {/* Install Project Dependencies */}
      <section className="flex flex-col w-full h-fit gap-y-4 p-5 rounded-lg bg-tc_black/40">
        <h3 className="flex w-full font-medium text-lg text-tc_accent capitalize">
          Step 2: Install Project Dependencies
        </h3>
        <p className="flex w-full font-normal text-15 text-tc_muted">
          Next, install all the required dependencies for the project. Make sure
          you&apos;re in the project directory, and run:
        </p>
        <CodeBlock code="npm install" language={"javascript"} />
        <p className="flex w-full font-normal text-15 text-tc_muted">
          Or if you are using Yarn:
        </p>
        <CodeBlock code="yarn install" language={"javascript"} />
        <p className="flex w-full font-normal text-15 text-tc_muted">
          This will download all the necessary packages listed in the
          package.json file.
        </p>
      </section>

      {/* Run the Development Server */}
      <section className="flex flex-col w-full h-fit gap-y-4 p-5 rounded-lg bg-tc_black/40">
        <h3 className="w-full font-medium text-lg text-tc_accent capitalize">
          Step 3: Run the Development Server
        </h3>
        <p className="w-full font-normal text-15 text-tc_muted">
          To start the Next.js development server, run the following command:
        </p>
        <CodeBlock code="npm install" language={"javascript"} />
        <p className="w-full font-normal text-15 text-tc_muted">
          Or if you are using Yarn:
        </p>
        <CodeBlock code="yarn dev" language={"javascript"} />
        <p className="w-full font-normal text-15 text-tc_muted">
          This will start the server on{" "}
          <a
            href="http://localhost:3000"
            target="_blank"
            className="text-tc_custom-purple"
          >
            http://localhost:3000
          </a>
          . Open this URL in your browser, and you should see your application
          running locally!
        </p>
      </section>
    </div>
  );
}
