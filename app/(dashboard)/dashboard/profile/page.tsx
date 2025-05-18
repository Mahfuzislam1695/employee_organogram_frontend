
import { Loader } from "@/components/share/loader/Loader"
import { Metadata } from "next"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
  title: "Profile | Employee Organogram",
}

export default function Profile() {
  const DynamicProfilePage = dynamic(
    () => import("@/components/dashboard/profile/Profile"),
    {
      loading: () => <Loader />,
    }
  )
  return <DynamicProfilePage />
}