"use client"

import { EmployeeNode } from "@/types"

interface EmployeeListItemProps {
    employee: EmployeeNode
}

export default function EmployeeListItem({ employee }: EmployeeListItemProps) {
    return (
        <div className="flex items-center gap-2 rounded-md p-2 hover:bg-primary-50">
            <div className="h-8 w-8 overflow-hidden rounded-full bg-primary-100">
                <img
                    src={`/placeholder.svg?height=32&width=32&text=${employee?.firstName[0]}${employee?.lastName[0]}`}
                    alt={`${employee?.firstName} ${employee?.lastName}`}
                    className="h-full w-full object-cover"
                />
            </div>
            <div>
                <div className="text-sm font-medium">
                    {employee?.firstName} {employee?.lastName}
                </div>
                <div className="text-xs text-gray-500">{employee?.position?.title}</div>
            </div>
        </div>
    )
}