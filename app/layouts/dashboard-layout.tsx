"use client"

import { DashboardHeader } from "@/components/dashboard/layout/header"
import { DesktopSidebar } from "@/components/dashboard/layout/sidebar-desktop"
import { MobileSidebar } from "@/components/dashboard/layout/sidebar-mobile"
import { useState } from "react"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary-50 via-white to-blue-50">
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1">
        <DesktopSidebar />
        <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 md:pl-64">
          <div className="container mx-auto p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}