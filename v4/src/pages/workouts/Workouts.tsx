import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, Filter, PlusCircle, ArrowUpDown } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { workoutSessions } from '../../data/mockData';
import { WorkoutType } from '../../types';

// Workout type icons
import { FileWarning as Running, Scaling as Walking, Bike, SwissFranc as Swim, Dumbbell, Cog as Yoga, Timer, Activity } from 'lucide-react';

type SortOption = 'date' | 'duration' | 'calories';
type FilterOption = WorkoutType | 'all';

const getWorkoutIcon = (type: WorkoutType, size = 20) => {
  switch (type) {
    case 'running':
      return <Running size={size} />;
    case 'walking':
      return <Walking size={size} />;
    case 'cycling':
      return <Bike size={size} />;
    case 'swimming':
      return <Swim size={size} />;
    case 'strength':
      return <Dumbbell size={size} />;
    case 'yoga':
      return <Yoga size={size} />;
    case 'hiit':
      return <Timer size={size} />;
    default:
      return <Activity size={size} />;
  }
};

const WorkoutItem: React.FC<{ workout: typeof workoutSessions[0] }> = ({ workout }) => {
  const durationMinutes = Math.floor(workout.duration / 60);
  const date = new Date(workout.startTime);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-4 hover:border-primary transition-colors cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-background-dark flex items-center justify-center">
          {getWorkoutIcon(workout.type)}
        </div>
        
        <div className="flex-grow">
          <h3 className="font-medium text-lg capitalize">{workout.type}</h3>
          <p className="text-neutral-400 text-sm">
            {date.toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>
        
        <div className="hidden sm:grid grid-cols-3 gap-6 items-center text-center">
          <div>
            <p className="text-neutral-400 text-xs">Duration</p>
            <p className="font-medium">{durationMinutes} min</p>
          </div>
          
          {workout.caloriesBurned && (
            <div>
              <p className="text-neutral-400 text-xs">Calories</p>
              <p className="font-medium">{workout.caloriesBurned}</p>
            </div>
          )}
          
          {workout.distance && (
            <div>
              <p className="text-neutral-400 text-xs">Distance</p>
              <p className="font-medium">{(workout.distance / 1000).toFixed(1)} km</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Workouts: React.FC = () => {
  const [sort, setSort] = useState<SortOption>('date');
  const [filter, setFilter] = useState<FilterOption>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Apply filters and sorting
  const filteredWorkouts = workoutSessions
    .filter(workout => filter === 'all' || workout.type === filter)
    .sort((a, b) => {
      if (sort === 'date') {
        return new Date(b.startTime).getTime() - new Date(a.startTime).getTime();
      } else if (sort === 'duration') {
        return b.duration - a.duration;
      } else {
        return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
      }
    });
  
  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Workouts</h1>
          <p className="text-neutral-400 mt-1">Track and analyze your fitness activities</p>
        </div>
        
        <div className="flex mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            className="mr-2"
            iconLeft={<Calendar size={16} />}
          >
            Calendar
          </Button>
          <Button 
            variant="primary"
            iconLeft={<PlusCircle size={16} />}
          >
            New Workout
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="mr-2"
              onClick={() => setShowFilters(!showFilters)}
              iconLeft={<Filter size={16} />}
              iconRight={<ChevronDown size={16} />}
            >
              Filter
            </Button>
            
            <Button 
              variant="ghost"
              onClick={() => {
                setSort(prev => {
                  if (prev === 'date') return 'duration';
                  if (prev === 'duration') return 'calories';
                  return 'date';
                });
              }}
              iconLeft={<ArrowUpDown size={16} />}
            >
              Sort: {sort === 'date' ? 'Date' : sort === 'duration' ? 'Duration' : 'Calories'}
            </Button>
          </div>
          
          <div className="text-sm text-neutral-400">
            {filteredWorkouts.length} workouts
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-neutral-800">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Button 
                variant={filter === 'all' ? 'primary' : 'outline'} 
                onClick={() => setFilter('all')}
                className="text-sm"
              >
                All Types
              </Button>
              <Button 
                variant={filter === 'running' ? 'primary' : 'outline'} 
                onClick={() => setFilter('running')}
                className="text-sm"
                iconLeft={<Running size={16} />}
              >
                Running
              </Button>
              <Button 
                variant={filter === 'cycling' ? 'primary' : 'outline'} 
                onClick={() => setFilter('cycling')}
                className="text-sm"
                iconLeft={<Bike size={16} />}
              >
                Cycling
              </Button>
              <Button 
                variant={filter === 'strength' ? 'primary' : 'outline'} 
                onClick={() => setFilter('strength')}
                className="text-sm"
                iconLeft={<Dumbbell size={16} />}
              >
                Strength
              </Button>
            </div>
          </div>
        )}
      </Card>
      
      <div className="space-y-4">
        {filteredWorkouts.map(workout => (
          <WorkoutItem key={workout.id} workout={workout} />
        ))}
        
        {filteredWorkouts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-400">No workouts found with the selected filters</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setFilter('all')}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;