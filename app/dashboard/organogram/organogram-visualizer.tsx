"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import * as d3 from "d3"
import {
  ZoomIn,
  ZoomOut,
  Maximize,
  Download,
  Search,
  Filter,
  ChevronDown,
  Printer,
  Share2,
  Info,
  X,
  ArrowLeft,
  ArrowRight,
  ChevronsUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import type { EmployeeNode } from "@/types"
import { buildEmployeeHierarchy, getDepartmentColor, departments } from "@/lib/mock-data"
import { Briefcase, Mail, Phone, Users, MoreHorizontal } from "lucide-react"

interface OrganogramVisualizerProps {
  onEmployeeSelect?: (employee: EmployeeNode | null) => void
  selectedEmployee?: EmployeeNode | null
  className?: string
}

export default function OrganogramVisualizer({
  onEmployeeSelect,
  selectedEmployee,
  className = "",
}: OrganogramVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [orgData] = useState<EmployeeNode>(buildEmployeeHierarchy())
  const [localSelectedEmployee, setLocalSelectedEmployee] = useState<EmployeeNode | null>(null)
  const [viewMode, setViewMode] = useState<"tree" | "vertical" | "horizontal">("tree")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showMiniMap, setShowMiniMap] = useState(false)
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all")
  const [showControls, setShowControls] = useState(true)
  const [highlightedEmployees, setHighlightedEmployees] = useState<number[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [searchResults, setSearchResults] = useState<EmployeeNode[]>([])
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Use either the prop or local state for selected employee
  const effectiveSelectedEmployee = selectedEmployee !== undefined ? selectedEmployee : localSelectedEmployee

  // Handle employee selection
  const handleEmployeeSelect = useCallback(
    (employee: EmployeeNode | null) => {
      if (onEmployeeSelect) {
        onEmployeeSelect(employee)
      } else {
        setLocalSelectedEmployee(employee)
      }
    },
    [onEmployeeSelect],
  )

  // Function to find all employees matching search term
  const findMatchingEmployees = useCallback(
    (node: EmployeeNode, term: string, results: EmployeeNode[] = []): EmployeeNode[] => {
      const searchTermLower = term.toLowerCase()

      if (
        node.name.toLowerCase().includes(searchTermLower) ||
        node.title.toLowerCase().includes(searchTermLower) ||
        node.department.toLowerCase().includes(searchTermLower) ||
        node.email.toLowerCase().includes(searchTermLower)
      ) {
        results.push(node)
      }

      if (node.children) {
        for (const child of node.children) {
          findMatchingEmployees(child, term, results)
        }
      }

      return results
    },
    [],
  )

  // Handle search
  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) {
      setHighlightedEmployees([])
      setShowSearchResults(false)
      setSearchResults([])
      return
    }

    const results = findMatchingEmployees(orgData, searchTerm)
    setSearchResults(results)
    setHighlightedEmployees(results.map((r) => r.id))
    setShowSearchResults(results.length > 0)
    setCurrentSearchIndex(0)

    // If we have results, select the first one
    if (results.length > 0) {
      handleEmployeeSelect(results[0])
      centerOnEmployee(results[0].id)
    }
  }, [searchTerm, orgData, findMatchingEmployees, handleEmployeeSelect])

  // Navigate through search results
  const navigateSearchResults = (direction: "next" | "prev") => {
    if (searchResults.length === 0) return

    const newIndex =
      direction === "next"
        ? (currentSearchIndex + 1) % searchResults.length
        : (currentSearchIndex - 1 + searchResults.length) % searchResults.length

    setCurrentSearchIndex(newIndex)
    handleEmployeeSelect(searchResults[newIndex])
    centerOnEmployee(searchResults[newIndex].id)
  }

  // Center the view on a specific employee
  const centerOnEmployee = (employeeId: number) => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
    const node = svg.select(`g.node-${employeeId}`)

    if (!node.empty()) {
      const transform = node.attr("transform")
      const match = transform.match(/translate$$([^,]+),([^)]+)$$/)

      if (match) {
        const x = Number.parseFloat(match[1])
        const y = Number.parseFloat(match[2])
        const width = svgRef.current.clientWidth
        const height = svgRef.current.clientHeight

        const zoom = d3.zoom().on("zoom", (event) => {
          svg.select("g.main-group").attr("transform", event.transform)
        })

        svg
          .transition()
          .duration(750)
          .call((zoom as any).transform, d3.zoomIdentity.translate(width / 2 - x, height / 2 - y).scale(zoomLevel))
      }
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }

    setIsFullscreen(!isFullscreen)
  }

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Handle search input with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, handleSearch])

  // Main effect to render the organogram
  useEffect(() => {
    if (!svgRef.current) return

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current)
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight
    const margin = { top: 40, right: 120, bottom: 40, left: 120 }

    // Filter data based on selected department
    const filterData = (node: EmployeeNode): EmployeeNode | null => {
      if (selectedDepartment === "all") return node

      if (node.departmentCode === selectedDepartment) return node

      if (node.children && node.children.length > 0) {
        const filteredChildren = node.children.map(filterData).filter((child): child is EmployeeNode => child !== null)

        if (filteredChildren.length > 0) {
          return {
            ...node,
            children: filteredChildren,
          }
        }
      }

      return null
    }

    const filteredData = filterData(orgData) || orgData

    // Create a hierarchical layout
    const root = d3.hierarchy(filteredData)

    // Choose layout based on view mode
    let treeLayout

    if (viewMode === "tree") {
      treeLayout = d3.tree().size([height - margin.top - margin.bottom, width - margin.right - margin.left])
    } else if (viewMode === "horizontal") {
      treeLayout = d3.tree().size([height - margin.top - margin.bottom, width - margin.right - margin.left])
    } else {
      // vertical
      treeLayout = d3.tree().size([width - margin.right - margin.left, height - margin.top - margin.bottom])
    }

    // Compute the tree layout
    treeLayout(root)

    // Create a group element for the entire chart
    const mainGroup = svg
      .append("g")
      .attr("class", "main-group")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Create a zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 5])
      .on("zoom", (event) => {
        mainGroup.attr("transform", event.transform)
        setZoomLevel(event.transform.k)
      })

    svg.call(zoom as any)

    // Add links between nodes
    mainGroup
      .selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d) => {
        if (viewMode === "vertical") {
          return d3
            .linkVertical()
            .x((d: any) => d.x)
            .y((d: any) => d.y)(d)
        } else {
          return d3
            .linkHorizontal()
            .x((d: any) => d.y)
            .y((d: any) => d.x)(d)
        }
      })
      .attr("fill", "none")
      .attr("stroke", "#d1d5db")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", (d) => {
        // Use dashed lines for dotted relationships (e.g., acting positions)
        return d.target.data.isActing ? "5,5" : "0"
      })

    // Create node groups
    const node = mainGroup
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", (d) => `node node-${d.data.id}`)
      .attr("transform", (d) => {
        if (viewMode === "vertical") {
          return `translate(${d.x},${d.y})`
        } else {
          return `translate(${d.y},${d.x})`
        }
      })
      .on("click", (event, d) => {
        event.stopPropagation()
        handleEmployeeSelect(d.data)
      })

    // Add card-like rectangles for nodes
    node
      .append("rect")
      .attr("width", 180)
      .attr("height", 80)
      .attr("x", -90)
      .attr("y", -40)
      .attr("rx", 8)
      .attr("ry", 8)
      .attr("fill", "white")
      .attr("stroke", (d) => {
        // Highlight searched employees
        if (highlightedEmployees.includes(d.data.id)) {
          return "#3b82f6" // Highlight color
        }
        return getDepartmentColor(d.data.departmentCode)
      })
      .attr("stroke-width", (d) => {
        // Make highlighted employees' borders thicker
        return highlightedEmployees.includes(d.data.id) ? 3 : 2
      })
      .attr("filter", (d) => {
        // Add glow effect to highlighted employees
        return highlightedEmployees.includes(d.data.id)
          ? "drop-shadow(0px 0px 8px rgba(59, 130, 246, 0.5))"
          : "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))"
      })

    // Add employee images
    node
      .append("circle")
      .attr("cx", -65)
      .attr("cy", 0)
      .attr("r", 25)
      .attr("fill", "white")
      .attr("stroke", (d) => {
        return getDepartmentColor(d.data.departmentCode)
      })
      .attr("stroke-width", 2)

    // Add image clipping path
    node
      .append("clipPath")
      .attr("id", (d, i) => `clip-${i}`)
      .append("circle")
      .attr("cx", -65)
      .attr("cy", 0)
      .attr("r", 23)

    // Add employee images
    node
      .append("image")
      .attr("x", -88)
      .attr("y", -23)
      .attr("width", 46)
      .attr("height", 46)
      .attr("clip-path", (d, i) => `url(#clip-${i})`)
      .attr("xlink:href", (d) => d.data.img)

    // Add employee names
    node
      .append("text")
      .attr("x", -30)
      .attr("y", -15)
      .attr("text-anchor", "start")
      .attr("font-size", "13px")
      .attr("font-weight", "bold")
      .attr("fill", "#1f2937")
      .text((d) => {
        const name = d.data.name
        return name.length > 15 ? name.substring(0, 15) + "..." : name
      })

    // Add employee titles
    node
      .append("text")
      .attr("x", -30)
      .attr("y", 5)
      .attr("text-anchor", "start")
      .attr("font-size", "11px")
      .attr("fill", "#4b5563")
      .text((d) => {
        const title = d.data.title
        return title.length > 18 ? title.substring(0, 18) + "..." : title
      })

    // Add department indicators
    node
      .append("text")
      .attr("x", -30)
      .attr("y", 25)
      .attr("text-anchor", "start")
      .attr("font-size", "10px")
      .attr("fill", (d) => {
        return getDepartmentColor(d.data.departmentCode)
      })
      .text((d) => d.data.department)

    // Add click handler to clear selection when clicking on the background
    svg.on("click", () => {
      handleEmployeeSelect(null)
    })

    // Add mini-map if enabled
    if (showMiniMap) {
      const miniMapSize = 150
      const miniMapMargin = 10

      const miniMap = svg
        .append("g")
        .attr("class", "mini-map")
        .attr("transform", `translate(${width - miniMapSize - miniMapMargin}, ${miniMapMargin})`)

      miniMap
        .append("rect")
        .attr("width", miniMapSize)
        .attr("height", miniMapSize)
        .attr("fill", "white")
        .attr("stroke", "#d1d5db")
        .attr("stroke-width", 1)
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("opacity", 0.8)

      // Create a scaled-down version of the tree
      const miniTree = d3.tree().size([miniMapSize - 20, miniMapSize - 20])

      miniTree(root)

      miniMap
        .selectAll(".mini-link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "mini-link")
        .attr("d", (d) => {
          if (viewMode === "vertical") {
            return d3
              .linkVertical()
              .x((d: any) => d.x / 10 + miniMapSize / 2)
              .y((d: any) => d.y / 10 + 10)(d)
          } else {
            return d3
              .linkHorizontal()
              .x((d: any) => d.y / 10 + 10)
              .y((d: any) => d.x / 10 + miniMapSize / 2)(d)
          }
        })
        .attr("fill", "none")
        .attr("stroke", "#9ca3af")
        .attr("stroke-width", 0.5)

      miniMap
        .selectAll(".mini-node")
        .data(root.descendants())
        .enter()
        .append("circle")
        .attr("class", "mini-node")
        .attr("r", 2)
        .attr("fill", (d) => getDepartmentColor(d.data.departmentCode))
        .attr("transform", (d) => {
          if (viewMode === "vertical") {
            return `translate(${d.x / 10 + miniMapSize / 2},${d.y / 10 + 10})`
          } else {
            return `translate(${d.y / 10 + 10},${d.x / 10 + miniMapSize / 2})`
          }
        })
    }

    // Initial reset zoom
    resetZoom()

    // Function to reset zoom
    function resetZoom() {
      svg
        .transition()
        .duration(750)
        .call(zoom.transform as any, d3.zoomIdentity.translate(margin.left, margin.top))
    }
  }, [orgData, viewMode, showMiniMap, selectedDepartment, highlightedEmployees, handleEmployeeSelect])

  const handleZoomIn = () => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    const zoom = d3.zoom().on("zoom", (event) => {
      svg.select("g.main-group").attr("transform", event.transform)
      setZoomLevel(event.transform.k)
    })

    svg
      .transition()
      .duration(300)
      .call((zoom as any).scaleBy, 1.3)
  }

  const handleZoomOut = () => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    const zoom = d3.zoom().on("zoom", (event) => {
      svg.select("g.main-group").attr("transform", event.transform)
      setZoomLevel(event.transform.k)
    })

    svg
      .transition()
      .duration(300)
      .call((zoom as any).scaleBy, 0.7)
  }

  const handleReset = () => {
    if (!svgRef.current) return
    const svg = d3.select(svgRef.current)
    const zoom = d3.zoom().on("zoom", (event) => {
      svg.select("g.main-group").attr("transform", event.transform)
      setZoomLevel(1)
    })

    svg
      .transition()
      .duration(750)
      .call((zoom as any).transform, d3.zoomIdentity.translate(120, 40))
  }

  const handleDownload = () => {
    if (!svgRef.current) return

    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const svgUrl = URL.createObjectURL(svgBlob)

    const downloadLink = document.createElement("a")
    downloadLink.href = svgUrl
    downloadLink.download = "organogram.svg"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  const handlePrint = () => {
    if (!svgRef.current) return

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const svgData = new XMLSerializer().serializeToString(svgRef.current)

    printWindow.document.write(`
      <html>
        <head>
          <title>Organization Chart</title>
          <style>
            body { margin: 0; padding: 20px; }
            svg { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <h1>Organization Chart</h1>
          ${svgData}
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `)

    printWindow.document.close()
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div ref={containerRef} className={`relative flex h-[calc(100vh-12rem)] flex-col gap-4 lg:flex-row ${className}`}>
      <div className="relative h-full flex-1 overflow-hidden rounded-xl glass p-4 shadow-lg">
        {/* Top controls */}
        {showControls && (
          <div className="absolute left-4 right-4 top-4 z-10 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search employees..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch()
                    }
                  }}
                />
              </div>

              {showSearchResults && (
                <div className="flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700">
                  <span>
                    {currentSearchIndex + 1} of {searchResults.length} results
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => navigateSearchResults("prev")}
                    disabled={searchResults.length <= 1}
                  >
                    <ArrowLeft className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => navigateSearchResults("next")}
                    disabled={searchResults.length <= 1}
                  >
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => {
                      setSearchTerm("")
                      setHighlightedEmployees([])
                      setShowSearchResults(false)
                      setSearchResults([])
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Department" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.code}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
                  <TabsList className="h-8">
                    <TabsTrigger value="tree" className="px-2 py-1 text-xs">
                      Tree
                    </TabsTrigger>
                    <TabsTrigger value="vertical" className="px-2 py-1 text-xs">
                      Vertical
                    </TabsTrigger>
                    <TabsTrigger value="horizontal" className="px-2 py-1 text-xs">
                      Horizontal
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleZoomIn}>
                      <ZoomIn className="h-4 w-4" />
                      <span className="sr-only">Zoom In</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom In</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleZoomOut}>
                      <ZoomOut className="h-4 w-4" />
                      <span className="sr-only">Zoom Out</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Zoom Out</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={handleReset}>
                      <Maximize className="h-4 w-4" />
                      <span className="sr-only">Reset View</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reset View</TooltipContent>
                </Tooltip>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56" align="end">
                    <div className="grid gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start"
                        onClick={() => setShowMiniMap(!showMiniMap)}
                      >
                        <Info className="mr-2 h-4 w-4" />
                        {showMiniMap ? "Hide Mini Map" : "Show Mini Map"}
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start" onClick={toggleFullscreen}>
                        <Maximize className="mr-2 h-4 w-4" />
                        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print Chart
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start" onClick={handleDownload}>
                        <Download className="mr-2 h-4 w-4" />
                        Download SVG
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share Chart
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start"
                        onClick={() => setShowControls(false)}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Hide Controls
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipProvider>
            </div>
          </div>
        )}

        {/* Show button to restore controls if hidden */}
        {!showControls && (
          <Button
            variant="outline"
            size="sm"
            className="absolute left-4 top-4 z-10"
            onClick={() => setShowControls(true)}
          >
            <ChevronDown className="mr-2 h-4 w-4" />
            Show Controls
          </Button>
        )}

        {/* Zoom indicator */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-md bg-white/80 px-3 py-1 backdrop-blur-sm">
          <ZoomOut className="h-3 w-3 text-gray-500" />
          <Slider
            value={[zoomLevel * 100]}
            min={10}
            max={500}
            step={10}
            className="w-24"
            onValueChange={(value) => {
              if (!svgRef.current) return
              const svg = d3.select(svgRef.current)
              const zoom = d3.zoom().on("zoom", (event) => {
                svg.select("g.main-group").attr("transform", event.transform)
                setZoomLevel(event.transform.k)
              })

              svg
                .transition()
                .duration(300)
                .call((zoom as any).scaleTo, value[0] / 100)
            }}
          />
          <ZoomIn className="h-3 w-3 text-gray-500" />
          <span className="ml-1 text-xs text-gray-700">{Math.round(zoomLevel * 100)}%</span>
        </div>

        {/* Back to top button */}
        <Button
          variant="outline"
          size="sm"
          className="absolute bottom-4 right-4 z-10"
          onClick={() => {
            if (orgData) {
              handleEmployeeSelect(orgData)
              centerOnEmployee(orgData.id)
            }
          }}
        >
          <ChevronsUp className="mr-2 h-4 w-4" />
          Back to Top
        </Button>

        <svg ref={svgRef} width="100%" height="100%" className="cursor-grab active:cursor-grabbing"></svg>
      </div>

      {effectiveSelectedEmployee && (
        <Card className="h-full w-full overflow-auto rounded-xl glass-card p-6 shadow-lg lg:w-96">
          <CardContent className="p-0">
            <div className="flex flex-col items-center">
              <div
                className="relative mb-4 h-28 w-28 overflow-hidden rounded-full border-4"
                style={{ borderColor: getDepartmentColor(effectiveSelectedEmployee.departmentCode) }}
              >
                <Avatar className="h-full w-full">
                  <AvatarImage
                    src={effectiveSelectedEmployee.img || "/placeholder.svg"}
                    alt={effectiveSelectedEmployee.name}
                    className="h-full w-full object-cover"
                  />
                  <AvatarFallback className="text-2xl">
                    {effectiveSelectedEmployee.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <h2 className="mb-1 text-xl font-bold text-gray-900">{effectiveSelectedEmployee.name}</h2>
              <p className="mb-2 text-sm text-gray-600">{effectiveSelectedEmployee.title}</p>

              <Badge className={`badge-${effectiveSelectedEmployee.departmentCode.toLowerCase()}`}>
                {effectiveSelectedEmployee.department}
              </Badge>

              <div className="mt-6 w-full space-y-4">
                <div className="rounded-lg bg-white/70 p-4 shadow-sm">
                  <h3 className="mb-3 text-sm font-semibold text-gray-700">Contact Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Mail className="mr-3 h-4 w-4 text-primary-600" />
                      <a href={`mailto:${effectiveSelectedEmployee.email}`} className="hover:text-primary-600">
                        {effectiveSelectedEmployee.email}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="mr-3 h-4 w-4 text-primary-600" />
                      <a href={`tel:${effectiveSelectedEmployee.phone}`} className="hover:text-primary-600">
                        {effectiveSelectedEmployee.phone || "Not available"}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-white/70 p-4 shadow-sm">
                  <h3 className="mb-3 text-sm font-semibold text-gray-700">Team Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between text-gray-600">
                      <div className="flex items-center">
                        <Users className="mr-3 h-4 w-4 text-primary-600" />
                        <span>Direct Reports</span>
                      </div>
                      <Badge variant="outline" className="bg-primary-50 text-primary-700">
                        {effectiveSelectedEmployee.children ? effectiveSelectedEmployee.children.length : 0}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <div className="flex items-center">
                        <Briefcase className="mr-3 h-4 w-4 text-primary-600" />
                        <span>Position Level</span>
                      </div>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        Level {(effectiveSelectedEmployee.id % 5) + 1}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <div className="flex items-center">
                        <Info className="mr-3 h-4 w-4 text-primary-600" />
                        <span>Employee ID</span>
                      </div>
                      <span className="font-mono text-xs">{effectiveSelectedEmployee.employeeId}</span>
                    </div>
                  </div>
                </div>

                {effectiveSelectedEmployee.children && effectiveSelectedEmployee.children.length > 0 && (
                  <div className="rounded-lg bg-white/70 p-4 shadow-sm">
                    <h3 className="mb-3 text-sm font-semibold text-gray-700">Direct Reports</h3>
                    <div className="space-y-2">
                      {effectiveSelectedEmployee.children.map((child) => (
                        <div
                          key={child.id}
                          className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-primary-50"
                          onClick={() => {
                            handleEmployeeSelect(child)
                            centerOnEmployee(child.id)
                          }}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={child.img || "/placeholder.svg"} alt={child.name} />
                            <AvatarFallback>
                              {child.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{child.name}</div>
                            <div className="text-xs text-gray-500">{child.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex w-full gap-2">
                <Button variant="outline" className="flex-1">
                  View Profile
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700">
                  Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
