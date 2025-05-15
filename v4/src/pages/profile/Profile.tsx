import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Star, Weight, Ruler, Pencil, Camera, ChevronRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    dateOfBirth: currentUser?.dateOfBirth || '',
    gender: currentUser?.gender || 'prefer-not-to-say',
    height: currentUser?.height || 0,
    weight: currentUser?.weight || 0
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Would update user profile here in a real app
    setIsEditing(false);
  };
  
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="mb-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-primary-light flex items-center justify-center overflow-hidden mb-4">
                  {currentUser?.profilePicture ? (
                    <img 
                      src={currentUser.profilePicture} 
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-white" />
                  )}
                </div>
                <button className="absolute bottom-4 right-0 bg-primary hover:bg-primary-hover rounded-full p-2 text-white transition-all">
                  <Camera size={16} />
                </button>
              </div>
              
              <h2 className="text-xl font-semibold mb-1">{currentUser?.name}</h2>
              <p className="text-neutral-400 mb-4">{currentUser?.email}</p>
              
              <Button 
                variant="outline" 
                size="sm"
                iconLeft={<Pencil size={14} />}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </div>
          </Card>
          
          <Card>
            <h3 className="text-lg font-medium mb-4">Account Settings</h3>
            
            <ul className="space-y-2">
              <li>
                <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-900 transition-colors flex justify-between items-center">
                  <span>Security Settings</span>
                  <ChevronRight size={16} className="text-neutral-500" />
                </button>
              </li>
              <li>
                <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-900 transition-colors flex justify-between items-center">
                  <span>Notification Preferences</span>
                  <ChevronRight size={16} className="text-neutral-500" />
                </button>
              </li>
              <li>
                <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-900 transition-colors flex justify-between items-center">
                  <span>Connected Apps</span>
                  <ChevronRight size={16} className="text-neutral-500" />
                </button>
              </li>
              <li>
                <button className="w-full text-left p-3 rounded-lg hover:bg-neutral-900 transition-colors flex justify-between items-center">
                  <span>Data &amp; Privacy</span>
                  <ChevronRight size={16} className="text-neutral-500" />
                </button>
              </li>
            </ul>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <Input
                    label="Full Name"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    icon={<User size={18} />}
                    fullWidth
                  />
                  
                  <Input
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={<Mail size={18} />}
                    fullWidth
                  />
                  
                  <Input
                    label="Date of Birth"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    icon={<Calendar size={18} />}
                    fullWidth
                  />
                  
                  <div className="mb-4">
                    <label 
                      htmlFor="gender" 
                      className="block text-sm font-medium text-neutral-300 mb-1"
                    >
                      Gender
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                        <Star size={18} />
                      </div>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="bg-neutral-950 rounded-lg px-4 py-2.5 pl-10 text-white w-full transition-all duration-200 border border-neutral-800 focus:border-primary focus:ring-1 focus:ring-primary"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
                  
                  <Input
                    label="Height (cm)"
                    id="height"
                    name="height"
                    type="number"
                    value={formData.height || ''}
                    onChange={handleChange}
                    icon={<Ruler size={18} />}
                    fullWidth
                  />
                  
                  <Input
                    label="Weight (kg)"
                    id="weight"
                    name="weight"
                    type="number"
                    value={formData.weight || ''}
                    onChange={handleChange}
                    icon={<Weight size={18} />}
                    fullWidth
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Save Changes
                  </Button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    iconLeft={<Pencil size={14} />}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Full Name</p>
                    <p className="font-medium">{currentUser?.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Email</p>
                    <p className="font-medium">{currentUser?.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Date of Birth</p>
                    <p className="font-medium">
                      {currentUser?.dateOfBirth || 'Not set'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Gender</p>
                    <p className="font-medium capitalize">
                      {currentUser?.gender?.replace('-', ' ') || 'Not set'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Height</p>
                    <p className="font-medium">
                      {currentUser?.height ? `${currentUser.height} cm` : 'Not set'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-neutral-400 text-sm mb-1">Weight</p>
                    <p className="font-medium">
                      {currentUser?.weight ? `${currentUser.weight} kg` : 'Not set'}
                    </p>
                  </div>
                </div>
              </>
            )}
          </Card>
          
          <Card className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Health Goals</h2>
            
            <div className="space-y-4">
              <div className="p-4 border border-neutral-800 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Daily Steps</h3>
                  <span className="text-neutral-400">10,000 steps</span>
                </div>
                <div className="w-full bg-background-dark rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-sm text-neutral-500">
                  <span>6,500 / 10,000</span>
                  <span>65%</span>
                </div>
              </div>
              
              <div className="p-4 border border-neutral-800 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Weight Goal</h3>
                  <span className="text-neutral-400">68 kg</span>
                </div>
                <div className="w-full bg-background-dark rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-sm text-neutral-500">
                  <span>70 kg → 68 kg</span>
                  <span>2 kg to go</span>
                </div>
              </div>
              
              <div className="p-4 border border-neutral-800 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Active Minutes</h3>
                  <span className="text-neutral-400">30 min / day</span>
                </div>
                <div className="w-full bg-background-dark rounded-full h-2">
                  <div className="bg-accent-heart h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-sm text-neutral-500">
                  <span>12 min / 30 min</span>
                  <span>40%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline">
                Set New Goal
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;