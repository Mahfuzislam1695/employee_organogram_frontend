
import { Loader } from "@/components/share/loader/Loader"
import { Metadata } from "next"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
  title: "Department Management | Employee Organogram",
}

export default function Departments() {
  const DynamicDepartmentsPage = dynamic(
    () => import("@/components/dashboard/departments/Departments"),
    {
      loading: () => <Loader />,
    }
  )
  return <DynamicDepartmentsPage />
}