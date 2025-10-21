import { Sparkles, ArrowUpRight } from "lucide-react";

export default function EditWithAIButton() {
  return (
    <div className="flex items-center justify-between w-full px-4 py-5 bg-white hover:shadow-sm cursor-pointer transition">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-gray-700" />
        <span className="text-[15px] font-semibold text-black ">Edit with AI</span>
      </div>
      <ArrowUpRight className="w-5 h-5 text-black" />
    </div>
  );
}
