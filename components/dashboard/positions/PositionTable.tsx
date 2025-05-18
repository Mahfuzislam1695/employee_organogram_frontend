"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Position } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PositionTableProps {
    positions: Position[]
}

export default function PositionTable({ positions }: PositionTableProps) {
    return (
        <Card className="col-span-2 glass-card">
            <CardHeader>
                <CardTitle>Position List</CardTitle>
                <CardDescription>All positions in the organization</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Level</TableHead>
                            <TableHead>Executive</TableHead>
                            <TableHead>Employees</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {positions.map((position) => (
                            <TableRow key={position.id}>
                                <TableCell className="font-medium">{position.title}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
                                        Level {position.level}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {position.isExecutive ? (
                                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                            Executive
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                            Non-Executive
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell>{position.employees.length}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit Position
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Child Position
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-red-600">
                                                <Trash className="mr-2 h-4 w-4" />
                                                Delete Position
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}