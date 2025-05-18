import { BarChart3, Users, Briefcase, Building2, FileText, User } from "lucide-react"

export type NavItem = {
    title: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    group?: string
}

export const MAIN_NAV_ITEMS: NavItem[] = [
    {
        title: "Organogram",
        href: "/dashboard/organogram",
        icon: BarChart3,
        group: "Main"
    },
    {
        title: "Employees",
        href: "/dashboard/employees",
        icon: Users,
        group: "Main"
    },
    {
        title: "Profile",
        href: "/dashboard/profile",
        icon: User,
        group: "Main"
    },
]

export const ADMIN_NAV_ITEMS: NavItem[] = [
    {
        title: "Positions",
        href: "/admin/positions",
        icon: Briefcase,
        group: "Admin"
    },
    {
        title: "Departments",
        href: "/admin/departments",
        icon: Building2,
        group: "Admin"
    },
]

export const DOCS_NAV_ITEM: NavItem = {
    title: "API Documentation",
    href: "/api-docs",
    icon: FileText,
    group: "Documentation"
}

export const ALL_NAV_ITEMS = [
    ...MAIN_NAV_ITEMS,
    ...ADMIN_NAV_ITEMS,
    DOCS_NAV_ITEM
]