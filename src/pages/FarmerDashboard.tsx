
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, TrendingUp, Bell, Package, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const FarmerDashboard = () => {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      crop: 'Maize',
      quantity: '50 bags (90kg each)',
      quality: 'Grade 1',
      price: 'KES 4,500/bag',
      location: 'Nakuru County',
      status: 'Available',
      interested_buyers: 3
    },
    {
      id: 2,
      crop: 'French Beans',
      quantity: '200 kg',
      quality: 'Export Grade',
      price: 'KES 180/kg',
      location: 'Kiambu County',
      status: 'Reserved',
      interested_buyers: 1
    }
  ]);

  const [priceAlerts] = useState([
    { crop: 'Maize', target: 'KES 5,000/bag', current: 'KES 4,200/bag', market: 'Nairobi' },
    { crop: 'Tomatoes', target: 'KES 120/kg', current: 'KES 95/kg', market: 'Mombasa' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-gray-800">AgriConnect</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Alerts (2)
            </Button>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">JM</span>
              </div>
              <span className="text-gray-700">John Mwangi</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, John! 👋</h1>
          <p className="text-gray-600">Here's what's happening with your farm today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Listings</p>
                  <p className="text-2xl font-bold text-gray-800">12</p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">This Month</p>
                  <p className="text-2xl font-bold text-gray-800">KES 45,200</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Interested Buyers</p>
                  <p className="text-2xl font-bold text-gray-800">8</p>
                </div>
                <Bell className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Price Increase</p>
                  <p className="text-2xl font-bold text-green-600">+18%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inventory Management */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">My Produce Inventory</CardTitle>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Produce
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventory.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800">{item.crop}</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                        <Badge 
                          variant={item.status === 'Available' ? 'default' : 'secondary'}
                          className={item.status === 'Available' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {item.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Quantity</p>
                          <p className="font-medium">{item.quantity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Quality</p>
                          <p className="font-medium">{item.quality}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Price</p>
                          <p className="font-medium text-green-600">{item.price}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Interest</p>
                          <p className="font-medium">{item.interested_buyers} buyers</p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-3 w-3 mr-1" />
                          Contact Buyers
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Price Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {priceAlerts.map((alert, index) => (
                    <div key={index} className="border-l-4 border-orange-500 pl-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-gray-800">{alert.crop}</h4>
                        <Badge variant="outline" className="text-xs">
                          {alert.market}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Target: <span className="text-green-600 font-medium">{alert.target}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Current: <span className="font-medium">{alert.current}</span>
                      </p>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Alert
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Market Prices
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Message Center
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Package className="h-4 w-4 mr-2" />
                  Order History
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">💡 Today's Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 text-sm">
                  Maize prices are expected to increase by 8% next week due to increased demand from millers. Consider holding your stock if possible!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
