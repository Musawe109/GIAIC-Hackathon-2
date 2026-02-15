'use client';

import { CalendarDaysIcon, PlusIcon, UserGroupIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CalendarPage() {
  // Mock data for calendar events
  const events = [
    { id: 1, title: 'Team Meeting', date: '2023-10-15', time: '10:00 AM', type: 'meeting', completed: false },
    { id: 2, title: 'Project Deadline', date: '2023-10-18', time: '5:00 PM', type: 'deadline', completed: false },
    { id: 3, title: 'Client Call', date: '2023-10-20', time: '2:30 PM', type: 'call', completed: true },
    { id: 4, title: 'Design Review', date: '2023-10-22', time: '11:00 AM', type: 'review', completed: false },
  ];

  const todayEvents = [
    { id: 1, title: 'Team Standup', time: '9:00 AM', type: 'meeting' },
    { id: 2, title: 'Code Review', time: '2:00 PM', type: 'review' },
  ];

  // Get current month and year
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Calendar
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your schedule and upcoming tasks
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              className="focus-outline px-6 py-5 rounded-xl"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              New Event
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <Card className="premium-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">October {currentYear}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeftIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRightIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for the start of the month */}
                {Array.from({ length: new Date(currentYear, 9, 1).getDay() }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-24"></div>
                ))}
                
                {/* Days of the month */}
                {Array.from({ length: 31 }).map((_, idx) => {
                  const day = idx + 1;
                  const dayEvents = events.filter(event => parseInt(event.date.split('-')[2]) === day);
                  
                  // Determine CSS classes based on whether this is today
                  let dayClasses = 'h-24 border rounded-lg p-2 ';
                  if (day === currentDate.getDate()) {
                    dayClasses += 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20';
                  } else {
                    dayClasses += 'border-border';
                  }
                  
                  return (
                    <div key={day} className={dayClasses}>
                      <div className="text-sm font-medium">{day}</div>
                      <div className="mt-1 space-y-1 max-h-16 overflow-y-auto">
                        {dayEvents.slice(0, 2).map(event => {
                          let eventClasses = 'text-xs p-1 rounded truncate ';
                          if (event.type === 'meeting') {
                            eventClasses += 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
                          } else if (event.type === 'deadline') {
                            eventClasses += 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
                          } else if (event.type === 'call') {
                            eventClasses += 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300';
                          } else {
                            eventClasses += 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
                          }
                          
                          return (
                            <div key={event.id} className={eventClasses}>
                              {event.title}
                            </div>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with Today's Events and Upcoming */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarDaysIcon className="w-5 h-5 mr-2 text-indigo-600" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayEvents.length > 0 ? (
                  todayEvents.map(event => {
                    let indicatorClass = 'w-3 h-3 rounded-full ';
                    if (event.type === 'meeting') {
                      indicatorClass += 'bg-indigo-500';
                    } else if (event.type === 'review') {
                      indicatorClass += 'bg-purple-500';
                    } else {
                      indicatorClass += 'bg-pink-500';
                    }
                    
                    return (
                      <div key={event.id} className="flex items-start pb-3 last:pb-0">
                        <div className="mr-3 mt-1">
                          <div className={indicatorClass}></div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground">{event.time}</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-muted-foreground text-center py-4">No events scheduled for today</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.filter(e => !e.completed).slice(0, 4).map(event => {
                  let indicatorClass = 'w-3 h-3 rounded-full ';
                  if (event.type === 'meeting') {
                    indicatorClass += 'bg-indigo-500';
                  } else if (event.type === 'deadline') {
                    indicatorClass += 'bg-purple-500';
                  } else if (event.type === 'call') {
                    indicatorClass += 'bg-pink-500';
                  } else {
                    indicatorClass += 'bg-blue-500';
                  }
                  
                  let badgeVariant: any = 'outline';
                  if (event.type === 'deadline') {
                    badgeVariant = 'secondary';
                  } else if (event.type === 'call') {
                    badgeVariant = 'default';
                  }
                  
                  return (
                    <div key={event.id} className="flex items-start pb-3 last:pb-0">
                      <div className="mr-3 mt-1">
                        <div className={indicatorClass}></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{event.title}</div>
                        <div className="flex justify-between">
                          <div className="text-sm text-muted-foreground">{event.date} • {event.time}</div>
                          <Badge variant={badgeVariant}>
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="premium-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="justify-start">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Event
                </Button>
                <Button variant="outline" className="justify-start">
                  <UserGroupIcon className="w-4 h-4 mr-2" />
                  Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}