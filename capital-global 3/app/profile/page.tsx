"use client"

import { DashboardLayout } from "@/components/trading/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value="John Doe" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value="john.doe@example.com" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value="+91 9876543210" readOnly />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Account Information</h2>
            <div className="space-y-2">
              <Label htmlFor="client-id">Client ID</Label>
              <Input id="client-id" value="AB1234" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pan">PAN</Label>
              <Input id="pan" value="ABCDE1234F" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demat">Demat Account</Label>
              <Input id="demat" value="1234567890" readOnly />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Security</h2>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="flex items-center gap-2">
              <Input id="password" type="password" value="********" readOnly />
              <Button variant="outline">Change</Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="two-factor">Two-Factor Authentication</Label>
            <div className="flex items-center gap-2">
              <Input id="two-factor" value="Enabled" readOnly />
              <Button variant="outline">Manage</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

