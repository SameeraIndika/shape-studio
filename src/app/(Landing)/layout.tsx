import Head from "./head";
import LandingLayout from "@/components/layouts/LandingLayout";

import "@/app/styles/globals.scss";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <Head />
      <body>
        <LandingLayout>{props.children}</LandingLayout>
      </body>
    </html>
  );
}
