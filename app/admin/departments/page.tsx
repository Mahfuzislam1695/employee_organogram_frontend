"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Edit, Trash, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DashboardLayout from "@/app/layouts/dashboard-layout"
import { departments, employees, getDepartmentColorClass } from "@/lib/mock-data"
import { AddDepartmentForm } from "./add-department-form"

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter departments based on search term
  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      department.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Count employees in each department
  const departmentsWithCount = filteredDepartments.map((department) => {
    const employeeCount = employees.filter((emp) => emp.departmentId === department.id).length
    return { ...department, employeeCount }
  })

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Department Management</h1>
          <p className="text-sm text-gray-600">Manage organizational departments and structure</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search departments..."
              className="w-full pl-9 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <AddDepartmentForm />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="col-span-3">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Departments</CardTitle>
              <CardDescription>All departments in the organization</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Department Head</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentsWithCount.map((department) => {
                    // Find department head if exists
                    const departmentHead = employees.find((emp) => emp.id === department.headId)

                    return (
                      <TableRow key={department.id}>
                        <TableCell>
                          <Badge className={getDepartmentColorClass(department.code)}>{department.name}</Badge>
                        </TableCell>
                        <TableCell>{department.code}</TableCell>
                        <TableCell className="max-w-xs truncate">{department.description}</TableCell>
                        <TableCell>
                          {departmentHead ? (
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={`/placeholder.svg?height=24&width=24&text=${departmentHead.firstName[0]}${departmentHead.lastName[0]}`}
                                  alt={`${departmentHead.firstName} ${departmentHead.lastName}`}
                                />
                                <AvatarFallback className="text-xs">
                                  {departmentHead.firstName[0]}
                                  {departmentHead.lastName[0]}
                                </AvatarFallback>
                              </Avatar>
                              <span>
                                {departmentHead.firstName} {departmentHead.lastName}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-500">Not assigned</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span>{department.employeeCount}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Department
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                Assign Department Head
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete Department
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-3 md:col-span-1 glass-card">
          <CardHeader>
            <CardTitle>Department Statistics</CardTitle>
            <CardDescription>Employee distribution by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentsWithCount
                .sort((a, b) => b.employeeCount - a.employeeCount)
                .map((department) => (
                  <div key={department.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge className={getDepartmentColorClass(department.code)}>{department.code}</Badge>
                        <span className="font-medium">{department.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{department.employeeCount} employees</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full ${getDepartmentColorClass(department.code)}`}
                        style={{
                          width: `${Math.min(
                            100,
                            (department.employeeCount / Math.max(...departmentsWithCount.map((d) => d.employeeCount))) *
                              100,
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 md:col-span-2 glass-card">
          <CardHeader>
            <CardTitle>Department Structure</CardTitle>
            <CardDescription>Organizational hierarchy and reporting lines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">Department structure visualization coming soon</p>
                <Button variant="outline" className="mt-4">
                  Configure Structure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
