import React from "react";
import { X } from "lucide-react";
import { useGetUser } from "@/lib/query";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUser();
  const user = data?.user;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg font-medium">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 max-sm:p-0">
      <div className="w-full max-w-3xl bg-white rounded-[10px] shadow-md px-5 py-6 sm:px-8 sm:py-8 transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#2D2D2D] mb-2 sm:mb-3">
            Settings
          </h2>
          <X
            size={22}
            className="text-black hover:text-primary cursor-pointer transition-all duration-200"
            onClick={() => navigate("/dashboard")}
          />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10">
          {/* Profile Image */}
          <div className="flex flex-col items-center sm:items-start sm:w-[25%]">
            <div className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-semibold shadow-inner">
              {`${user?.firstname?.[0]?.toUpperCase() || ""}${
                user?.lastname?.[0]?.toUpperCase() || ""
              }`}
            </div>
            <p className="text-[#000000] text-[15px] font-semibold mt-2 cursor-pointer hover:text-primary transition">
              Change
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 w-full sm:w-[75%]">
            {/* Name */}
            <div>
              <p className="text-[#1D1D1D] text-[15px] sm:text-[16px] font-medium mb-1">
                Name
              </p>
              <div className="border border-[#DBDBDB] shadow-sm w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 px-4 py-3 rounded-md">
                <p className="text-[#1D1D1D] text-[15px] truncate">
                  {user?.firstname && user?.lastname
                    ? `${user.firstname} ${user.lastname}`
                    : "—"}
                </p>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary transition-all duration-200 w-full sm:w-auto"
                  onClick={() => navigate("/change-name")}
                >
                  Change name
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <p className="text-[#1D1D1D] text-[15px] sm:text-[16px] font-medium mb-1">
                Email
              </p>
              <div className="border border-[#DBDBDB] shadow-sm w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 px-4 py-3 rounded-md">
                <p className="text-[#1D1D1D] text-[15px] truncate">
                  {user?.email || "—"}
                </p>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary transition-all duration-200 w-full sm:w-auto"
                  onClick={() => navigate("/change-email")}
                >
                  Update email
                </button>
              </div>
            </div>

            {/* Plan */}
            <div>
              <p className="text-[#1D1D1D] text-[15px] sm:text-[16px] font-medium mb-1">
                Current Plan
              </p>
              <div className="border border-[#DBDBDB] shadow-sm w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 px-4 py-3 rounded-md">
                <p className="text-[#1D1D1D] text-[15px]">Free Plan</p>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary transition-all duration-200 w-full sm:w-auto"
                >
                  Upgrade
                </button>
              </div>
            </div>

            {/* Password */}
            <div>
              <p className="text-[#1D1D1D] text-[15px] sm:text-[16px] font-medium mb-1">
                Password
              </p>
              <div className="border border-[#DBDBDB] shadow-sm w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 px-4 py-3 rounded-md">
                <p className="text-[#1D1D1D] text-[15px]">********</p>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary transition-all duration-200 w-full sm:w-auto"
                  onClick={() => navigate("/change-password")}
                >
                  Change password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
