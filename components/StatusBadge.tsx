import Image from "next/image";
import React from "react";

type Status = "scheduled" | "pending" | "cancelled";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
}) => {
  const statusConfig = {
    scheduled: {
      iconSrc: "/assets/icons/check.svg",
      text: "Scheduled",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
    },
    pending: {
      iconSrc: "/assets/icons/pending.svg",
      text: "Pending",
      textColor: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
    },
    cancelled: {
      iconSrc: "/assets/icons/cancelled.svg",
      text: "Cancelled",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-100",
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <div
      className={`inline-flex items-center px-3 py-1.5 rounded-full border ${currentStatus.bgColor} ${currentStatus.borderColor} ${className}`}
    >
      <Image
        src={currentStatus.iconSrc}
        alt={"${status} icon"}
        width={16}
        height={16}
        className="inline-block mr-2"
      />
      <span className={`text-sm ${currentStatus.textColor}`}>
        {currentStatus.text}
      </span>
    </div>
  );
};

export default StatusBadge;
