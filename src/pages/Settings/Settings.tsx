import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGetUser } from "@/lib/query";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

export default function Settings() {
    const navigate = useNavigate()
  const { data, isLoading } = useGetUser();
  const user = data?.user;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <p className="text-gray-600 text-lg font-medium">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="w-full max-w-xl bg-white rounded-[24px] shadow-md px-5 py-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-semibold text-[#2D2D2D] mb-3">Settings</h2>
           <X size={20} className="text-black hover:text-black text-xl cursor-pointer" onClick={() => navigate("/dashboard")} />

        </div>

        {/* Profile Image and Change Button */}
        <div className="flex gap-10">
          <div className="flex flex-col items-center w-[18%]">
  {/* Profile Initials Circle */}
  <div className="w-[80px] h-[80px] rounded-full bg-[#FFECE5] flex items-center justify-center text-[#FF5619] text-[28px] font-semibold">
    {`${data?.user?.firstname?.[0]?.toUpperCase() || ""}${data?.user?.lastname?.[0]?.toUpperCase() || ""}`}
  </div>

  <p className="text-[#000000] text-[15px] font-semibold mt-2 cursor-pointer hover:text-[#FF5619]">
    Change
  </p>
</div>


          {/* Form Fields */}
          <div className="space-y-4 w-[82%]">
            {/* Name */}
            <div>
              <p className="text-[#1D1D1D] text-[16px] font-medium mb-1">Name</p>
              <div className="border border-[#DBDBDB] shadow-sm w-full flex justify-between items-center px-4 py-2 rounded-md">
                <p className="text-[#1D1D1D] text-[15.5px]">
                  {user?.firstname && user?.lastname
                    ? `${user.firstname} ${user.lastname}`
                    : "—"}
                </p>
                <button className="bg-[#FF5619] text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600" onClick={() => navigate("/change-name")}>

                  Change name
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <p className="text-[#1D1D1D] text-[16px] font-medium mb-1">Email</p>
              <div className="border border-[#DBDBDB] shadow-sm w-full flex justify-between items-center px-4 py-2 rounded-md">
                <p className="text-[#1D1D1D] text-[15.5px]">{user?.email || "—"}</p>
                <button className="bg-[#FF5619] text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600" onClick={() => navigate("/change-email")}>
                  Update email
                </button>
              </div>
            </div>

            {/* Current Plan */}
            <div>
              <p className="text-[#1D1D1D] text-[16px] font-medium mb-1">Current Plan</p>
              <div className="border border-[#DBDBDB] shadow-sm w-full flex justify-between items-center px-4 py-2 rounded-md">
                <p className="text-[#1D1D1D] text-[15.5px]">Free Plan</p>
                <button className="bg-[#FF5619] text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600">
                  Upgrade
                </button>
              </div>
            </div>

            {/* Password */}
            <div>
              <p className="text-[#1D1D1D] text-[16px] font-medium mb-1">Password</p>
              <div className="border border-[#DBDBDB] shadow-sm w-full flex justify-between items-center px-4 py-2 rounded-md">
                <p className="text-[#1D1D1D] text-[15.5px]">********</p>
                <button className="bg-[#FF5619] text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600" onClick={() => navigate("/change-password")}>

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
