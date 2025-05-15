import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Award, Calendar, Plus } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import HealthChart from '../../components/metrics/HealthChart';
import { weightData } from '../../data/mockData';

const Goals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'completed'>('current');

  const goals = [
    {
      id: 1,
      title: 'Weight Loss Goal',
      target: '70kg',
      current: '73kg',
      progress: 70,
      deadline: '2024-03-31',
      type: 'weight'
    },
    {
      id: 2,
      title: 'Daily Steps',
      target: '10,000',
      current: '7,500',
      progress: 75,
      deadline: '2024-12-31',
      type: 'steps'
    },
    {
      id: 3,
      title: 'Sleep Duration',
      target: '8 hours',
      current: '6.5 hours',
      progress: 81,
      deadline: '2024-12-31',
      type: 'sleep'
    }
  ];

  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Health Goals</h1>
          <p className="text-neutral-400 mt-1">Track and achieve your health objectives</p>
        </div>
        
        <Button 
          variant="primary"
          iconLeft={<Plus size={16} />}
          className="mt-4 sm:mt-0"
        >
          Set New Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-primary/20 to-primary/5">
          <div className="flex items-center mb-4">
            <Target className="text-primary mr-2" size={24} />
            <h3 className="text-lg font-semibold">Active Goals</h3>
          </div>
          <div className="text-3xl font-bold text-white">5</div>
          <p className="text-neutral-400">Goals in progress</p>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/20 to-secondary/5">
          <div className="flex items-center mb-4">
            <TrendingUp className="text-secondary mr-2" size={24} />
            <h3 className="text-lg font-semibold">Success Rate</h3>
          </div>
          <div className="text-3xl font-bold text-white">85%</div>
          <p className="text-neutral-400">Goals achieved</p>
        </Card>

        <Card className="bg-gradient-to-br from-accent-heart/20 to-accent-heart/5">
          <div className="flex items-center mb-4">
            <Award className="text-accent-heart mr-2" size={24} />
            <h3 className="text-lg font-semibold">Streaks</h3>
          </div>
          <div className="text-3xl font-bold text-white">12</div>
          <p className="text-neutral-400">Days maintained</p>
        </Card>
      </div>

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Weight Progress</h2>
          <div className="flex items-center text-sm text-neutral-400">
            <Calendar size={16} className="mr-1" />
            Last 30 days
          </div>
        </div>
        <div className="h-64">
          <HealthChart data={weightData} type="weight" />
        </div>
      </Card>

      <div className="flex space-x-4 mb-6">
        <Button
          variant={activeTab === 'current' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('current')}
        >
          Current Goals
        </Button>
        <Button
          variant={activeTab === 'completed' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('completed')}
        >
          Completed Goals
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => (
          <Card key={goal.id} className="hover:border-primary transition-colors">
            <h3 className="text-lg font-semibold mb-2">{goal.title}</h3>
            <div className="flex justify-between text-sm text-neutral-400 mb-4">
              <span>Target: {goal.target}</span>
              <span>Current: {goal.current}</span>
            </div>
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-neutral-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${goal.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                />
              </div>
              <div className="flex justify-between text-xs text-neutral-400 mt-1">
                <span>{goal.progress}% Complete</span>
                <span>Due {new Date(goal.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Goals;