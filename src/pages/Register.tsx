
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Mail, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Register = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'farmer';
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    county: '',
    subCounty: '',
    farmerType: '',
    businessName: '',
    businessType: '',
    mpesaNumber: ''
  });

  const kenyanCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Kiambu', 'Kajiado', 
    'Machakos', 'Meru', 'Nyeri', 'Embu', 'Kirinyaga', 'Murang\'a', 'Kitui'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = () => {
    if (!formData.email) {
      toast.error('Email address is required');
      return;
    }
    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setStep(2);
  };

  const handlePasswordSubmit = () => {
    if (!formData.password) {
      toast.error('Password is required');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setStep(3);
  };

  const formatMpesaNumber = (number: string) => {
    if (!number) return '';
    const digits = number.replace(/\D/g, '');
    
    if (digits.startsWith('0')) {
      return '+254' + digits.substring(1);
    } else if (digits.startsWith('254')) {
      return '+' + digits;
    } else if (!digits.startsWith('+254') && digits.length >= 9) {
      return '+254' + digits;
    }
    return digits;
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast.error('First name is required');
      return false;
    }
    if (!formData.lastName.trim()) {
      toast.error('Last name is required');
      return false;
    }
    if (!formData.county) {
      toast.error('County is required');
      return false;
    }
    if (userType === 'farmer' && !formData.farmerType) {
      toast.error('Farming type is required');
      return false;
    }
    if (userType === 'buyer' && !formData.businessType) {
      toast.error('Business type is required');
      return false;
    }
    return true;
  };

  const handleRegistrationComplete = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const registrationData = {
        full_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        user_role: userType,
        county: formData.county,
        sub_county: formData.subCounty || '',
        farmer_type: formData.farmerType || '',
        business_name: formData.businessName || '',
        business_type: formData.businessType || '',
        mpesa_number: formData.mpesaNumber ? formatMpesaNumber(formData.mpesaNumber) : ''
      };

      console.log('Registration attempt with data:', registrationData);

      const { data, error } = await signUp(formData.email.trim(), formData.password, registrationData);

      if (error) {
        console.error('Registration error details:', error);
        toast.error(`Registration failed: ${error.message}`);
        return;
      }

      if (data?.user) {
        toast.success('Registration successful! Please check your email to verify your account.');
        navigate('/login');
      } else {
        toast.error('Registration failed: Unexpected response from server');
      }
    } catch (error: any) {
      console.error('Registration exception:', error);
      toast.error(`Registration failed: ${error.message || 'An unexpected error occurred'}`);
    } finally {
      setLoading(false);
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
              {step === 1 && 'Enter Your Email Address'}
              {step === 2 && 'Create Your Password'}
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
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This will be your login email
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Secure Registration</h4>
                      <p className="text-sm text-blue-700">
                        Your email is used for secure authentication. You can also provide your M-Pesa number for payments.
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleEmailSubmit}
                  disabled={!formData.email.trim()}
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    At least 6 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  />
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
                    onClick={handlePasswordSubmit}
                    disabled={!formData.password || !formData.confirmPassword}
                  >
                    Continue
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
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Mwangi"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="mpesaNumber">M-Pesa Number (Optional)</Label>
                      <div className="flex space-x-2">
                        <div className="flex items-center px-3 py-2 border rounded-md bg-gray-50">
                          <span className="text-sm text-gray-600">+254</span>
                        </div>
                        <Input
                          id="mpesaNumber"
                          placeholder="712 345 678"
                          value={formData.mpesaNumber}
                          onChange={(e) => handleInputChange('mpesaNumber', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        For M-Pesa payments and transactions (can be added later)
                      </p>
                    </div>

                    <div>
                      <Label>County *</Label>
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
                      <Label>Farming Type *</Label>
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
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="Ahmed"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Khalil"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="mpesaNumber">M-Pesa Number (Optional)</Label>
                      <div className="flex space-x-2">
                        <div className="flex items-center px-3 py-2 border rounded-md bg-gray-50">
                          <span className="text-sm text-gray-600">+254</span>
                        </div>
                        <Input
                          id="mpesaNumber"
                          placeholder="712 345 678"
                          value={formData.mpesaNumber}
                          onChange={(e) => handleInputChange('mpesaNumber', e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        For M-Pesa payments and transactions (can be added later)
                      </p>
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
                      <Label>Business Type *</Label>
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
                      <Label>Primary Location *</Label>
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
                    <Mail className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Email Authentication</h4>
                      <p className="text-sm text-green-700">
                        Login with {formData.email} and add payment details later.
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
                    disabled={loading || !formData.firstName.trim() || !formData.lastName.trim() || !formData.county}
                  >
                    {loading ? 'Creating Account...' : 'Complete Registration'}
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

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
