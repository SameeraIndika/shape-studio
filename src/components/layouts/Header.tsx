"use client";

import React, { useState } from "react";
import Link from "next/link";

import { AlignJustify } from "lucide-react";

import Logo from "./Logo";
import { Button } from "../buttons/Button";

import { NAV_LINKS } from "@/utils/Constants";

const Header = () => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-10 flex w-full justify-between items-center gap-4 px-4 md:px-6 lg:px-8 bg-tc_black shadow-md">
        <div className="flex justify-between items-center w-full gap-x-24 py-2">
          <div className="flex justify-between items-center w-full gap-x-4">
            <div className="flex items-center w-40 md:w-48">
              <Logo />
            </div>
            <div className="md:hidden">
              <Button
                icon={AlignJustify}
                onClick={() => {
                  setIsMobileMenuVisible((prev) => !prev);
                }}
              />
            </div>
          </div>
          <div className="hidden md:flex items-center w-fit gap-x-16">
            {NAV_LINKS.map((item, index) => (
              <Link
                key={index}
                className="font-medium text-15 text-nowrap text-tc_white hover:text-tc_accent transition-all duration-200 ease-linear"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
      {isMobileMenuVisible && (
        <div className="fixed top-16 mt-2.5 z-10 md:hidden flex flex-col w-full h-fit gap-y-8 p-6 bg-tc_black">
          {NAV_LINKS.map((item, index) => (
            <Link
              key={index}
              className="font-medium text-15 text-nowrap text-tc_white hover:text-tc_accent transition-all duration-200 ease-linear"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
