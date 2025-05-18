import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Background decorative elements */}
      <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-primary-100 opacity-50 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 h-[500px] w-[500px] rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
      <div className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-yellow-100 opacity-30 blur-3xl"></div>

      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-10 text-center">
        <div className="mb-8 text-9xl font-bold text-primary-600">404</div>

        <h1 className="mb-4 text-4xl font-bold text-gray-900">Page Not Found</h1>

        <p className="mb-8 max-w-md text-gray-600">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="outline" className="gap-2">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>

          <Button
            asChild
            className="gap-2 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700"
          >
            <Link href="/dashboard/organogram">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
