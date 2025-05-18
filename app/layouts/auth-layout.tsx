import type React from "react"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Background decorative elements */}
      <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-primary-100 opacity-50 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 h-[500px] w-[500px] rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
      <div className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-yellow-100 opacity-30 blur-3xl"></div>

      <div className="container relative z-10 mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-2xl glass lg:grid-cols-2">
          {/* Brand section */}
          <div className="hidden bg-gradient-to-br from-primary-600 to-blue-600 p-12 text-white lg:block">
            <div className="flex h-full flex-col">
              <div className="mb-8">
                <h1 className="text-2xl font-bold">Employee Organogram</h1>
                <p className="mt-2 text-primary-100">Visualize your organization structure</p>
              </div>

              <div className="relative mt-auto flex-1">
                <Image
                  src="/images/login/organogram.jpg"
                  alt="Organization chart illustration"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>

              <div className="mt-8">
                <p className="text-sm text-primary-100">
                  © {new Date().getFullYear()} Your Company. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Auth form section */}
          <div className="p-8 md:p-12">
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <h1 className="text-xl font-bold text-gray-900">Employee Organogram</h1>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
