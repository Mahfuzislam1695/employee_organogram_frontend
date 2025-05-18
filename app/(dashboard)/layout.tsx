import type { Metadata } from "next"
import { DashboardLayout } from "../layouts/dashboard-layout"

export const metadata: Metadata = {
    title: "QuestionPro | Organogram",
    description: "Company organizational structure visualization",
}

export default function OrganogramLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <DashboardLayout>{children}</DashboardLayout>
}