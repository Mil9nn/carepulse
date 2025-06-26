import { DataTable } from "@/components/table/DataTable";
import StatCard from "@/components/StatCard";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { columns } from "@/components/table/columns";

const AdminPage = async () => {

  const appointments = await getRecentAppointmentList();

  return (
    <div className="overflow-y-auto h-full remove-scrollbar">
      <header className="admin-header w-full">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            width={100}
            height={100}
            alt="logo"
            className="w-fit h-8"
          />
        </Link>
       <div className="flex items-center gap-2">
        <Image 
          src="/assets/images/admin.png"
          alt="Admin Avatar"
          width={25}
          height={25}
          className="rounded-full object-cover border border-gray-300"
         />
         <p className="text-16-semibold">Admin</p>
       </div>
      </header>

      <main className="p-5 space-y-5">
        <div className="space-y-3 mb-5">
          <h2 className="text-2xl font-bold text-white mb-1">Welcome, Admin</h2>
          <p className="text-gray-300 font-light">
            Manage your upcoming appointments listed below.
          </p>
        </div>
        <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard
            iconSrc="/assets/icons/appointments.svg"
            iconAlt="Calendar Icon"
            count={appointments.scheduledCount}
            description="Total number of scheduled appointments"
          />
          <StatCard
            iconSrc="/assets/icons/pending.svg"
            iconAlt="Calendar Icon"
            count={appointments.pendingCount}
            description="Total number of pending appointments"
          />
          <StatCard
            iconSrc="/assets/icons/cancelled.svg"
            iconAlt="Calendar Icon"
            count={appointments.cancelledCount}
            description="Total number of cancelled appointments"
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default AdminPage;
