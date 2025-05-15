import { 
  HealthMetric, 
  WorkoutSession, 
  ConnectedDevice, 
  DailyMetricSummary 
} from '../types';

// Generate random data within a range
const randomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate dates for past days
const getDayOffset = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// Mock heart rate data (past 24 hours, readings every hour)
export const heartRateData: HealthMetric[] = Array.from({ length: 24 }, (_, i) => {
  const hourAgo = new Date();
  hourAgo.setHours(hourAgo.getHours() - (23 - i));
  
  return {
    id: `hr-${i}`,
    userId: '1',
    timestamp: hourAgo.toISOString(),
    type: 'heart-rate',
    value: randomInRange(60, 100), // Resting heart rate values
    unit: 'bpm',
    source: 'Apple Watch'
  };
});

// Mock sleep data for past week
export const sleepData: HealthMetric[] = Array.from({ length: 7 }, (_, i) => {
  return {
    id: `sleep-${i}`,
    userId: '1',
    timestamp: getDayOffset(i),
    type: 'sleep',
    value: randomInRange(360, 540), // Sleep in minutes (6-9 hours)
    unit: 'min',
    source: 'Apple Watch'
  };
});

// Mock weight data for past 2 weeks
export const weightData: HealthMetric[] = Array.from({ length: 14 }, (_, i) => {
  return {
    id: `weight-${i}`,
    userId: '1',
    timestamp: getDayOffset(i * 2), // Every other day
    type: 'weight',
    value: 70 + randomInRange(-1.5, 1.5), // Weight fluctuations around 70kg
    unit: 'kg',
    source: 'Smart Scale'
  };
});

// Mock blood oxygen data
export const bloodOxygenData: HealthMetric[] = Array.from({ length: 24 }, (_, i) => {
  const hourAgo = new Date();
  hourAgo.setHours(hourAgo.getHours() - (23 - i));
  
  return {
    id: `oxygen-${i}`,
    userId: '1',
    timestamp: hourAgo.toISOString(),
    type: 'blood-oxygen',
    value: randomInRange(95, 100), // Blood oxygen percentage
    unit: '%',
    source: 'Apple Watch'
  };
});

// Mock stress data
export const stressData: HealthMetric[] = Array.from({ length: 7 }, (_, i) => {
  return {
    id: `stress-${i}`,
    userId: '1',
    timestamp: getDayOffset(i),
    type: 'stress',
    value: randomInRange(10, 80), // Stress level (0-100)
    unit: 'score',
    source: 'Health App'
  };
});

// Mock heart rate variability data
export const hrvData: HealthMetric[] = Array.from({ length: 7 }, (_, i) => {
  return {
    id: `hrv-${i}`,
    userId: '1',
    timestamp: getDayOffset(i),
    type: 'hrv',
    value: randomInRange(30, 70), // HRV in ms
    unit: 'ms',
    source: 'Apple Watch'
  };
});

// Mock workout sessions
export const workoutSessions: WorkoutSession[] = [
  {
    id: 'workout-1',
    userId: '1',
    type: 'running',
    startTime: getDayOffset(1),
    endTime: (() => {
      const date = new Date(getDayOffset(1));
      date.setMinutes(date.getMinutes() + 35);
      return date.toISOString();
    })(),
    duration: 35 * 60, // 35 minutes in seconds
    caloriesBurned: 320,
    avgHeartRate: 145,
    maxHeartRate: 175,
    distance: 5200, // 5.2 km
    route: [] // Would contain GPS coordinates in real app
  },
  {
    id: 'workout-2',
    userId: '1',
    type: 'cycling',
    startTime: getDayOffset(3),
    endTime: (() => {
      const date = new Date(getDayOffset(3));
      date.setMinutes(date.getMinutes() + 60);
      return date.toISOString();
    })(),
    duration: 60 * 60, // 60 minutes in seconds
    caloriesBurned: 450,
    avgHeartRate: 135,
    maxHeartRate: 160,
    distance: 18000, // 18 km
    route: [] // Would contain GPS coordinates in real app
  },
  {
    id: 'workout-3',
    userId: '1',
    type: 'strength',
    startTime: getDayOffset(5),
    endTime: (() => {
      const date = new Date(getDayOffset(5));
      date.setMinutes(date.getMinutes() + 45);
      return date.toISOString();
    })(),
    duration: 45 * 60, // 45 minutes in seconds
    caloriesBurned: 280,
    avgHeartRate: 125,
    maxHeartRate: 140
  }
];

// Mock connected devices
export const connectedDevices: ConnectedDevice[] = [
  {
    id: 'device-1',
    userId: '1',
    name: 'Apple Watch Series 8',
    type: 'smartwatch',
    lastSync: new Date().toISOString(),
    batteryLevel: 72,
    isConnected: true
  },
  {
    id: 'device-2',
    userId: '1',
    name: 'Fitbit Charge 5',
    type: 'fitnesstracker',
    lastSync: getDayOffset(2),
    batteryLevel: 45,
    isConnected: false
  },
  {
    id: 'device-3',
    userId: '1',
    name: 'Withings Body+',
    type: 'smartscale',
    lastSync: getDayOffset(3),
    isConnected: false
  }
];

// Daily metric summaries for a week
export const dailySummaries: DailyMetricSummary[] = Array.from({ length: 7 }, (_, i) => {
  return {
    date: getDayOffset(i),
    metrics: {
      heartRate: {
        avg: randomInRange(65, 80),
        min: randomInRange(50, 60),
        max: randomInRange(100, 140),
        restingRate: randomInRange(55, 65)
      },
      bloodOxygen: {
        avg: randomInRange(96, 99),
        min: randomInRange(94, 96),
        max: randomInRange(99, 100)
      },
      sleep: {
        duration: randomInRange(360, 540), // 6-9 hours in minutes
        deepSleep: randomInRange(60, 120),
        lightSleep: randomInRange(180, 240),
        remSleep: randomInRange(60, 120),
        awake: randomInRange(15, 45)
      },
      weight: 70 + randomInRange(-1, 1),
      steps: randomInRange(6000, 12000),
      calories: randomInRange(1800, 2500),
      distance: randomInRange(3, 8) * 1000, // 3-8 km in meters
      stress: randomInRange(20, 70), // 0-100 scale
      hrvs: Array.from({ length: 5 }, () => randomInRange(30, 70))
    }
  };
});

// Get all health metrics combined
export const getAllHealthMetrics = (): HealthMetric[] => {
  return [
    ...heartRateData,
    ...sleepData,
    ...weightData,
    ...bloodOxygenData,
    ...stressData,
    ...hrvData
  ];
};