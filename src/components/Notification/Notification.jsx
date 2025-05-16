import { useEffect } from "react";
import { useState } from "react";
import { getAllNotification } from "../../controllers/notification.mjs";
import { useNavigate } from "react-router-dom";

// const notifications = [
//   {
//     id: 1,
//     title: "Low Stock Alert",
//     message: "Paracetamol stock is below the minimum threshold.",
//     time: "2 mins ago",
//     type: "warning",
//   },
//   {
//     id: 2,
//     title: "New Shipment Arrived",
//     message: "Ibuprofen shipment has been added to inventory.",
//     time: "10 mins ago",
//     type: "success",
//   },
//   {
//     id: 3,
//     title: "Expiry Alert",
//     message: "Aspirin batch expires in 7 days.",
//     time: "1 hour ago",
//     type: "danger",
//   },
// ];

const typeStyles = {
  warning: "border-yellow-400 bg-yellow-50 text-yellow-800",
  success: "border-green-400 bg-green-50 text-green-800",
  danger: "border-red-400 bg-red-50 text-red-800",
  normal: "border-gray-400 bg-gray-50 text-gray-800",
  info: "border-blue-400 bg-blue-50 text-blue-800",
};

const Notification = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const navigator = useNavigate();

  const handleDoubleClick = (note) => {
    navigator(note._id + "/view", { state: note });
  };

  useEffect(() => {
    setLoading(true);
    const fetchNotifications = async () => {
      const response = await getAllNotification();
      console.log(response);
      const data = response.data;
      for (const note of data) {
        const date = new Date(note.createdAt);
        const options = { hour: "2-digit", minute: "2-digit" };
        note.time = date.toLocaleString("en-US", options);
        note.type = note.type.toLowerCase();
      }
      setNotifications(data);
      setLoading(false);
    };
    fetchNotifications();
  }, []);

  const getUnreadNotificationCount = () => {
    return notifications.filter((note) => note.status === "Unread").length;
  };

  return (
    !loading && (
      <div className="w-full  rounded-lg shadow-lg bg-white">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Notifications</h2>
          {getUnreadNotificationCount() != 0 && (
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-sm font-bold">
              {getUnreadNotificationCount()}
            </span>
          )}
        </div>
        <ul className="divide-y">
          {notifications.map((note) => (
            <li
              key={note._id}
              onClick={() => handleDoubleClick(note)}
              className={`cursor-pointer flex flex-col gap-1 px-6 py-4 border-l-4 
              ${typeStyles[note.type]}`}
            >
              <div className="font-medium">{note.title}</div>
              <div className="text-sm">{note.message}</div>
              <div className="text-xs text-gray-500">{note.time}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Notification;
