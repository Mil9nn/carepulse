import Image from "next/image";
import React from "react";

type StatCardProps = {
    iconSrc: string;
    iconAlt: string;
    count: number;
    description: string;
}

const StatCard = ({ iconSrc, iconAlt, count, description }: StatCardProps) => {
  return (
    <div className="stats-card">
      <div className="flex items-center gap-2">
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={100}
          height={100}
          className="w-fit h-8"
        />
        <p className="text-3xl font-semibold">{count}</p>
      </div>
      <p className="text-sm text-dark-700">{description}</p>
    </div>
  );
};

export default StatCard;
