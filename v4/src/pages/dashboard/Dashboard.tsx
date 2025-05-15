import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeartPulse, Scale, Moon, Droplets, Activity, Zap, Timer, Dumbbell, Plus, ArrowRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import MetricCard from '../../components/metrics/MetricCard';
import HealthChart from '../../components/metrics/HealthChart';
import { useAuth } from '../../context/AuthContext';
import { 
  heartRateData, 
  sleepData, 
  weightData, 
  bloodOxygenData, 
  stressData, 
  workoutSessions
} from '../../data/mockData';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Get the latest metrics
  const latestHeartRate = heartRateData[heartRateData.length - 1];
  const latestSleep = sleepData[0];
  const latestWeight = weightData[0];
  const latestOxygen = bloodOxygenData[bloodOxygenData.length - 1];
  const latestStress = stressData[0];
  
  // Get the latest workout
  const latestWorkout = workoutSessions[0];
  
  // Workout duration in minutes
  const workoutDuration = Math.floor(latestWorkout.duration / 60);
  
  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-3xl font-bold text-white"
          >
            Welcome back, {currentUser?.name.split(' ')[0]}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-neutral-400 mt-1"
          >
            Here's an overview of your health today
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/health" className="btn-primary flex items-center">
            <Plus size={18} className="mr-1" />
            Add Data
          </Link>
        </motion.div>
      </div>
      
      {/* Health metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <MetricCard
            title="Heart Rate"
            value={latestHeartRate.value}
            unit="bpm"
            icon={<HeartPulse size={18} />}
            type="heart-rate"
            change={{ value: 2.5, isPositive: false }}
            onClick={() => {}}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <MetricCard
            title="Weight"
            value={latestWeight.value}
            unit="kg"
            icon={<Scale size={18} />}
            type="weight"
            change={{ value: 0.3, isPositive: true }}
            onClick={() => {}}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <MetricCard
            title="Sleep"
            value={Math.floor(latestSleep.value / 60)}
            unit="hr"
            icon={<Moon size={18} />}
            type="sleep"
            change={{ value: 5, isPositive: true }}
            onClick={() => {}}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          <MetricCard
            title="Blood Oxygen"
            value={latestOxygen.value}
            unit="%"
            icon={<Droplets size={18} />}
            type="blood-oxygen"
            onClick={() => {}}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <MetricCard
            title="Stress"
            value={latestStress.value}
            unit="/100"
            icon={<Activity size={18} />}
            type="stress"
            change={{ value: 10, isPositive: false }}
            onClick={() => {}}
          />
        </motion.div>
      </div>
      
      {/* Charts and additional info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card title="Heart Rate" subtitle="Last 24 hours">
            <HealthChart data={heartRateData} type="heart-rate" />
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card 
            title="Today's Activity" 
            subtitle="Daily progress"
            className="h-full"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="text-accent-activity mr-2" size={20} />
                  <div>
                    <p className="text-sm text-neutral-400">Steps</p>
                    <p className="text-xl font-semibold text-white">7,842</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-accent-activity flex items-center justify-center">
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Timer className="text-accent-heart mr-2" size={20} />
                  <div>
                    <p className="text-sm text-neutral-400">Active Minutes</p>
                    <p className="text-xl font-semibold text-white">34</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-accent-heart flex items-center justify-center">
                  <span className="text-sm font-medium">42%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Dumbbell className="text-accent-oxygen mr-2" size={20} />
                  <div>
                    <p className="text-sm text-neutral-400">Calories</p>
                    <p className="text-xl font-semibold text-white">1,245</p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-accent-oxygen flex items-center justify-center">
                  <span className="text-sm font-medium">62%</span>
                </div>
              </div>
              
              <Link 
                to="/workouts" 
                className="flex items-center text-primary hover:text-primary-hover transition-colors mt-4"
              >
                <span className="text-sm font-medium">View all activities</span>
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* Latest Workout Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-white mb-4">Latest Workout</h2>
        <div className="card p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-12 h-12 bg-primary-light bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <Dumbbell className="text-primary-light" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg capitalize">{latestWorkout.type}</h3>
                <p className="text-neutral-400 text-sm">
                  {new Date(latestWorkout.startTime).toLocaleDateString(undefined, {
                    weekday: 'long',
                    month: 'short',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4 md:mt-0">
              <div className="text-center">
                <p className="text-neutral-400 text-sm">Duration</p>
                <p className="text-xl font-semibold">{workoutDuration} min</p>
              </div>
              <div className="text-center">
                <p className="text-neutral-400 text-sm">Calories</p>
                <p className="text-xl font-semibold">{latestWorkout.caloriesBurned}</p>
              </div>
              <div className="text-center">
                <p className="text-neutral-400 text-sm">Heart Rate</p>
                <p className="text-xl font-semibold">{latestWorkout.avgHeartRate} bpm</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center ml-4">
              <Link 
                to={`/workouts/${latestWorkout.id}`}
                className="btn-outline"
              >
                View Details
              </Link>
            </div>
          </div>
          <div className="mt-4 lg:hidden">
            <Link 
              to={`/workouts/${latestWorkout.id}`}
              className="btn-outline w-full text-center"
            >
              View Details
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;