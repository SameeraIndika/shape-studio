import React from "react";

import { Oval } from "react-loader-spinner";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-tc_black bg-opacity-40 z-50">
      <Oval
        height="80"
        width="80"
        color="rgba(255, 255, 255, 0.50)"
        secondaryColor="rgba(255, 255, 255, 0.25)"
        ariaLabel="loading"
      />
    </div>
  );
};

export default PageLoader;
