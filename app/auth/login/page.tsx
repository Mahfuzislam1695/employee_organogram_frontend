import { Metadata } from "next"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Suspense } from "react"
import { AuthHeader } from "@/components/auth/auth-header"
import AuthLayout from "@/app/layouts/auth-layout"
import { Loader } from "@/components/share/loader/Loader"

export const metadata: Metadata = {
  title: "Login | Employee Organogram",
  description: "Sign in to access your account and dashboard",
}

// Dynamically import the client-side wrapper
const LoginWrapper = dynamic(
  () => import("@/components/auth/login-wrapper").then((mod) => mod.LoginWrapper),
  {
    loading: () => <Loader />,
  }
)

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-md">
        <AuthHeader
          title="Welcome back"
          subtitle="Sign in to access your organization chart"
        />

        <Suspense fallback={<Loader />}>
          <LoginWrapper />
        </Suspense>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Don&apos;t have an account? </span>
          <Link href="/auth/register" className="font-medium text-primary-600 hover:text-primary-800">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
