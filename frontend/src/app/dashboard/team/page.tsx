'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const teamMembers = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex@example.com',
    role: 'Admin',
    avatar: '/avatars/01.png',
    status: 'active',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    role: 'Editor',
    avatar: '/avatars/02.png',
    status: 'active',
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'Viewer',
    avatar: '/avatars/03.png',
    status: 'inactive',
  },
  {
    id: 4,
    name: 'Emma Davis',
    email: 'emma@example.com',
    role: 'Editor',
    avatar: '/avatars/04.png',
    status: 'active',
  },
];

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">Manage your team members and their permissions</p>
        </div>
        <Button className="mt-4 sm:mt-0">
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Active Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">21</div>
            <p className="text-sm text-muted-foreground">87% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Pending Invites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Need to accept invites</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left">Member</th>
                  <th className="py-3 text-left">Role</th>
                  <th className="py-3 text-left">Status</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id} className="border-b">
                    <td className="py-4">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge 
                        variant={
                          member.role === 'Admin' ? 'destructive' : 
                          member.role === 'Editor' ? 'secondary' : 
                          'default'
                        }
                      >
                        {member.role}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Badge 
                        variant={member.status === 'active' ? 'success' : 'warning'}
                      >
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Remove</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invite New Member</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Input 
                label="Email" 
                type="email" 
                placeholder="Enter email address" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Viewer</Button>
                <Button variant="outline" size="sm">Editor</Button>
                <Button variant="outline" size="sm">Admin</Button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Button>Send Invitation</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}