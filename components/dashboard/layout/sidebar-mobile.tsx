"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NavItem, MAIN_NAV_ITEMS, ADMIN_NAV_ITEMS, DOCS_NAV_ITEM } from "./nav-items"

interface MobileSidebarProps {
    isOpen: boolean
    onClose: () => void
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
    const pathname = usePathname()

    if (!isOpen) return null

    const renderNavGroup = (items: NavItem[], groupName: string) => {
        const filteredItems = items.filter(item => item.group === groupName)
        if (filteredItems.length === 0) return null

        return (
            <>
                <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {groupName}
                </div>
                {filteredItems.map((item) => (
                    <NavLink
                        key={item.href}
                        item={item}
                        pathname={pathname}
                        onClick={onClose}
                    />
                ))}
            </>
        )
    }

    return (
        <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
            <div className="fixed inset-y-0 left-0 z-40 w-64 bg-white p-4 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-2" onClick={onClose}>
                        <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary-600 to-blue-600"></div>
                        <span className="font-bold text-gray-900">Organogram</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                    </Button>
                </div>

                <nav className="grid gap-1">
                    {renderNavGroup(MAIN_NAV_ITEMS, "Main")}
                    {renderNavGroup(ADMIN_NAV_ITEMS, "Admin")}
                    {renderNavGroup([DOCS_NAV_ITEM], "Documentation")}
                </nav>
            </div>
        </div>
    )
}

function NavLink({
    item,
    pathname,
    onClick
}: {
    item: NavItem
    pathname: string
    onClick: () => void
}) {
    const Icon = item.icon
    return (
        <Link
            href={item.href}
            className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href
                    ? "bg-primary-100 text-primary-700"
                    : "text-gray-600 hover:bg-primary-50 hover:text-primary-700",
            )}
            onClick={onClick}
        >
            <Icon className="h-4 w-4" />
            {item.title}
        </Link>
    )
}