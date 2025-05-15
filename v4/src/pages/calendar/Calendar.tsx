import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Activity, Heart } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Calendar: React.FC = () => {
  const [view, setView] = useState<'month' | 'week'>('month');

  const events = [
    {
      title: 'Morning Run',
      date: '2024-02-15',
      type: 'workout',
      details: {
        duration: '45 min',
        distance: '5.2 km',
        calories: 320
      }
    },
    {
      title: 'Weight Check',
      date: '2024-02-16',
      type: 'measurement',
      details: {
        value: '72.5 kg',
        change: '-0.3 kg'
      }
    },
    {
      title: 'Health Check',
      date: '2024-02-20',
      type: 'appointment',
      details: {
        doctor: 'Dr. Smith',
        location: 'City Clinic'
      }
    }
  ];

  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Health Calendar</h1>
          <p className="text-neutral-400 mt-1">Track your health activities and appointments</p>
        </div>
        
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button
            variant={view === 'month' ? 'primary' : 'outline'}
            onClick={() => setView('month')}
          >
            Month
          </Button>
          <Button
            variant={view === 'week' ? 'primary' : 'outline'}
            onClick={() => setView('week')}
          >
            Week
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="overflow-hidden">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: ''
              }}
              height="auto"
              className="health-calendar"
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center mb-4">
              <CalendarIcon className="text-primary mr-2" size={20} />
              <h2 className="text-lg font-semibold">Today's Schedule</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-background-dark rounded-lg">
                <Clock className="text-accent-activity mr-3 mt-1" size={16} />
                <div>
                  <p className="font-medium">Morning Run</p>
                  <p className="text-sm text-neutral-400">7:00 AM - 8:00 AM</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-background-dark rounded-lg">
                <Activity className="text-accent-heart mr-3 mt-1" size={16} />
                <div>
                  <p className="font-medium">Gym Session</p>
                  <p className="text-sm text-neutral-400">6:00 PM - 7:30 PM</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center mb-4">
              <Heart className="text-accent-heart mr-2" size={20} />
              <h2 className="text-lg font-semibold">Health Metrics</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Steps Today</span>
                <span className="font-medium">7,842 / 10,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Active Minutes</span>
                <span className="font-medium">45 / 60</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Calories Burned</span>
                <span className="font-medium">1,245 kcal</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calendar;