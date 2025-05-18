
"use client"

import { useState } from "react"
import { Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from "./CodeBlock"
import EndpointCard from "./EndpointCard"

export default function ApiDocs() {
    const [activeTab, setActiveTab] = useState("overview")
    const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

    const copyToClipboard = (text: string, endpoint: string) => {
        navigator.clipboard.writeText(text)
        setCopiedEndpoint(endpoint)
        setTimeout(() => setCopiedEndpoint(null), 2000)
    }

    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">API Documentation</h1>
                <p className="text-sm text-gray-600">Reference for the Employee Organogram API</p>
            </div>

            <Card className="glass-card">
                <CardHeader>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle>Employee Organogram API</CardTitle>
                            <CardDescription>Version 1.0</CardDescription>
                        </div>
                        <Button variant="outline" className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Open Swagger UI
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="mb-6 grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="authentication">Authentication</TabsTrigger>
                            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
                            <TabsTrigger value="examples">Examples</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">Introduction</h3>
                                    <p className="text-gray-600">
                                        The Employee Organogram API provides programmatic access to employee data, organizational structure,
                                        positions, and departments.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">Base URL</h3>
                                    <CodeBlock
                                        code="https://api.organogram.example.com/v1"
                                        endpoint="base-url"
                                        copiedEndpoint={copiedEndpoint}
                                        onCopy={copyToClipboard}
                                    />
                                </div>

                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">Rate Limiting</h3>
                                    <p className="text-gray-600">
                                        The API is rate limited to 100 requests per minute per API key.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="authentication">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">Authentication</h3>
                                    <p className="text-gray-600">
                                        The API uses token-based authentication.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">Authorization Header</h3>
                                    <CodeBlock
                                        code="Authorization: Bearer YOUR_API_TOKEN"
                                        endpoint="auth-header"
                                        copiedEndpoint={copiedEndpoint}
                                        onCopy={copyToClipboard}
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="endpoints">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">Employees</h3>
                                    <div className="space-y-4">
                                        <EndpointCard
                                            method="GET"
                                            endpoint="/employees"
                                            description="Get a list of all employees"
                                            copiedEndpoint={copiedEndpoint}
                                            onCopy={copyToClipboard}
                                        />
                                        <EndpointCard
                                            method="GET"
                                            endpoint="/employees/{id}"
                                            description="Get a specific employee by ID"
                                            copiedEndpoint={copiedEndpoint}
                                            onCopy={copyToClipboard}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">Departments</h3>
                                    <div className="space-y-4">
                                        <EndpointCard
                                            method="GET"
                                            endpoint="/departments"
                                            description="Get a list of all departments"
                                            copiedEndpoint={copiedEndpoint}
                                            onCopy={copyToClipboard}
                                        />
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="examples">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">Example Request</h3>
                                    <CodeBlock
                                        code={`curl -X GET \\
  https://api.organogram.example.com/v1/employees \\
  -H "Authorization: Bearer YOUR_API_TOKEN"`}
                                        language="bash"
                                    />
                                </div>

                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">Example Response</h3>
                                    <CodeBlock
                                        code={`{
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Smith",
      "position": "CEO"
    }
  ]
}`}
                                        language="json"
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </>
    )
}