"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { EmployeeNode } from "@/types"
import EmployeeListItem from "./EmployeeListItem"

interface TeamMembersSectionProps {
    employees: EmployeeNode[]
    departmentName: string
}

export default function TeamMembersSection({
    employees,
    departmentName
}: TeamMembersSectionProps) {
    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">Team Members</h3>
                <span className="text-xs text-gray-500">{employees.length} total</span>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder={`Search ${departmentName}...`} className="mb-3 pl-9" />
            </div>

            <div className="max-h-40 space-y-2 overflow-y-auto">
                {employees.slice(0, 5).map((employee) => (
                    <EmployeeListItem key={employee.id} employee={employee} />
                ))}

                {employees.length > 5 && (
                    <Button variant="outline" className="w-full text-xs" size="sm">
                        View all {employees.length} members
                    </Button>
                )}
            </div>
        </div>
    )
}