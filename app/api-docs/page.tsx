"use client"

import { useState } from "react"
import { Copy, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "@/app/layouts/dashboard-layout"

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(endpoint)
    setTimeout(() => setCopiedEndpoint(null), 2000)
  }

  return (
    <DashboardLayout>
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
                    positions, and departments. This RESTful API allows you to integrate employee hierarchy data into
                    your applications.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">Base URL</h3>
                  <div className="flex items-center gap-2 rounded-md bg-gray-100 p-3 font-mono text-sm">
                    <code>https://api.organogram.example.com/v1</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto h-8 w-8"
                      onClick={() => copyToClipboard("https://api.organogram.example.com/v1", "base-url")}
                    >
                      {copiedEndpoint === "base-url" ? "Copied!" : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">Rate Limiting</h3>
                  <p className="text-gray-600">
                    The API is rate limited to 100 requests per minute per API key. If you exceed this limit, you will
                    receive a 429 Too Many Requests response.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">Response Format</h3>
                  <p className="text-gray-600">
                    All responses are returned in JSON format. Successful responses will have a 2xx status code, while
                    errors will have a 4xx or 5xx status code.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="authentication">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Authentication</h3>
                  <p className="text-gray-600">
                    The API uses token-based authentication. You must include an API token in the Authorization header
                    of all requests.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">Obtaining an API Token</h3>
                  <p className="text-gray-600">
                    API tokens can be generated in the admin dashboard under API Settings. Each token has specific
                    permissions and can be revoked at any time.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">Authorization Header</h3>
                  <div className="flex items-center gap-2 rounded-md bg-gray-100 p-3 font-mono text-sm">
                    <code>Authorization: Bearer YOUR_API_TOKEN</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto h-8 w-8"
                      onClick={() => copyToClipboard("Authorization: Bearer YOUR_API_TOKEN", "auth-header")}
                    >
                      {copiedEndpoint === "auth-header" ? "Copied!" : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">Token Expiration</h3>
                  <p className="text-gray-600">
                    API tokens expire after 30 days by default. You can configure the expiration period when generating
                    a token.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="endpoints">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Employees</h3>
                  <div className="space-y-4">
                    <div className="rounded-md border border-gray-200">
                      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                            GET
                          </span>
                          <code className="font-mono text-sm">/employees</code>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={() =>
                            copyToClipboard("https://api.organogram.example.com/v1/employees", "get-employees")
                          }
                        >
                          {copiedEndpoint === "get-employees" ? "Copied!" : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600">Get a list of all employees</p>
                      </div>
                    </div>

                    <div className="rounded-md border border-gray-200">
                      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                            GET
                          </span>
                          <code className="font-mono text-sm">/employees/{"{id}"}</code>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={() =>
                            copyToClipboard("https://api.organogram.example.com/v1/employees/123", "get-employee")
                          }
                        >
                          {copiedEndpoint === "get-employee" ? "Copied!" : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600">Get a specific employee by ID</p>
                      </div>
                    </div>

                    <div className="rounded-md border border-gray-200">
                      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
                            POST
                          </span>
                          <code className="font-mono text-sm">/employees</code>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={() =>
                            copyToClipboard("https://api.organogram.example.com/v1/employees", "post-employee")
                          }
                        >
                          {copiedEndpoint === "post-employee" ? "Copied!" : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600">Create a new employee</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">Departments</h3>
                  <div className="space-y-4">
                    <div className="rounded-md border border-gray-200">
                      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                            GET
                          </span>
                          <code className="font-mono text-sm">/departments</code>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={() =>
                            copyToClipboard("https://api.organogram.example.com/v1/departments", "get-departments")
                          }
                        >
                          {copiedEndpoint === "get-departments" ? "Copied!" : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600">Get a list of all departments</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">Positions</h3>
                  <div className="space-y-4">
                    <div className="rounded-md border border-gray-200">
                      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                            GET
                          </span>
                          <code className="font-mono text-sm">/positions</code>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={() =>
                            copyToClipboard("https://api.organogram.example.com/v1/positions", "get-positions")
                          }
                        >
                          {copiedEndpoint === "get-positions" ? "Copied!" : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600">Get a list of all positions</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">Organogram</h3>
                  <div className="space-y-4">
                    <div className="rounded-md border border-gray-200">
                      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                            GET
                          </span>
                          <code className="font-mono text-sm">/organogram</code>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1"
                          onClick={() =>
                            copyToClipboard("https://api.organogram.example.com/v1/organogram", "get-organogram")
                          }
                        >
                          {copiedEndpoint === "get-organogram" ? "Copied!" : <Copy className="h-3 w-3" />}
                        </Button>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600">Get the complete organization hierarchy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="examples">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Example Request</h3>
                  <div className="rounded-md bg-gray-100 p-4">
                    <pre className="font-mono text-sm">
                      {`curl -X GET \\
  https://api.organogram.example.com/v1/employees \\
  -H "Authorization: Bearer YOUR_API_TOKEN"`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">Example Response</h3>
                  <div className="rounded-md bg-gray-100 p-4">
                    <pre className="font-mono text-sm">
                      {`{
  "data": [
    {
      "id": 1,
      "employeeId": "EMP001",
      "firstName": "John",
      "lastName": "Smith",
      "email": "john.smith@company.com",
      "phone": "+1 (555) 123-4567",
      "positionId": 1,
      "position": {
        "id": 1,
        "title": "Chief Executive Officer",
        "level": 1
      },
      "departmentId": 1,
      "department": {
        "id": 1,
        "name": "Executive",
        "code": "EXEC"
      },
      "isActive": true
    },
    // More employees...
  ],
  "meta": {
    "total": 12,
    "page": 1,
    "perPage": 10
  }
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-lg font-semibold">Error Response</h3>
                  <div className="rounded-md bg-gray-100 p-4">
                    <pre className="font-mono text-sm">
                      {`{
  "error": {
    "code": "unauthorized",
    "message": "Invalid or expired API token"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
