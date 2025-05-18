"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DepartmentStructureCard() {
    return (
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
    )
}