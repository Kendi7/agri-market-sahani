
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  TrendingUp, 
  Shield, 
  MapPin, 
  Users, 
  Star,
  ArrowRight,
  LogIn
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">AgriConnect</span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Welcome, {profile?.full_name}</span>
                  <Link 
                    to={profile?.user_role === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard'}
                  >
                    <Button className="bg-green-600 hover:bg-green-700">
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <LogIn className="h-4 w-4" />
                      <span>Sign In</span>
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Join Now
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="bg-green-100 text-green-800 px-4 py-2 mb-6">
              🇰🇪 Made for Kenyan Farmers & Buyers
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect. Trade. Grow.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AgriConnect bridges the gap between small-scale farmers and buyers across Kenya. 
              Get fair prices, skip the middlemen, and grow your agricultural business.
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/register?type=farmer">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                    🌱 I'm a Farmer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/register?type=buyer">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                    🛒 I'm a Buyer
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose AgriConnect?
            </h2>
            <p className="text-xl text-gray-600">
              Built specifically for the Kenyan agricultural market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>M-Pesa Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Secure payments through M-Pesa. No bank account needed. 
                  Get paid instantly when your produce is delivered.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Real-time Market Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get live market prices from Nairobi, Mombasa, Kisumu and other major markets. 
                  Know the best time to sell your crops.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Location-based Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Find buyers and farmers near you. Reduce transport costs and 
                  get fresh produce faster with smart location matching.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Quality Assurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Grade your produce (Grade 1, 2, 3) and build trust through our 
                  rating system. Quality farmers get premium prices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Direct Communication</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Chat directly with buyers and farmers. Negotiate prices, 
                  arrange delivery, and build long-term business relationships.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Fair Trade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No exploitation. Farmers set their own prices. Buyers get competitive 
                  rates. Everyone wins with transparent trading.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-green-100">Active Farmers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">15%</div>
              <div className="text-green-100">Average Price Increase</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">47</div>
              <div className="text-green-100">Counties Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Agricultural Business?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of farmers and buyers already trading on AgriConnect
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register?type=farmer">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Start Selling Your Crops
                </Button>
              </Link>
              <Link to="/register?type=buyer">
                <Button size="lg" variant="outline">
                  Find Quality Produce
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-xl font-bold">AgriConnect</span>
              </div>
              <p className="text-gray-400">
                Empowering Kenyan farmers through direct market access and fair trade.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Farmers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>List Your Produce</li>
                <li>Market Prices</li>
                <li>Quality Grading</li>
                <li>Payment Protection</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Buyers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Find Fresh Produce</li>
                <li>Direct from Farmers</li>
                <li>Quality Assurance</li>
                <li>Local Sourcing</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AgriConnect Kenya. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
