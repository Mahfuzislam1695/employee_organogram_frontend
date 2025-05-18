"use client"

import { useState } from "react"
import { Search, ChevronRight, MoreHorizontal, Edit, Trash, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import DashboardLayout from "@/app/layouts/dashboard-layout"
import { positions } from "@/lib/mock-data"
import { AddPositionForm } from "./add-position-form"

export default function PositionsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter positions based on search term
  const filteredPositions = positions.filter(
    (position) =>
      position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      position.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Position Management</h1>
          <p className="text-sm text-gray-600">Configure job hierarchy and position details</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search positions..."
              className="w-full pl-9 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <AddPositionForm />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-1 glass-card">
          <CardHeader>
            <CardTitle>Position Hierarchy</CardTitle>
            <CardDescription>Organizational position structure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {positions
                .filter((position) => !position.parentId)
                .map((position) => (
                  <PositionTreeItem key={position.id} position={position} level={0} />
                ))}
            </div>
          </CardContent>
        </Card>

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
                {filteredPositions.map((position) => (
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
      </div>
    </DashboardLayout>
  )
}

// Recursive component to display position hierarchy
function PositionTreeItem({ position, level }: { position: any; level: number }) {
  const [expanded, setExpanded] = useState(level < 1)
  const hasChildren = position.children && position.children.length > 0

  return (
    <div className="space-y-2">
      <div
        className={`flex items-center rounded-md p-2 hover:bg-primary-50 ${
          level > 0 ? "ml-4 border-l border-gray-200 pl-4" : ""
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
          {position.children.map((child: any) => (
            <PositionTreeItem key={child.id} position={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}
