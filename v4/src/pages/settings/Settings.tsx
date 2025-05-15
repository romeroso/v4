import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Shield, 
  Smartphone, 
  Globe, 
  Moon, 
  Volume2,
  Eye,
  Download,
  Trash2
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    workoutReminders: true,
    healthAlerts: true,
    weeklyReports: false,
    achievements: true
  });

  const [privacy, setPrivacy] = useState({
    shareActivity: false,
    showProfile: true,
    allowDataAnalysis: true
  });

  const handleNotificationChange = (setting: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handlePrivacyChange = (setting: keyof typeof privacy) => {
    setPrivacy(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center mb-6">
            <Bell className="text-primary mr-2" size={24} />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-background-dark rounded-lg">
                <div>
                  <p className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-sm text-neutral-400">
                    Receive notifications for {key.toLowerCase()}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    onChange={() => handleNotificationChange(key as keyof typeof notifications)}
                  />
                  <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center mb-6">
            <Shield className="text-accent-heart mr-2" size={24} />
            <h2 className="text-xl font-semibold">Privacy</h2>
          </div>
          
          <div className="space-y-4">
            {Object.entries(privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-background-dark rounded-lg">
                <div>
                  <p className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-sm text-neutral-400">
                    Control how your data is shared
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    onChange={() => handlePrivacyChange(key as keyof typeof privacy)}
                  />
                  <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-heart/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-heart"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center mb-6">
            <Smartphone className="text-accent-oxygen mr-2" size={24} />
            <h2 className="text-xl font-semibold">App Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-background-dark rounded-lg">
              <div className="flex items-center">
                <Globe size={20} className="text-neutral-400 mr-3" />
                <span>Language</span>
              </div>
              <select className="bg-neutral-800 text-white rounded-lg px-3 py-1.5">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-background-dark rounded-lg">
              <div className="flex items-center">
                <Moon size={20} className="text-neutral-400 mr-3" />
                <span>Theme</span>
              </div>
              <select className="bg-neutral-800 text-white rounded-lg px-3 py-1.5">
                <option>Dark</option>
                <option>Light</option>
                <option>System</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-background-dark rounded-lg">
              <div className="flex items-center">
                <Volume2 size={20} className="text-neutral-400 mr-3" />
                <span>Sound Effects</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-neutral-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-oxygen"></div>
              </label>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center mb-6">
            <Eye className="text-accent-activity mr-2" size={24} />
            <h2 className="text-xl font-semibold">Data & Privacy</h2>
          </div>
          
          <div className="space-y-4">
            <Button
              variant="outline"
              fullWidth
              className="justify-start"
              iconLeft={<Download size={18} />}
            >
              Export Health Data
            </Button>
            
            <Button
              variant="outline"
              fullWidth
              className="justify-start text-accent-heart hover:text-accent-heart"
              iconLeft={<Trash2 size={18} />}
            >
              Delete Account
            </Button>
          </div>
          
          <p className="mt-4 text-sm text-neutral-400">
            Your data is encrypted and stored securely. You can export or delete your data at any time.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Settings;