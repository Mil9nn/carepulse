"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "../forms/constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";
import { Appointment } from "@/types/appwrite.types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-medium-14">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-medium-14">{appointment.patient.name}</p>;
    },
  },
  {
    accessorKey: "schedule",
    header: "Date",
    cell: ({ row }) => {
      return (
        <p className="text-medium-14">
          {formatDateTime(row.original.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusBadge status={row.original.status} />;
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="flex items-center gap-2">
          {Doctors.map((doctor) =>
            doctor.name === appointment.primaryPhysician ? (
              <Image
                key={doctor.name}
                src={doctor.image}
                alt={doctor.name}
                width={24}
                height={24}
              />
            ) : (
              ""
            )
          )}
          <p className="text-medium-14">{appointment.primaryPhysician}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex">
            <AppointmentModal 
            type='schedule'
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title="Schedule Appointment"
            description="Please fill in the following detais to schedule"
             />
            <AppointmentModal
            type='cancel'
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title="Cancel Appointment"
            description="Are you sure you want to cancel this appointment"
             />
        </div>
      );
    },
  },
];
