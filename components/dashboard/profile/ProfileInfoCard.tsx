"use client"

import { Mail, Phone, MapPin, Building, Briefcase } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Employee } from "@/types"


interface ProfileInfoCardProps {
    employee: Employee
}

export default function ProfileInfoCard({ employee }: ProfileInfoCardProps) {
    return (
        <Card className="col-span-1 glass-card">
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your personal information and photo</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                <div className="relative mb-4">
                    <Avatar className="h-24 w-24">
                        <AvatarImage
                            src={`/placeholder.svg?height=96&width=96&text=${employee.firstName[0]}${employee.lastName[0]}`}
                            alt={`${employee.firstName} ${employee.lastName}`}
                        />
                        <AvatarFallback className="text-2xl">
                            {employee.firstName[0]}
                            {employee.lastName[0]}
                        </AvatarFallback>
                    </Avatar>
                    <Button
                        size="icon"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary-600 hover:bg-primary-700"
                    >
                        <span className="text-lg">+</span>
                    </Button>
                </div>
                <h3 className="text-lg font-medium">
                    {employee.firstName} {employee.lastName}
                </h3>
                <p className="text-sm text-gray-500">{employee.position.title}</p>

                {employee.department && (
                    <Badge className={`mt-2 badge-${employee.department.code.toLowerCase()}`}>
                        {employee.department.name}
                    </Badge>
                )}

                <div className="mt-6 w-full space-y-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{employee.phone || "Not available"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>New York, NY</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Building className="h-4 w-4" />
                        <span>{employee.department?.name || "Not assigned"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Briefcase className="h-4 w-4" />
                        <span>{employee.position.title}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}