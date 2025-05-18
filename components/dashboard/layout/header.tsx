"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserDropdown } from "./user-dropdown"


interface DashboardHeaderProps {
    onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-primary-100 bg-white/80 px-4 backdrop-blur-md sm:px-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary-600 to-blue-600"></div>
                    <span className="font-bold text-gray-900">Organogram</span>
                </Link>
            </div>
            <UserDropdown />
        </header>
    )
}