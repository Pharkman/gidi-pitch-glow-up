import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetTransaction } from "@/lib/query";
import { useEffect, useState } from "react";

const NotificationButton = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTransaction({ page: 1, pageSize: 10 });

  const transactions = data?.data?.transactions || [];
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  useEffect(() => {
    if (!isLoading && transactions.length > 0) {
      const lastViewed = localStorage.getItem("lastNotificationViewedAt");
      const latestCreatedAt = transactions[0]?.createdAt;

      if (!lastViewed || new Date(latestCreatedAt) > new Date(lastViewed)) {
        // ✅ There are new notifications
        setHasNewNotifications(true);
      } else {
        setHasNewNotifications(false);
      }
    }
  }, [transactions, isLoading]);

  const handleNavigate = () => {
    // Mark notifications as viewed
    localStorage.setItem("lastNotificationViewedAt", new Date().toISOString());
    setHasNewNotifications(false);
    navigate("/notification");
  };

  return (
    <button
      className="sm:flex items-center justify-center p-2 rounded-full bg-gray-50 hover:bg-[#FFF3EF] hover:text-[#FF5619] border border-gray-200 transition-all duration-300 relative"
      onClick={handleNavigate}
    >
      <Bell className="h-5 w-5" />
      {hasNewNotifications && (
        <span className="absolute top-0 right-1 block h-2.5 w-2.5 bg-[#FF5619] rounded-full"></span>
      )}
    </button>
  );
};

export default NotificationButton;
