"use client"

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

interface EmployeePaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function EmployeePagination({
    currentPage,
    totalPages,
    onPageChange,
}: EmployeePaginationProps) {
    return (
        <div className="border-t border-gray-200 p-4">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (currentPage > 1) onPageChange(currentPage - 1)
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNumber = i + 1
                        return (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === pageNumber}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        onPageChange(pageNumber)
                                    }}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}

                    {totalPages > 5 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                if (currentPage < totalPages) onPageChange(currentPage + 1)
                            }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}