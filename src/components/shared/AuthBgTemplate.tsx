import { ReactNode } from "react";
import twoGuys from "/assets/twoAuthGuys.svg";

interface AuthBgTemplateProps {
  children: ReactNode;
}

const AuthBgTemplate = ({ children }: AuthBgTemplateProps) => {
  return (
    <div className="flex min-h-full bg-white p-4">
      {/* Left image section */}
      <div className="hidden md:flex w-1/2 items-center justify-center flex-1">
        <img src={twoGuys} alt="Two guys working" className="" />
      </div>

      {/* Right form section */}
      <div className="flex w-full md:w-1/2 justify-center p-2">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthBgTemplate;
