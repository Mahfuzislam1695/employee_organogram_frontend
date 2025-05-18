
import { Loader } from "@/components/share/loader/Loader"
import { Metadata } from "next"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
  title: "API Documentation | Employee Organogram",
}

export default function ApiDocs() {
  const DynamicApiDocsPage = dynamic(
    () => import("@/components/dashboard/api-docs/ApiDocs"),
    {
      loading: () => <Loader />,
    }
  )
  return <DynamicApiDocsPage />
}