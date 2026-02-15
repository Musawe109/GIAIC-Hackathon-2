'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarIcon, 
  ChartBarIcon, 
  CogIcon, 
  UserGroupIcon, 
  DocumentTextIcon, 
  ArrowTrendingUpIcon 
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function DashboardPage() {
  const stats = [
    { name: 'Total Tasks', value: '127', change: '+10%', icon: DocumentTextIcon },
    { name: 'Completed', value: '95', change: '+15%', icon: ArrowTrendingUpIcon },
    { name: 'Pending', value: '32', change: '-5%', icon: CalendarIcon },
    { name: 'Completion Rate', value: '74.8%', change: '+3%', icon: ChartBarIcon },
  ];

  const recentActivity = [
    { id: 1, user: 'Alex Johnson', action: 'completed project proposal', time: '2 hours ago' },
    { id: 2, user: 'Sarah Williams', action: 'created new task list', time: '5 hours ago' },
    { id: 3, user: 'Michael Chen', action: 'scheduled team meeting', time: 'Yesterday' },
    { id: 4, user: 'Emma Davis', action: 'updated project timeline', time: '2 days ago' },
  ];

  const quickActions = [
    { name: 'Create Task', href: '/dashboard/todos', icon: DocumentTextIcon },
    { name: 'View Calendar', href: '/dashboard/calendar', icon: CalendarIcon },
    { name: 'Team Members', href: '/dashboard/team', icon: UserGroupIcon },
    { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <UserGroupIcon className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.user} <span className="font-normal text-muted-foreground">{activity.action}</span></p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href as any}>
                  <Button variant="outline" className="w-full justify-start">
                    <action.icon className="h-4 w-4 mr-2" />
                    {action.name}
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Prepare quarterly report</h4>
                <p className="text-sm text-muted-foreground">Due in 3 days</p>
              </div>
              <Badge variant="secondary">High Priority</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Team meeting with stakeholders</h4>
                <p className="text-sm text-muted-foreground">Tomorrow, 10:00 AM</p>
              </div>
              <Badge variant="default">Medium Priority</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Review project timeline</h4>
                <p className="text-sm text-muted-foreground">Due in 1 week</p>
              </div>
              <Badge variant="outline">Low Priority</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}