"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { AuthAlert } from "@/components/auth/auth-alert"

export function LoginWrapper() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit() {
        setIsLoading(true)
        setError(null)

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            router.push("/dashboard/organogram")
        } catch (err) {
            setError("Invalid email or password. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            {error && <AuthAlert message={error} />}
            <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
        </>
    )
}