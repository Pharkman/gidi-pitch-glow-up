import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetUser, useUpdateUser } from "@/lib/query";
import { toast } from "sonner";

export default function ChangeNameModal() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetUser();
  const user = data?.user;

  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");

  React.useEffect(() => {
    if (user) {
      setFirstname(user.firstname || "");
      setLastname(user.lastname || "");
    }
  }, [user]);

  const { mutateAsync: updateUser, isPending } = useUpdateUser();

  const handleSubmit = async () => {
    if (!firstname.trim() || !lastname.trim()) {
      toast.error("Both first and last name are required.");
      return;
    }

    try {
      await updateUser({ firstname, lastname });
      toast.success("Name updated successfully!");
      navigate("/settings");
    } catch (error) {
      toast.error("Failed to update name");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 max-sm:px-3">
      <div className="bg-white rounded-2xl shadow-xl w-[420px] p-6 border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-800">Change name</h2>
          <button
            className="text-gray-500 hover:text-gray-700 transition"
            onClick={() => navigate("/settings")}
          >
            <X size={20} />
          </button>
        </div>

        {/* First name */}
        <div className="mb-4">
          <label
            htmlFor="firstname"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            First name
          </label>
          <input
            id="firstname"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            placeholder="Enter your first name"
          />
        </div>

        {/* Last name */}
        <div className="mb-6">
          <label
            htmlFor="lastname"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Last name
          </label>
          <input
            id="lastname"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            placeholder="Enter your last name"
          />
        </div>

        {/* Footer actions */}
        <div className="text-right">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className={`bg-gradient-to-r from-[#FF7442] to-[#FF5619] text-white font-medium rounded-md px-6 py-2 transition-all duration-200 shadow-sm ${
              isPending
                ? "opacity-70 cursor-not-allowed"
                : "hover:shadow-md hover:scale-[1.02]"
            }`}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
