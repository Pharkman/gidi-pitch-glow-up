import FaSearch from '../../../public/assets/FaSearch.png'
export default function SearchBar() {
  return (
    <div className="flex items-center gap-2 bg-white border border-[#DBDBDB] rounded-[12px] w-[229px] h-[44px] px-4 py-2">
      <img src={FaSearch} alt="SEARCH"/>
      <input
        type="text"
        placeholder="Search"
        className="w-full outline-none border-none text-sm text-[#858585] font-semibold placeholder-[#858585] bg-transparent"
      />
    </div>
  );
}
