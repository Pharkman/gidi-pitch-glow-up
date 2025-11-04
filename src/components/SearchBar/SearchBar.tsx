import { useState, useEffect } from "react";
import FaSearch from "../../../public/assets/FaSearch.png";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value.trim());
    }, 400); // debounce delay
    return () => clearTimeout(handler);
  }, [value]);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="flex items-center gap-2 bg-white border border-[#DBDBDB] rounded-[12px] w-[229px] h-[44px] px-4 py-2">
      <img src={FaSearch} alt="Search" className="w-4 h-4 opacity-70" />
      <input
        type="text"
        placeholder="Search decks..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full outline-none border-none text-sm text-[#333] font-medium placeholder-[#858585] bg-transparent"
      />
    </div>
  );
}
