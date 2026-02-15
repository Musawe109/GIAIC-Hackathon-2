'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ResponsiveTestPage() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl xs:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Responsive Design Test Page
        </h1>
        <p className="text-muted-foreground">
          This page demonstrates the responsive features of the application
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xs:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Counter */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Counter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <p className="text-4xl font-bold mb-4">{counter}</p>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => setCounter(counter + 1)}>Increment</Button>
                <Button variant="outline" onClick={() => setCounter(0)}>Reset</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badge Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Responsive Text */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg xs:text-xl">Responsive Typography</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm xs:text-base">
              This text adjusts its size based on screen width. On extra-small screens (under 475px), 
              it uses a smaller font size, and on small screens and above, it uses a larger size.
            </p>
          </CardContent>
        </Card>

        {/* Card 5: Flexbox Example */}
        <Card>
          <CardHeader>
            <CardTitle>Flexbox Behavior</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col xs:flex-row gap-2">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg flex-1 text-center">Item 1</div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg flex-1 text-center">Item 2</div>
              <div className="bg-pink-100 dark:bg-pink-900/30 p-3 rounded-lg flex-1 text-center">Item 3</div>
            </div>
          </CardContent>
        </Card>

        {/* Card 6: Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Responsive Form</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                />
              </div>
              <Button className="w-full xs:w-auto">Submit</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Resize your browser window to test responsiveness across different screen sizes.</p>
        <p className="mt-2">Current breakpoint indicators: &lt;475px (extra-small), ≥475px (small), ≥640px (medium), ≥768px (large), ≥1024px (extra-large)</p>
      </div>
    </div>
  );
}