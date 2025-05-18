"use client"

import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"

interface CodeBlockProps {
    code: string
    language?: string
    endpoint?: string
    copiedEndpoint?: string | null
    onCopy?: (text: string, endpoint: string) => void
}

export default function CodeBlock({
    code,
    language = "text",
    endpoint,
    copiedEndpoint,
    onCopy
}: CodeBlockProps) {
    const handleCopy = () => {
        if (onCopy && endpoint) {
            onCopy(code, endpoint)
        } else {
            navigator.clipboard.writeText(code)
        }
    }

    return (
        <div className="relative rounded-md bg-gray-100 p-4">
            <pre className="font-mono text-sm overflow-x-auto">
                {code}
            </pre>
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8"
                onClick={handleCopy}
            >
                {copiedEndpoint === endpoint ? "Copied!" : <Copy className="h-4 w-4" />}
            </Button>
        </div>
    )
}