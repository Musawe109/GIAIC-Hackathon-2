'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your profile details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input label="First Name" defaultValue="John" />
              </div>
              <div>
                <Input label="Last Name" defaultValue="Doe" />
              </div>
            </div>
            <div>
              <Input label="Email" type="email" defaultValue="john.doe@example.com" />
            </div>
            <div>
              <Input 
                label="Bio" 
                as="textarea" 
                rows={4} 
                placeholder="Tell us about yourself..." 
                defaultValue="Software developer passionate about creating amazing user experiences."
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Upload a new profile picture</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-50 rounded-xl transition-opacity">
                  <span className="text-white text-xs">Change</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">JPG, GIF or PNG. Max size: 10MB</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="secondary">Upload New</Button>
          </CardFooter>
        </Card>

        {/* Account Security Section */}
        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div>Password</div>
                <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div>Two-Factor Authentication</div>
                  <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div>Login Notifications</div>
                  <p className="text-sm text-muted-foreground">Receive notifications for new logins</p>
                </div>
                <Button variant="outline">Enabled</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
            <CardDescription>Permanently remove your account and all associated data</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="destructive">Delete Account</Button>
          </CardFooter>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Choose what notifications you receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div>Email Notifications</div>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Button variant="outline">Enabled</Button>
            </div>

            <div className="pt-4 border-t">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div>Push Notifications</div>
                  <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                </div>
                <Button variant="outline">Enabled</Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div>SMS Notifications</div>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Button variant="outline">Disabled</Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div>Weekly Digest</div>
                  <p className="text-sm text-muted-foreground">Get a weekly summary of activity</p>
                </div>
                <Button variant="outline">Disabled</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Channels</CardTitle>
            <CardDescription>Manage notification delivery methods</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input label="Email" type="email" defaultValue="john.doe@example.com" />
              </div>
              <div>
                <Input label="Phone Number" type="tel" placeholder="+1 (555) 123-4567" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        {/* Billing Section */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
            <CardDescription>Manage your subscription and billing information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-medium">Professional Plan</h3>
                <p className="text-sm text-muted-foreground">Up to 5 team members • Advanced analytics • Priority support</p>
              </div>
              <Badge className="mt-2 sm:mt-0">Current Plan</Badge>
            </div>
            <div className="mt-4">
              <p className="text-sm">Next billing date: June 15, 2023 • $15/month</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Change Plan</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Update your payment information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input label="Card Number" placeholder="4242 4242 4242 4242" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Input label="Expiry Date" placeholder="MM/YY" />
                </div>
                <div>
                  <Input label="CVV" placeholder="123" />
                </div>
              </div>
              <div>
                <Input label="Name on Card" defaultValue="John Doe" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Update Payment Method</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>View your past invoices and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <p className="font-medium">Invoice #INV-001</p>
                  <p className="text-sm text-muted-foreground">June 15, 2023 • $15.00</p>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <p className="font-medium">Invoice #INV-002</p>
                  <p className="text-sm text-muted-foreground">May 15, 2023 • $15.00</p>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}