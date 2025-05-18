"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PositionsTab() {
    return (
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
    )
}