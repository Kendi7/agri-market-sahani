
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Phone, Star, Filter, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const BuyerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');

  const [availableProduce] = useState([
    {
      id: 1,
      farmer: 'John Mwangi',
      phone: '+254 712 345 678',
      crop: 'Maize',
      quantity: '50 bags (90kg)',
      quality: 'Grade 1',
      price: 'KES 4,500/bag',
      location: 'Nakuru County',
      distance: '25 km',
      rating: 4.8,
      verified: true,
      harvestDate: '2024-01-15',
      description: 'High-quality yellow maize, properly dried and stored. Available for immediate pickup.'
    },
    {
      id: 2,
      farmer: 'Mary Wanjiku',
      phone: '+254 721 987 654',
      crop: 'French Beans',
      quantity: '200 kg',
      quality: 'Export Grade',
      price: 'KES 180/kg',
      location: 'Kiambu County',
      distance: '15 km',
      rating: 4.9,
      verified: true,
      harvestDate: '2024-01-20',
      description: 'Fresh export-quality French beans. Organic certified, perfect for export market.'
    },
    {
      id: 3,
      farmer: 'Peter Kimani',
      phone: '+254 733 456 789',
      crop: 'Tomatoes',
      quantity: '300 kg',
      quality: 'Grade 1',
      price: 'KES 95/kg',
      location: 'Kajiado County',
      distance: '45 km',
      rating: 4.6,
      verified: true,
      harvestDate: '2024-01-22',
      description: 'Fresh tomatoes, perfect for retail. Well-sorted and packaged in crates.'
    }
  ]);

  const [recentOrders] = useState([
    {
      id: 'ORD-001',
      farmer: 'Sarah Muthoni',
      crop: 'Carrots',
      quantity: '150 kg',
      amount: 'KES 12,000',
      status: 'Delivered',
      date: '2024-01-18'
    },
    {
      id: 'ORD-002',
      farmer: 'James Ochieng',
      crop: 'Spinach',
      quantity: '80 kg',
      amount: 'KES 4,800',
      status: 'In Transit',
      date: '2024-01-20'
    }
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
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart (3)
            </Button>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">AK</span>
              </div>
              <span className="text-gray-700">Ahmed Khalil</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Fresh Produce 🛒</h1>
          <p className="text-gray-600">Connect directly with farmers in your area for the freshest agricultural products.</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Search Produce</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="e.g., Maize, Tomatoes..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label>Crop Type</Label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="All crops" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="beans">Beans</SelectItem>
                    <SelectItem value="tomatoes">Tomatoes</SelectItem>
                    <SelectItem value="french-beans">French Beans</SelectItem>
                    <SelectItem value="carrots">Carrots</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Location</Label>
                <Select value={selectedCounty} onValueChange={setSelectedCounty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All counties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nairobi">Nairobi</SelectItem>
                    <SelectItem value="kiambu">Kiambu</SelectItem>
                    <SelectItem value="nakuru">Nakuru</SelectItem>
                    <SelectItem value="kajiado">Kajiado</SelectItem>
                    <SelectItem value="meru">Meru</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Filter className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Produce */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Available Produce Near You</CardTitle>
                <p className="text-sm text-gray-600">Fresh produce from verified farmers within 50km</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {availableProduce.map((produce) => (
                    <div key={produce.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800 mb-1">{produce.crop}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <span className="font-medium">{produce.farmer}</span>
                              {produce.verified && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{produce.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">{produce.price}</p>
                          <p className="text-sm text-gray-500">{produce.quantity} available</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Quality Grade</p>
                          <p className="font-medium">{produce.quality}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="font-medium">{produce.location}</span>
                            <span className="text-gray-500">({produce.distance})</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Harvest Date</p>
                          <p className="font-medium">{new Date(produce.harvestDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4">{produce.description}</p>

                      <div className="flex space-x-3">
                        <Button className="bg-green-600 hover:bg-green-700">
                          Place Order
                        </Button>
                        <Button variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Farmer
                        </Button>
                        <Button variant="outline">
                          Add to Cart
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
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Orders</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-bold text-green-600">KES 85,400</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg Savings</span>
                  <span className="font-bold text-green-600">12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Favorite Farmers</span>
                  <span className="font-bold">6</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border-l-4 border-green-500 pl-4">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-gray-800">{order.crop}</h4>
                        <Badge 
                          variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                          className={order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{order.farmer}</p>
                      <p className="text-sm text-gray-600">{order.quantity} - {order.amount}</p>
                      <p className="text-xs text-gray-500">{order.date}</p>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    View All Orders
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Market Insights */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">📊 Market Insight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 text-sm mb-3">
                  Tomato prices have dropped 15% this week due to increased supply from Kajiado farms. Great time to stock up!
                </p>
                <Button variant="outline" size="sm" className="w-full border-blue-300 text-blue-700">
                  View Market Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
