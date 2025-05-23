
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Smartphone, Users } from 'lucide-react';

const Register = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'farmer';
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    firstName: '',
    lastName: '',
    county: '',
    subCounty: '',
    farmerType: '',
    businessName: '',
    businessType: ''
  });

  const kenyanCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Kiambu', 'Kajiado', 
    'Machakos', 'Meru', 'Nyeri', 'Embu', 'Kirinyaga', 'Murang\'a', 'Kitui'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhoneSubmit = () => {
    // Simulate sending OTP
    console.log('Sending OTP to:', formData.phone);
    setStep(2);
  };

  const handleOTPVerification = () => {
    // Simulate OTP verification
    console.log('Verifying OTP:', formData.otp);
    setStep(3);
  };

  const handleRegistrationComplete = () => {
    // Simulate registration completion
    console.log('Registration completed:', formData);
    if (userType === 'farmer') {
      window.location.href = '/farmer-dashboard';
    } else {
      window.location.href = '/buyer-dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">AgriConnect</span>
          </div>
          <Badge className="bg-green-100 text-green-800 px-4 py-2">
            {userType === 'farmer' ? '🌱 Farmer Registration' : '🛒 Buyer Registration'}
          </Badge>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {step === 1 && 'Enter Your Phone Number'}
              {step === 2 && 'Verify Your Number'}
              {step === 3 && 'Complete Your Profile'}
            </CardTitle>
            <div className="flex justify-center space-x-2 mt-4">
              <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-green-600' : 'bg-gray-300'}`} />
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-green-600' : 'bg-gray-300'}`} />
              <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-green-600' : 'bg-gray-300'}`} />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex space-x-2">
                    <div className="flex items-center px-3 py-2 border rounded-md bg-gray-50">
                      <span className="text-sm text-gray-600">+254</span>
                    </div>
                    <Input
                      id="phone"
                      placeholder="712 345 678"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    We'll send an OTP to verify your number
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Secure Registration</h4>
                      <p className="text-sm text-blue-700">
                        Your phone number is used for secure authentication and M-Pesa transactions.
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handlePhoneSubmit}
                  disabled={!formData.phone || formData.phone.length < 9}
                >
                  Send OTP
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    We sent a 6-digit code to <strong>+254{formData.phone}</strong>
                  </p>
                </div>

                <div>
                  <Label htmlFor="otp">Enter OTP Code</Label>
                  <Input
                    id="otp"
                    placeholder="123456"
                    value={formData.otp}
                    onChange={(e) => handleInputChange('otp', e.target.value)}
                    className="text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-sm text-orange-700">
                    Didn't receive the code? Check your SMS or wait 60 seconds to resend.
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={handleOTPVerification}
                    disabled={!formData.otp || formData.otp.length !== 6}
                  >
                    Verify
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <Tabs defaultValue={userType} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="farmer">🌱 Farmer</TabsTrigger>
                    <TabsTrigger value="buyer">🛒 Buyer</TabsTrigger>
                  </TabsList>

                  <TabsContent value="farmer" className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Mwangi"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>County</Label>
                      <Select value={formData.county} onValueChange={(value) => handleInputChange('county', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your county" />
                        </SelectTrigger>
                        <SelectContent>
                          {kenyanCounties.map((county) => (
                            <SelectItem key={county} value={county.toLowerCase()}>
                              {county}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Farming Type</Label>
                      <Select value={formData.farmerType} onValueChange={(value) => handleInputChange('farmerType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="What do you grow?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cereals">Cereals (Maize, Wheat, Rice)</SelectItem>
                          <SelectItem value="vegetables">Vegetables (Tomatoes, Kales, Carrots)</SelectItem>
                          <SelectItem value="fruits">Fruits (Bananas, Mangoes, Avocados)</SelectItem>
                          <SelectItem value="cash-crops">Cash Crops (Tea, Coffee)</SelectItem>
                          <SelectItem value="mixed">Mixed Farming</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="buyer" className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Ahmed"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Khalil"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="businessName">Business Name (Optional)</Label>
                      <Input
                        id="businessName"
                        placeholder="Khalil Trading Company"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange('businessName', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Business Type</Label>
                      <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retailer">Retailer</SelectItem>
                          <SelectItem value="wholesaler">Wholesaler</SelectItem>
                          <SelectItem value="processor">Food Processor</SelectItem>
                          <SelectItem value="exporter">Exporter</SelectItem>
                          <SelectItem value="restaurant">Restaurant/Hotel</SelectItem>
                          <SelectItem value="individual">Individual Consumer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Primary Location</Label>
                      <Select value={formData.county} onValueChange={(value) => handleInputChange('county', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your county" />
                        </SelectTrigger>
                        <SelectContent>
                          {kenyanCounties.map((county) => (
                            <SelectItem key={county} value={county.toLowerCase()}>
                              {county}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Smartphone className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">M-Pesa Ready</h4>
                      <p className="text-sm text-green-700">
                        Your account will be connected to +254{formData.phone} for secure M-Pesa transactions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setStep(2)}
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={handleRegistrationComplete}
                    disabled={!formData.firstName || !formData.lastName || !formData.county}
                  >
                    Complete Registration
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-green-600" />
              <div>
                <h4 className="font-medium text-gray-800">Join 500+ {userType}s</h4>
                <p className="text-sm text-gray-600">
                  {userType === 'farmer' 
                    ? 'Earning 15% more through direct sales' 
                    : 'Saving 12% on fresh produce purchases'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
