"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NavItem, MAIN_NAV_ITEMS, ADMIN_NAV_ITEMS, DOCS_NAV_ITEM } from "./nav-items"

export function DesktopSidebar() {
    const pathname = usePathname()

    const renderNavGroup = (items: NavItem[], groupName: string) => {
        const filteredItems = items.filter(item => item.group === groupName)
        if (filteredItems.length === 0) return null

        return (
            <>
                <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {groupName}
                </div>
                {filteredItems.map((item) => (
                    <NavLink key={item.href} item={item} pathname={pathname} />
                ))}
            </>
        )
    }

    return (
        <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-primary-100 bg-white/80 pt-16 backdrop-blur-md md:flex">
            <div className="flex flex-1 flex-col gap-1 overflow-auto p-4">
                <nav className="grid gap-1">
                    {renderNavGroup(MAIN_NAV_ITEMS, "Main")}
                    {renderNavGroup(ADMIN_NAV_ITEMS, "Admin")}
                    {renderNavGroup([DOCS_NAV_ITEM], "Documentation")}
                </nav>
            </div>
        </aside>
    )
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
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
        >
            <Icon className="h-4 w-4" />
            {item.title}
        </Link>
    )
}