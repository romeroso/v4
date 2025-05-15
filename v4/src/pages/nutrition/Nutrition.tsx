import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, BarChart2, Apple, Plus, TrendingUp, Scale, Coffee } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Pie, Bar } from 'react-chartjs-2';

const Nutrition: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month'>('day');

  const macroData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [{
      data: [25, 55, 20],
      backgroundColor: ['#FF9500', '#34C759', '#FF2D55'],
      borderWidth: 0
    }]
  };

  const calorieData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Calories',
      data: [2100, 1950, 2200, 2300, 1800, 2150, 2000],
      backgroundColor: '#0A84FF',
      borderRadius: 8
    }]
  };

  const meals = [
    {
      name: 'Breakfast',
      time: '8:00 AM',
      calories: 450,
      items: ['Oatmeal', 'Banana', 'Almonds']
    },
    {
      name: 'Lunch',
      time: '1:00 PM',
      calories: 650,
      items: ['Grilled Chicken', 'Brown Rice', 'Vegetables']
    },
    {
      name: 'Dinner',
      time: '7:00 PM',
      calories: 550,
      items: ['Salmon', 'Quinoa', 'Broccoli']
    }
  ];

  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Nutrition Tracking</h1>
          <p className="text-neutral-400 mt-1">Monitor your daily nutrition and meals</p>
        </div>
        
        <Button 
          variant="primary"
          iconLeft={<Plus size={16} />}
          className="mt-4 sm:mt-0"
        >
          Log Meal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="flex items-center mb-4">
            <Apple className="text-accent-activity mr-2" size={24} />
            <h3 className="text-lg font-semibold">Calories</h3>
          </div>
          <div className="text-3xl font-bold">1,850</div>
          <p className="text-neutral-400">of 2,200 goal</p>
          <div className="mt-2 h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-accent-activity" style={{ width: '84%' }}></div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center mb-4">
            <Coffee className="text-accent-heart mr-2" size={24} />
            <h3 className="text-lg font-semibold">Water</h3>
          </div>
          <div className="text-3xl font-bold">1.8L</div>
          <p className="text-neutral-400">of 2.5L goal</p>
          <div className="mt-2 h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-accent-heart" style={{ width: '72%' }}></div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center mb-4">
            <Scale className="text-accent-oxygen mr-2" size={24} />
            <h3 className="text-lg font-semibold">Protein</h3>
          </div>
          <div className="text-3xl font-bold">85g</div>
          <p className="text-neutral-400">of 120g goal</p>
          <div className="mt-2 h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-accent-oxygen" style={{ width: '71%' }}></div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Macronutrients</h2>
            <PieChart size={20} className="text-neutral-400" />
          </div>
          <div className="h-64">
            <Pie data={macroData} options={{
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    color: '#8E8E93'
                  }
                }
              }
            }} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Calorie Intake</h2>
            <div className="flex space-x-2">
              {['day', 'week', 'month'].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange(range as typeof timeRange)}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="h-64">
            <Bar data={calorieData} options={{
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: '#3A3A3C'
                  },
                  ticks: {
                    color: '#8E8E93'
                  }
                },
                x: {
                  grid: {
                    display: false
                  },
                  ticks: {
                    color: '#8E8E93'
                  }
                }
              },
              plugins: {
                legend: {
                  display: false
                }
              }
            }} />
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Today's Meals</h2>
          <TrendingUp size={20} className="text-neutral-400" />
        </div>
        <div className="space-y-4">
          {meals.map((meal, index) => (
            <div key={index} className="p-4 bg-background-dark rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{meal.name}</h3>
                  <p className="text-sm text-neutral-400">{meal.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{meal.calories} kcal</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {meal.items.map((item, i) => (
                  <span key={i} className="px-2 py-1 bg-neutral-800 rounded-full text-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Nutrition;