"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface LogoProps {
  isCollapse?: boolean;
}

const Logo = ({ isCollapse = false }: LogoProps) => {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      {isCollapse == false ? (
        <Image
          onClick={() => router.push("/")}
          src="/site-logo.png"
          height="160"
          width="460"
          alt="logo"
          className="cursor-pointer"
        />
      ) : (
        <Image
          onClick={() => router.push("/")}
          src="/site-logo.png"
          height="80"
          width="230"
          alt="logo"
          className="block md:hidden cursor-pointer"
        />
      )}
    </div>
  );
};

export default Logo;
