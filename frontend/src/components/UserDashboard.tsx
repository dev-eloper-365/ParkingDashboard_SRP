import { useState } from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { LineChart, Line } from "recharts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const entryData = [
  { day: "Mon", entries: 120 },
  { day: "Tue", entries: 150 },
  { day: "Wed", entries: 180 },
  { day: "Thu", entries: 140 },
  { day: "Fri", entries: 200 },
];

const occupancyData = [
  { week: 1, occupancy: 150 },
  { week: 2, occupancy: 180 },
  { week: 3, occupancy: 200 },
  { week: 4, occupancy: 170 },
];

export default function UserDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Parking Space Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="text-red-500 text-2xl font-bold">
                  Occupied: 150
                </span>
              </div>
              <div>
                <span className="text-green-500 text-2xl font-bold">
                  Vacant: 43
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-red-500 h-4 rounded-full"
                style={{ width: "78%" }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col md:flex-row gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? date.toDateString() : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <div className="flex flex-col gap-2">
            <Card>
              <CardHeader className="p-2">
                <CardTitle className="text-sm">Time In</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="flex items-center justify-center text-lg font-bold">
                  <Clock className="mr-2 h-4 w-4" />
                  9:09 AM
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-2">
                <CardTitle className="text-sm">Time Out</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="flex items-center justify-center text-lg font-bold">
                  <Clock className="mr-2 h-4 w-4" />
                  5:12 PM
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Entry Times</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={entryData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="entries" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Occupancy Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={occupancyData}>
                <XAxis dataKey="week" />
                <YAxis />
                <Line type="monotone" dataKey="occupancy" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
