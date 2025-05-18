"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Department, EmployeeNode } from "@/types"
import TeamMembersSection from "./TeamMembersSection"
import EmployeeCard from "./EmployeeCard"

interface DepartmentsTabProps {
    departments: Department[]
    employees: EmployeeNode[]
}

export default function DepartmentsTab({ departments, employees }: DepartmentsTabProps) {
    return (
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
                                        <EmployeeCard employee={departmentHead} />
                                    ) : (
                                        <div className="rounded-md bg-white/50 p-3 text-sm text-gray-500">
                                            No department head assigned
                                        </div>
                                    )}
                                </div>

                                <TeamMembersSection
                                    employees={departmentEmployees}
                                    departmentName={department.name}
                                />
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}