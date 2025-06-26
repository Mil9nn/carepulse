"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AppointmentForm } from "./forms/AppointmentForm";
import { Appointment } from "@/types/appwrite.types";

export const AppointmentModal = ({
  type,
  patientId,
  userId,
  appointment,
  title,
  description
}: {
  type: "schedule" | "cancel";
  patientId: string;
  userId: string;
  appointment?: Appointment;
  title?: string;
  description?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className={`cursor-pointer ${
              type === "schedule" ? "text-green-400" : "text-red-400"
            } capitalize`}
          >
            {type}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-dark-200 border-none shadow-lg">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {description}
            </DialogDescription>
          </DialogHeader>

          <AppointmentForm
            userId={userId}
            patientId={patientId}
            type={type}
            appointment={appointment}
            setOpen={setOpen}
          />
        </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
