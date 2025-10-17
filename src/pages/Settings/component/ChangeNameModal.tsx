import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetUser, useUpdateUser } from "@/lib/query"; // ✅ make sure this path matches your setup
import { toast } from "sonner";


export default function ChangeNameModal() {
const navigate = useNavigate();
const [name, setName] = React.useState("");
const { data, isLoading } = useGetUser();
const user = data?.user;


React.useEffect(() => {
  if (user) {
    setName(`${user.firstname} ${user.lastname}`);
  }
}, [user]);
  
  const { mutateAsync: updateUser, isPending } = useUpdateUser();
  console.log("Update",updateUser);

  



  const handleSubmit = async () => {
    const [firstname, lastname] = name.split(" ");
    try {
      await updateUser({ firstname, lastname });
      toast.success("Name updated successfully!");
      navigate("/settings");
    } catch (error) {
      toast.error("Failed to update name");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
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

        {/* Input field */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            placeholder="Enter your new name"
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
