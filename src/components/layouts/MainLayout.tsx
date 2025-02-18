import { FunctionComponent } from "react";

import Header from "./Header";

interface MainLayoutProps {
  children?: any;
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-0px)] min-h-[calc(100vh-64px)] max-h-[calc(100vh-0px)] overflow-hidden bg-tc_primary">
      <Header />
      <div className="flex w-full h-[calc(100vh-0px)] min-h-[calc(100vh-64px)] max-h-[calc(100vh-0px)] pt-14 pb-4">
        <div className="flex flex-col w-full h-full min-h-[calc(100vh-50px)] px-5 pt-12 pb-5 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
