"use client"

import { Eye, EyeOff, Lock } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Control } from "react-hook-form"
import Link from "next/link"

interface PasswordInputProps {
    control: Control<any>
    showPassword: boolean
    onTogglePassword: () => void
}

export function PasswordInput({ control, showPassword, onTogglePassword }: PasswordInputProps) {
    return (
        <FormField
            control={control}
            name="password"
            render={({ field }) => (
                <FormItem>
                    <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link
                            href="/auth/forgot-password"
                            className="text-xs font-medium text-primary-600 hover:text-primary-800"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <FormControl>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <Input type={showPassword ? "text" : "password"} className="pl-10 pr-10" {...field} />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1 h-8 w-8 text-gray-400"
                                onClick={onTogglePassword}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                            </Button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}