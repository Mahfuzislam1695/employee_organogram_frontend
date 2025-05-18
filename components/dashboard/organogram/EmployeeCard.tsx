"use client"

import { EmployeeNode } from "@/types"

interface EmployeeCardProps {
    employee: EmployeeNode
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
    return (
        <div className="flex items-center gap-3 rounded-md bg-white/50 p-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-primary-100">
                <img
                    src={`/placeholder.svg?height=40&width=40&text=${employee.firstName[0]}${employee.lastName[0]}`}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="h-full w-full object-cover"
                />
            </div>
            <div>
                <div className="font-medium">
                    {employee.firstName} {employee.lastName}
                </div>
                <div className="text-xs text-gray-500">{employee.position.title}</div>
            </div>
        </div>
    )
}