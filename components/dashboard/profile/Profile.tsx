"use client"

import { useState } from "react"
import { User, Shield, Save } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { users } from "@/lib/mock-data"
import ProfileInfoCard from "./ProfileInfoCard"
import PersonalInfoForm from "./PersonalInfoForm"
import SecurityForm from "./SecurityForm"


export default function Profile() {
    const [activeTab, setActiveTab] = useState("personal")
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const currentUser = users[0]
    const employee = currentUser.employee!

    return (
        <>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-sm text-gray-600">Manage your personal information and account settings</p>
            </div>

            {successMessage && (
                <Alert className="mb-6 bg-green-50 text-green-800">
                    <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
            )}

            <div className="grid gap-6 md:grid-cols-3">
                <ProfileInfoCard employee={employee} />

                <div className="col-span-2">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="mb-6 grid w-full grid-cols-2">
                            <TabsTrigger value="personal" className="text-sm">
                                <User className="mr-2 h-4 w-4" />
                                Personal Information
                            </TabsTrigger>
                            <TabsTrigger value="security" className="text-sm">
                                <Shield className="mr-2 h-4 w-4" />
                                Security
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="personal">
                            <PersonalInfoForm
                                employee={employee}
                                onSuccess={(message) => setSuccessMessage(message)}
                            />
                        </TabsContent>

                        <TabsContent value="security">
                            <SecurityForm
                                onSuccess={(message) => setSuccessMessage(message)}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}