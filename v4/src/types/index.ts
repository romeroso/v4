export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  height?: number; // in cm
  weight?: number; // in kg
}

export interface HealthMetric {
  id: string;
  userId: string;
  timestamp: string;
  type: MetricType;
  value: number;
  unit: string;
  source?: string;
}

export type MetricType = 
  | 'heart-rate' 
  | 'weight' 
  | 'sleep' 
  | 'blood-oxygen' 
  | 'stress' 
  | 'hrv' 
  | 'steps'
  | 'calories'
  | 'distance';

export interface WorkoutSession {
  id: string;
  userId: string;
  type: WorkoutType;
  startTime: string;
  endTime: string;
  duration: number; // in seconds
  caloriesBurned?: number;
  avgHeartRate?: number;
  maxHeartRate?: number;
  distance?: number; // in meters
  route?: GeoPoint[];
}

export type WorkoutType = 
  | 'running'
  | 'walking'
  | 'cycling'
  | 'swimming'
  | 'strength'
  | 'yoga'
  | 'hiit'
  | 'other';

export interface GeoPoint {
  latitude: number;
  longitude: number;
  timestamp: string;
  elevation?: number;
}

export interface ConnectedDevice {
  id: string;
  userId: string;
  name: string;
  type: DeviceType;
  lastSync?: string;
  batteryLevel?: number;
  isConnected: boolean;
}

export type DeviceType = 
  | 'smartwatch'
  | 'fitnesstracker'
  | 'heartratemonitor'
  | 'smartphone'
  | 'smartscale'
  | 'other';

export interface DailyMetricSummary {
  date: string;
  metrics: {
    heartRate?: {
      avg: number;
      min: number;
      max: number;
      restingRate?: number;
    };
    bloodOxygen?: {
      avg: number;
      min: number;
      max: number;
    };
    sleep?: {
      duration: number; // in minutes
      deepSleep: number;
      lightSleep: number;
      remSleep: number;
      awake: number;
    };
    weight?: number;
    steps?: number;
    calories?: number;
    distance?: number;
    stress?: number; // 0-100 scale
    hrvs?: number[]; // heart rate variability measurements
  };
}