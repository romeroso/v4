import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { connectedDevices } from '../../data/mockData';
import { Battery, Bluetooth, RefreshCw, Plus, Smartphone, Trash, Settings, Watch, Database } from 'lucide-react';

const DeviceCard: React.FC<{
  device: typeof connectedDevices[0];
  onConnect: () => void;
  onDisconnect: () => void;
  onSync: () => void;
}> = ({ device, onConnect, onDisconnect, onSync }) => {
  const lastSyncDate = device.lastSync ? new Date(device.lastSync) : null;
  const [syncing, setSyncing] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  
  const getDeviceIcon = () => {
    switch (device.type) {
      case 'smartwatch':
        return <Watch size={24} />;
      case 'fitnesstracker':
        return <Watch size={24} />;
      case 'smartscale':
        return <Database size={24} />;
      default:
        return <Smartphone size={24} />;
    }
  };

  const handleSync = () => {
    setSyncing(true);
    onSync();
    // Simulate sync process
    setTimeout(() => setSyncing(false), 2000);
  };
  
  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      onConnect();
      setIsConnecting(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            device.isConnected ? 'bg-primary bg-opacity-20' : 'bg-neutral-800'
          }`}>
            {getDeviceIcon()}
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-white">{device.name}</h3>
            <div className="flex items-center text-sm">
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                device.isConnected ? 'bg-green-500' : 'bg-neutral-600'
              }`}></span>
              <span className="text-neutral-400">
                {device.isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
        
        {device.batteryLevel !== undefined && (
          <div className="text-right">
            <div className="flex items-center text-sm text-neutral-400">
              <Battery size={16} className="mr-1" />
              <span>{device.batteryLevel}%</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <div className="text-sm text-neutral-500">
          Last synced: {lastSyncDate ? lastSyncDate.toLocaleString() : 'Never'}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {device.isConnected ? (
          <>
            <Button 
              variant="outline" 
              size="sm"
              iconLeft={<RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />}
              onClick={handleSync}
              isLoading={syncing}
            >
              {syncing ? 'Syncing...' : 'Sync Now'}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              iconLeft={<Settings size={14} />}
            >
              Settings
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              iconLeft={<Bluetooth size={14} />}
              onClick={onDisconnect}
              className="text-red-500 hover:text-red-400"
            >
              Disconnect
            </Button>
          </>
        ) : (
          <Button 
            variant="primary" 
            size="sm"
            iconLeft={<Bluetooth size={14} />}
            onClick={handleConnect}
            isLoading={isConnecting}
          >
            Connect
          </Button>
        )}
      </div>
    </motion.div>
  );
};

const Devices: React.FC = () => {
  const [devices, setDevices] = useState(connectedDevices);
  
  const handleConnect = (id: string) => {
    setDevices(prev => 
      prev.map(device => 
        device.id === id 
        ? { ...device, isConnected: true, lastSync: new Date().toISOString() } 
        : device
      )
    );
  };
  
  const handleDisconnect = (id: string) => {
    setDevices(prev => 
      prev.map(device => 
        device.id === id 
        ? { ...device, isConnected: false } 
        : device
      )
    );
  };
  
  const handleSync = (id: string) => {
    setDevices(prev => 
      prev.map(device => 
        device.id === id 
        ? { ...device, lastSync: new Date().toISOString() } 
        : device
      )
    );
  };
  
  const [showAddDevice, setShowAddDevice] = useState(false);
  
  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Connected Devices</h1>
          <p className="text-neutral-400 mt-1">Manage your devices and sync health data</p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <Button 
            variant="primary"
            iconLeft={<Plus size={16} />}
            onClick={() => setShowAddDevice(!showAddDevice)}
          >
            Add Device
          </Button>
        </div>
      </div>
      
      {showAddDevice && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6"
        >
          <Card>
            <h2 className="text-lg font-medium mb-4">Add a new device</h2>
            <p className="text-neutral-400 mb-4">
              To add a new device, make sure Bluetooth is enabled on your computer and the device is in pairing mode.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="outline"
                iconLeft={<Watch size={18} />}
              >
                Smart Watch
              </Button>
              <Button 
                variant="outline"
                iconLeft={<Watch size={18} />}
              >
                Fitness Tracker
              </Button>
              <Button 
                variant="outline"
                iconLeft={<Database size={18} />}
              >
                Smart Scale
              </Button>
              <Button 
                variant="outline"
                iconLeft={<Smartphone size={18} />}
              >
                Other Device
              </Button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-neutral-800">
              <div className="flex justify-between items-center">
                <div className="text-neutral-400">
                  <Bluetooth size={18} className="inline mr-2" />
                  Searching for devices...
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  iconLeft={<RefreshCw size={14} />}
                >
                  Refresh
                </Button>
              </div>
              
              <div className="mt-4 bg-background-dark rounded-lg p-4 animate-pulse">
                <p className="text-neutral-500">No new devices found</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map(device => (
          <DeviceCard 
            key={device.id}
            device={device}
            onConnect={() => handleConnect(device.id)}
            onDisconnect={() => handleDisconnect(device.id)}
            onSync={() => handleSync(device.id)}
          />
        ))}
      </div>
      
      {devices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-400">No devices connected</p>
          <Button 
            variant="primary" 
            className="mt-4"
            onClick={() => setShowAddDevice(true)}
          >
            Add Your First Device
          </Button>
        </div>
      )}
    </div>
  );
};

export default Devices;