import { RegisterForm } from '@/components/forms/RegisterForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = () => {
  return (
    <div className="flex h-screen max-h-screen bg-indigo-500">
      {/* ToDo: OTP verification | Passkey Modal */}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[600px]">
          <Image 
            src="/assets/icons/logo-full.svg"
            alt="Logo"
            width={1000}
            height={1000}
            className="w-fit h-10 mb-5"
          />
          <RegisterForm />
          <div className="text-14-regular flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">&copy; 2024 CarePulse . All rights reserved.</p>
            <Link href='/?admin=true' className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>

      <Image
        src='/assets/images/register-img.png'
        alt='patient onboarding'
        width={1000}
        height={1000}
        className="hidden xl:block w-full h-full object-cover"
      />
    </div>
  )
}

export default Register
