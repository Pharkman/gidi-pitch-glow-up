// components/AuthBgTemplate.tsx
import { ReactNode } from "react";
import twoGuys from "/assets/twoAuthGuys.svg";

interface AuthBgTemplateProps {
  children: ReactNode;
}

const AuthBgTemplate = ({ children }: AuthBgTemplateProps) => {
  return (
    <div className="flex min-h-screen bg-white p-4">
      {/* Left image section */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-50">
        <img
          src={twoGuys}
          alt="Two guys working"
          className="max-w-full h-full"
        />
      </div>

      {/* Right form section */}
      <div className="flex w-full md:w-1/2 justify-center p-2">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthBgTemplate;
