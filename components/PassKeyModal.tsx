"use client";

import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { decryptKey, encryptKey } from "@/lib/utils";

const PassKeyModal = () => {
  const router = useRouter();
  const path = usePathname();

  const [open, setOpen] = useState(true);
  const [passkey, setPassKey] = useState("");
  const [error, setError] = useState("");

  const encryptedKey = typeof window !== 'undefined' ? window.localStorage.getItem("accessKey") : 'null';

  useEffect(() => {
    if(path) {
      const accessKey = encryptedKey && decryptKey(encryptedKey);
       if(accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      setOpen(false);
      router.push("/admin");
    } else {
      setError("Invalid passkey. Please try again.");
      setPassKey("");
      setOpen(true);
    }
    }
  }, [path, encryptedKey, router]);
  

  const validatePassKey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if(passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem("accessKey", encryptedKey)
      setError("");
      setOpen(false);
      router.push("/admin");
    } else {
      setError("Invalid passkey. Please try again.");
      setPassKey("");
    }
  };
  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            Admin access verification
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={() => {
                closeModal();
              }}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin panel, please verify your identity using a
            passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPassKey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>

          <p className="shad-error text-regular-14 flex items-center">
            {error}
          </p>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePassKey(e)}
            className="shad-primary-btn"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModal;
