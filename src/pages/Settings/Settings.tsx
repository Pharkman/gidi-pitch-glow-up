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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-semibold text-[#1D1D1D]">
              Account Settings
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage your personal information and security
            </p>
          </div>

          <X
            size={22}
            className="text-gray-500 hover:text-primary cursor-pointer transition"
            onClick={() => navigate("/dashboard")}
          />
        </div>

        {/* Content */}
        <div className="px-6 py-8 space-y-10">
          
          {/* Profile */}
          <div className="flex items-center gap-6">
            <div className="w-[96px] h-[96px] rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-semibold">
              {`${user?.firstname?.[0]?.toUpperCase() || ""}${user?.lastname?.[0]?.toUpperCase() || ""}`}
            </div>

            <div>
              <p className="text-lg font-semibold text-[#1D1D1D]">
                {user?.firstname} {user?.lastname}
              </p>
              <p className="text-sm text-gray-500">{user?.email}</p>

              <button className="mt-2 text-sm text-primary font-medium hover:underline">
                Change profile photo
              </button>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            
            {/* Name */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-200 rounded-xl px-5 py-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="text-base font-medium text-[#1D1D1D]">
                  {user?.firstname} {user?.lastname}
                </p>
              </div>

              <button
                className="text-sm font-medium text-primary hover:underline self-start sm:self-auto"
                onClick={() => navigate("/change-name")}
              >
                Edit
              </button>
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-200 rounded-xl px-5 py-4">
              <div>
                <p className="text-sm text-gray-500">Email address</p>
                <p className="text-base font-medium text-[#1D1D1D]">
                  {user?.email}
                </p>
              </div>

              <button
                className="text-sm font-medium text-primary hover:underline self-start sm:self-auto"
                onClick={() => navigate("/change-email")}
              >
                Update
              </button>
            </div>

            {/* Plan */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-200 rounded-xl px-5 py-4">
              <div>
                <p className="text-sm text-gray-500">Current plan</p>
                <p className="text-base font-medium text-[#1D1D1D]">
                  Free Plan
                </p>
              </div>

              <button className="text-sm font-medium text-primary hover:underline self-start sm:self-auto">
                Upgrade
              </button>
            </div>

            {/* Password */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-200 rounded-xl px-5 py-4">
              <div>
                <p className="text-sm text-gray-500">Password</p>
                <p className="text-base font-medium text-[#1D1D1D]">
                  ••••••••
                </p>
              </div>

              <button
                className="text-sm font-medium text-primary hover:underline self-start sm:self-auto"
                onClick={() => navigate("/change-password")}
              >
                Change
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
