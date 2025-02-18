import Head from "./head";
import MainLayout from "@/components/layouts/MainLayout";

import "@/app/styles/globals.scss";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <Head />
      <body>
        <MainLayout>{props.children}</MainLayout>
      </body>
    </html>
  );
}
