"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"

interface AuthAlertProps {
    message: string
}

export function AuthAlert({ message }: AuthAlertProps) {
    return (
        <Alert variant="destructive" className="mb-6">
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}