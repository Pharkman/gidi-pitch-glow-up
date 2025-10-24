import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetUser, useUpdateUser } from "@/lib/query";
import { toast } from "react-toastify";

export default function ChangeEmailModal() {
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
    const [email] = name.split(" ");
    try {
      await updateUser({ email });
      toast.success("Email updated successfully!");
      navigate("/settings");
    } catch (error) {
      toast.error("Failed to update email");
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 max-sm:px-3">
      <div className="bg-white rounded-2xl shadow-lg w-[420px] p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-800">Update Email</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="text"
            defaultValue={user?.email}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="text-right">
          <button disabled className="bg-[#FF7442] hover:bg-[#FF5619] text-white font-medium rounded-md px-5 py-2 transition">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
