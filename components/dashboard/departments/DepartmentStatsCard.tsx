"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DepartmentWithCount } from "@/types"
import { getDepartmentColorClass } from "@/lib/mock-data"

interface DepartmentStatsCardProps {
    departments: DepartmentWithCount[]
}

export default function DepartmentStatsCard({ departments }: DepartmentStatsCardProps) {
    return (
        <Card className="col-span-3 md:col-span-1 glass-card">
            <CardHeader>
                <CardTitle>Department Statistics</CardTitle>
                <CardDescription>Employee distribution by department</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {departments
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
                                                (department.employeeCount / Math.max(...departments.map((d) => d.employeeCount))) * 100,
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                </div>
            </CardContent>
        </Card>
    )
}