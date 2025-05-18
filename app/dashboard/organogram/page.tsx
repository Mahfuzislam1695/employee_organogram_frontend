"use client"

import { useState } from "react"
import { Download, Users, Building2, Briefcase, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import OrganogramVisualizer from "./organogram-visualizer"
import type { EmployeeNode } from "@/types"
import { departments, employees } from "@/lib/mock-data"
import { DashboardLayout } from "@/app/layouts/dashboard-layout"

export default function OrganogramPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeNode | null>(null)
  const [activeTab, setActiveTab] = useState("chart")

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organization Chart</h1>
          <p className="text-sm text-gray-600">Visualize your company&apos;s reporting structure</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="w-full sm:w-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chart" className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Chart</span>
                </TabsTrigger>
                <TabsTrigger value="departments" className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Departments</span>
                </TabsTrigger>
                <TabsTrigger value="positions" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Positions</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-0">
        <TabsContent value="chart">
          <OrganogramVisualizer selectedEmployee={selectedEmployee} onEmployeeSelect={setSelectedEmployee} />
        </TabsContent>

        <TabsContent value="departments">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => {
              const departmentEmployees = employees.filter((e) => e.departmentId === department.id)
              const departmentHead = employees.find((e) => e.id === department.headId)

              return (
                <Card key={department.id} className="glass-card">
                  <CardHeader>
                    <CardTitle>{department.name}</CardTitle>
                    <CardDescription>
                      {department.code} - {departmentEmployees.length} employees
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="mb-2 text-sm font-medium text-gray-700">Department Head</h3>
                        {departmentHead ? (
                          <div className="flex items-center gap-3 rounded-md bg-white/50 p-3">
                            <div className="h-10 w-10 overflow-hidden rounded-full bg-primary-100">
                              <img
                                src={`/placeholder.svg?height=40&width=40&text=${departmentHead.firstName[0]}${departmentHead.lastName[0]}`}
                                alt={`${departmentHead.firstName} ${departmentHead.lastName}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">
                                {departmentHead.firstName} {departmentHead.lastName}
                              </div>
                              <div className="text-xs text-gray-500">{departmentHead.position.title}</div>
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-md bg-white/50 p-3 text-sm text-gray-500">
                            No department head assigned
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-700">Team Members</h3>
                          <span className="text-xs text-gray-500">{departmentEmployees.length} total</span>
                        </div>

                        <div className="relative">
                          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <Input placeholder={`Search ${department.name}...`} className="mb-3 pl-9" />
                        </div>

                        <div className="max-h-40 space-y-2 overflow-y-auto">
                          {departmentEmployees.slice(0, 5).map((employee) => (
                            <div
                              key={employee.id}
                              className="flex items-center gap-2 rounded-md p-2 hover:bg-primary-50"
                            >
                              <div className="h-8 w-8 overflow-hidden rounded-full bg-primary-100">
                                <img
                                  src={`/placeholder.svg?height=32&width=32&text=${employee.firstName[0]}${employee.lastName[0]}`}
                                  alt={`${employee.firstName} ${employee.lastName}`}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="text-sm font-medium">
                                  {employee.firstName} {employee.lastName}
                                </div>
                                <div className="text-xs text-gray-500">{employee.position.title}</div>
                              </div>
                            </div>
                          ))}

                          {departmentEmployees.length > 5 && (
                            <Button variant="outline" className="w-full text-xs" size="sm">
                              View all {departmentEmployees.length} members
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="positions">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Position Hierarchy</CardTitle>
              <CardDescription>View the organizational position structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[calc(100vh-20rem)] w-full">
                <img
                  src="/placeholder.svg?height=600&width=1000&text=Position+Hierarchy+Visualization"
                  alt="Position Hierarchy"
                  className="h-full w-full object-contain"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

// import type { Metadata } from "next"
// import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout"

// export const metadata: Metadata = {
//   title: "Dashboard | Employee Organogram",
//   description: "Your employee organization dashboard",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <DashboardLayout>
//       {children}
//     </DashboardLayout>
//   )
// }
