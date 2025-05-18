"use client"

import { useState } from "react"
import { Download, Users, Building2, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmployeeNode } from "@/types"
import OrganogramVisualizer from "./organogram-visualizer"
import DepartmentsTab from "./DepartmentsTab"
import { departments, employees } from "@/lib/mock-data"
import PositionsTab from "./PositionsTab"


export default function Organogram() {
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeNode | null>(null)
    const [activeTab, setActiveTab] = useState("chart")

    return (
        <>
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Organization Chart</h1>
                    <p className="text-sm text-gray-600">Visualize your company's reporting structure</p>
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
                    <OrganogramVisualizer
                        selectedEmployee={selectedEmployee}
                        onEmployeeSelect={setSelectedEmployee}
                    />
                </TabsContent>

                <TabsContent value="departments">
                    <DepartmentsTab
                        departments={departments}
                        employees={employees}
                    />
                </TabsContent>

                <TabsContent value="positions">
                    <PositionsTab />
                </TabsContent>
            </Tabs>
        </>
    )
}