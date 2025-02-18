import { FunctionComponent } from "react";

interface LandingLayoutProps {
  children?: any;
}

const LandingLayout: FunctionComponent<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-[calc(100vh-0px)] min-h-[calc(100vh-64px)] max-h-[calc(100vh-0px)] overflow-hidden">
      <video
        className="-z-10 absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/videos/landing-bg.mp4" type="video/mp4" />
        Your browser does not support the video.
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      <div className="z-10 flex flex-col justify-center items-center w-full h-full min-h-[calc(100vh-64px)] pt-20 pb-12 bg-tc_red overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default LandingLayout;
