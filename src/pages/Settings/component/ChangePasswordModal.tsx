import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetUser, useUpdateUser } from "@/lib/query"; // make sure you have useGetUser
import { toast } from "sonner";

export default function ChangePasswordModal() {
  const navigate = useNavigate();
  const { data } = useGetUser();
  const user = data?.user;

  const { mutateAsync: updateUser, isPending } = useUpdateUser();
  const [newPassword, setNewPassword] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!user) {
      toast.error("User not loaded yet");
      return;
    }

    try {
      // include all required fields
      await updateUser({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: oldPassword, // current password
        oldPassword,
        newPassword
      });

      toast.success("Password updated successfully!");
      navigate("/settings");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to update password");
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 max-sm:px-3">
      <div className="bg-white rounded-2xl shadow-lg w-[420px] p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>
          <button className="text-black hover:text-black" onClick={() => navigate("/settings")}>
            <X size={20} />
          </button>
        </div>

        {/* Current Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter current password"
          />
        </div>

        {/* New Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter new password"
          />
        </div>

        <div className="text-right">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className={`bg-[#FF7442] hover:bg-[#FF5619] text-white font-medium rounded-md px-5 py-2 transition ${
              isPending ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
