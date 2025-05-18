
import { Loader } from "@/components/share/loader/Loader"
import { Metadata } from "next"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
  title: "QuestionPro | Organogram",
}

export default function Organogram() {
  const DynamicOrganogramPage = dynamic(
    () => import("@/components/dashboard/organogram/Organogram"),
    {
      loading: () => <Loader />,
    }
  )
  return <DynamicOrganogramPage />
}