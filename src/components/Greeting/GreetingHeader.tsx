
const GreetingHeader = ({ username }) => {
  // Function to determine greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const greeting = getGreeting();

  return (
    <h2
      className="
        text-[18px] font-bold tracking-tight text-gray-900
        sm:text-[18px] md:text-[18px] max-sm:text-[16px]
        capitalize leading-tight mb-2
      "
    >
      {username ? `${greeting}, ${username}` : greeting}
    </h2>
  );
};

export default GreetingHeader;
