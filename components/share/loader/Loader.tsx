import { cn } from "@/lib/utils"

interface LoaderProps {
    size?: "sm" | "md" | "lg"
    color?: "primary" | "secondary" | "white" | "custom"
    customColor?: string
    className?: string
    message?: string
    fullScreen?: boolean
}

export function Loader({
    size = "md",
    color = "primary",
    customColor,
    className,
    message,
    fullScreen = false,
}: LoaderProps) {
    const sizeClasses = {
        sm: "h-4 w-4 border-2",
        md: "h-8 w-8 border-4",
        lg: "h-12 w-12 border-4",
    }

    const colorClasses = {
        primary: "border-t-primary-600 border-r-primary-600 border-b-transparent border-l-transparent",
        secondary: "border-t-secondary-600 border-r-secondary-600 border-b-transparent border-l-transparent",
        white: "border-t-white border-r-white border-b-transparent border-l-transparent",
        custom: "",
    }

    return (
        <div className={cn(
            "flex flex-col items-center justify-center gap-2",
            fullScreen ? "h-screen w-screen" : "",
            className
        )}>
            <div
                className={cn(
                    "animate-spin rounded-full",
                    sizeClasses[size],
                    color === "custom"
                        ? `border-t-[${customColor}] border-r-[${customColor}] border-b-transparent border-l-transparent`
                        : colorClasses[color],
                )}
                style={color === "custom" ? {
                    borderTopColor: customColor,
                    borderRightColor: customColor,
                    borderBottomColor: 'transparent',
                    borderLeftColor: 'transparent'
                } : undefined}
            />
            {message && (
                <p className={cn(
                    "text-sm",
                    color === "white" ? "text-white" : "text-gray-600"
                )}>
                    {message}
                </p>
            )}
        </div>
    )
}