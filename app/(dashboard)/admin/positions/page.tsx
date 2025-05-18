
import { Loader } from "@/components/share/loader/Loader"
import { Metadata } from "next"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
  title: "Position Management | Employee Organogram",
}

export default function Positions() {
  const DynamicPositionsPage = dynamic(
    () => import("@/components/dashboard/positions/Positions"),
    {
      loading: () => <Loader />,
    }
  )
  return <DynamicPositionsPage />
}