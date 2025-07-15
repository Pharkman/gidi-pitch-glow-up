const TitleHeader = ({ title }:{title:string}) => {
    return (
      <div className="flex flex-col items-center mb-4 gap-5 shadow-2xl bg-white rounded-lg  w-[10%] justify-center mx-auto">
        <div className="">
          <h1 className="font-medium py-3 rounded-lg md:text-[14px] text-xs text-center">
            {title}
          </h1>
        </div>
      </div>
    );
  };
  
  export default TitleHeader;