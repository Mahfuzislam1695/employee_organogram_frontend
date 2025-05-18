import { Loader } from "@/components/share/loader/Loader"
import { Metadata } from "next"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
  title: "Employee Directory | Employee Organogram",
}

export default function Employees() {
  const DynamicEmployeesPage = dynamic(
    () => import("@/components/dashboard/employees/Employees"),
    {
      loading: () => <Loader />,
    }
  )
  return <DynamicEmployeesPage />
}