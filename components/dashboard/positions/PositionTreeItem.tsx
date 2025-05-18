"use client"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Position } from "@/types"


interface PositionTreeItemProps {
    position: Position
    level: number
}

export default function PositionTreeItem({ position, level }: PositionTreeItemProps) {
    const [expanded, setExpanded] = useState(level < 1)
    const hasChildren = position.children && position.children.length > 0

    return (
        <div className="space-y-2">
            <div
                className={`flex items-center rounded-md p-2 hover:bg-primary-50 ${level > 0 ? "ml-4 border-l border-gray-200 pl-4" : ""
                    }`}
            >
                {hasChildren && (
                    <Button variant="ghost" size="icon" className="mr-1 h-5 w-5" onClick={() => setExpanded(!expanded)}>
                        <ChevronRight className={`h-4 w-4 transition-transform ${expanded ? "rotate-90" : ""}`} />
                    </Button>
                )}
                {!hasChildren && <div className="ml-5" />}
                <div className="ml-1 flex-1">
                    <div className="font-medium">{position.title}</div>
                    <div className="text-xs text-gray-500">Level {position.level}</div>
                </div>
                <Badge
                    variant="outline"
                    className={
                        position.isExecutive
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                    }
                >
                    {position.isExecutive ? "Executive" : "L" + position.level}
                </Badge>
            </div>

            {expanded && hasChildren && (
                <div className="ml-4">
                    {position.children.map((child) => (
                        <PositionTreeItem key={child.id} position={child} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    )
}