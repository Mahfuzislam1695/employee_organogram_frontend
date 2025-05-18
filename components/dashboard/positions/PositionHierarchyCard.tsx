"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Position } from "postcss"
import PositionTreeItem from "./PositionTreeItem"


interface PositionHierarchyCardProps {
    positions: Position[]
}

export default function PositionHierarchyCard({ positions }: PositionHierarchyCardProps) {
    const topLevelPositions = positions.filter((position) => !position?.parentId)

    return (
        <Card className="col-span-1 glass-card">
            <CardHeader>
                <CardTitle>Position Hierarchy</CardTitle>
                <CardDescription>Organizational position structure</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {topLevelPositions.map((position) => (
                        <PositionTreeItem key={position?.id} position={position} level={0} />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}