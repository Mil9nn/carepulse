import { Doctors } from "@/components/forms/constants";
import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const success = async ({ params, searchParams }: { params: Promise<{userId: string}>; searchParams: Promise<{ appointmentId: string }> }) => {
  const { appointmentId = "" } = await searchParams;
  const appointment = await getAppointment(appointmentId);
  const { userId } = await params;

  const doctor = Doctors.find(
    (doc) => doc.name === appointment?.primaryPhysician
  );

  return (
    <div className="flex items-center justify-center h-screen max-h-screen px-[5%]">
      <div className="success-img space-y-3">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={300}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-1">
            <Image
              src={doctor?.image || "/assets/icons/doctor.svg"}
              alt={doctor?.name || "Doctor"}
              width={25}
              height={25}
            />
            <p className="whitespace-nowrap text-sm">Dr. {doctor?.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p className="text-sm"> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="copyright">© 2024 CarePulse</p>
      </div>
    </div>
  );
};

export default success;
