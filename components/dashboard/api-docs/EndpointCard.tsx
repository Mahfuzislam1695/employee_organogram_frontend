"use client"

import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

interface EndpointCardProps {
    method: string
    endpoint: string
    description: string
    copiedEndpoint: string | null
    onCopy: (text: string, endpoint: string) => void
}

export default function EndpointCard({
    method,
    endpoint,
    description,
    copiedEndpoint,
    onCopy
}: EndpointCardProps) {
    const methodColor = {
        GET: "bg-green-100 text-green-800",
        POST: "bg-blue-100 text-blue-800",
        PUT: "bg-yellow-100 text-yellow-800",
        DELETE: "bg-red-100 text-red-800"
    }

    const fullUrl = `https://api.organogram.example.com/v1${endpoint}`
    const endpointKey = endpoint.replace(/\W/g, '-')

    return (
        <div className="rounded-md border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
                <div className="flex items-center gap-2">
                    <span className={`rounded px-2 py-1 text-xs font-semibold ${methodColor[method as keyof typeof methodColor]}`}>
                        {method}
                    </span>
                    <code className="font-mono text-sm">{endpoint}</code>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1"
                    onClick={() => onCopy(fullUrl, endpointKey)}
                >
                    {copiedEndpoint === endpointKey ? "Copied!" : <Copy className="h-3 w-3" />}
                </Button>
            </div>
            <div className="p-4">
                <p className="text-sm text-gray-600">{description}</p>
            </div>
        </div>
    )
}