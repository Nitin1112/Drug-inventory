import { useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle, XCircle, MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { readNotification } from "../../controllers/notification.mjs";
import { MoveLeftIcon } from "lucide-react";
import OverlayLoader from "../common/OverlayLoader";

const typeStyles = {
  warning: {
    icon: <AlertTriangle className="text-yellow-500 w-6 h-6" />,
    className: "border-yellow-400 bg-yellow-50 text-yellow-800",
    title: "Warning Alert",
  },
  success: {
    icon: <CheckCircle className="text-green-500 w-6 h-6" />,
    className: "border-green-400 bg-green-50 text-green-800",
    title: "Success Notification",
  },
  danger: {
    icon: <XCircle className="text-red-500 w-6 h-6" />,
    className: "border-red-400 bg-red-50 text-red-800",
    title: "Critical Alert",
  },
};

const SingleNotification = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const notification = location.state;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const readMeNotification = async () => {
      if (notification && notification.status == "Unread") {
        const response = await readNotification(notification._id);
        if (response.error) {
          console.log("Error reading notification:", response.error);
        } else {
          notification.status = "read";
          console.log("Notification marked as read:", response.data);
        }
      }
      setLoading(false);
    };
    readMeNotification();
  }, []);

  const renderLowStockItems = (items) => {
    if (!items || items.length === 0)
      return <span className="text-gray-500"></span>;
    return (
      <div className="mt-6">
        <h2 className="font-semibold text-gray-800 mb-2">
          Items Running Low on Stock:
        </h2>
        <ul className="list-disc list-inside space-y-1">
          {items.map((item, idx) => {
            const [itemId, qty] = item.split("|");
            return (
              <li key={idx}>
                <span className="font-medium">Item #{itemId}</span> has only{" "}
                <span className="font-medium">{qty}</span> units left.
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const renderExpiringItems = (items) => {
    if (!items || items.length === 0)
      return <span className="text-gray-500"></span>;
    return (
      <div className="mt-4">
        <h2 className="font-semibold text-gray-800 mb-2">
          Items Nearing Expiry:
        </h2>
        <ul className="list-disc list-inside space-y-1">
          {items.map((item, idx) => (
            <li key={idx}>
              <span className="font-medium">{item}</span> is nearing expiry.
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (!notification) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-gray-700">
          No Notification Available
        </h1>
        <p className="text-gray-500 mt-2">
          Please return to the dashboard to view recent updates.
        </p>
      </div>
    );
  }

  const type = typeStyles[notification.type] || typeStyles.warning;

  //   return loading && <div>Loading...</div>
  return <>
  {loading && <OverlayLoader />}
  {!loading && (
      <div className="w-full mx-auto">
        <div
          className={`rounded-xl shadow-md border-l-8 p-6 ${type.className}`}
        >
          <div className="flex flex-row items-center justify-between mb-5">
            <div className="flex items-center justify-center">
              <button
                onClick={() => navigator(-1)}
                className="mr-4 py-2 rounded text-gray-700 font-medium"
              >
                <MoveLeft />
              </button>
              {type.icon}
              <h1 className="text-xl pl-2 font-semibold">{type.title}</h1>
            </div>
            <div>
              <button
                onClick={() => navigator("/inventory/medicines")}
                className="bg-blue-600 px-8 py-2.5 rounded-sm font-semibold text-white"
              >
                View Inventory
              </button>
            </div>
          </div>

          <p className="text-lg mb-6">{notification.message}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <span className="font-semibold">Notification Time:</span>{" "}
              {notification.time}
            </div>
            <div>
              <span className="font-semibold">Created On:</span>{" "}
              {new Date(notification.createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-semibold">Inventory Reference:</span>{" "}
              {notification.inventoryId}
            </div>
            <div>
              <span className="font-semibold">Sent To User:</span>{" "}
              {notification.userId}
            </div>
          </div>
          {renderLowStockItems(notification.lowStockItems)}
          {renderExpiringItems(notification.expiringItems)}
        </div>
      </div>
    )}
    </>;
};

export default SingleNotification;
