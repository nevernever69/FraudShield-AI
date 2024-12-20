import React, { useState } from 'react';
import { 
  Bell, Menu, User, Activity, Shield, AlertTriangle, FileText, 
  Home, PieChart as PieChartIcon, Settings, LogOut, Upload, 
  Download, AlertCircle, Check, FileSpreadsheet
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

import { 
  analyzePremiumFraud,
  analyzeDocumentForgery,
  analyzeIdentityFraud,
  analyzeClaimsFraud
} from './fraudAnalysis';

// Enhanced mock data
const mockData = {
  trends: [
    { month: 'Jan', fraudCases: 65, legitimateCases: 890, approved: 780, rejected: 175 },
    { month: 'Feb', fraudCases: 78, legitimateCases: 920, approved: 810, rejected: 188 },
    { month: 'Mar', fraudCases: 89, legitimateCases: 950, approved: 840, rejected: 199 },
    { month: 'Apr', fraudCases: 72, legitimateCases: 880, approved: 790, rejected: 162 },
  ],
  fraudTypes: [
    { type: 'Identity Theft', count: 32, risk: 'High', change: '+12%' },
    { type: 'Premium Fraud', count: 28, risk: 'Medium', change: '-5%' },
    { type: 'Claim Inflation', count: 18, risk: 'Low', change: '+8%' },
    { type: 'Document Forgery', count: 11, risk: 'High', change: '+15%' },
  ],
  recentCases: [
    { id: '001', type: 'Identity Theft', amount: '$12,450', date: '2024-03-15', status: 'High Risk' },
    { id: '002', type: 'Premium Fraud', amount: '$8,900', date: '2024-03-14', status: 'Medium Risk' },
    { id: '003', type: 'Claim Inflation', amount: '$15,600', date: '2024-03-13', status: 'Low Risk' },
  ]
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Claims Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.fraudTypes}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {mockData.fraudTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Claims Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="approved" fill="#4ade80" name="Approved" />
                  <Bar dataKey="rejected" fill="#f87171" name="Rejected" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const RiskAssessment = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockData.fraudTypes.map((type, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{type.type}</span>
                  <span className="text-sm text-gray-500">{type.change}</span>
                </div>
                <Progress 
                  value={type.count / 0.4} 
                  className={type.risk === 'High' ? 'bg-red-200' : type.risk === 'Medium' ? 'bg-yellow-200' : 'bg-green-200'}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
const DataAnalysis = () => {
  const [file, setFile] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Previous analysis functions remain the same...

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      analyzeFile(file);
    }
  };

  const analyzeFile = async (file) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const results = {
        premiumFraud: analyzePremiumFraud(),
        documentForgery: analyzeDocumentForgery(),
        identityFraud: analyzeIdentityFraud(),
        claimsFraud: analyzeClaimsFraud(),
        overallRisk: Math.random() * 100
      };

      setAnalysisResults(results);
    } catch (err) {
      setError('Error analyzing file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Analysis</CardTitle>
          <CardDescription>
            Upload your dataset for fraud detection analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".csv,.xlsx,.json"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <div className="p-4 rounded-full bg-blue-50 mb-4">
                <FileSpreadsheet className="h-8 w-8 text-blue-500" />
              </div>
              <Button variant="outline" className="mb-2">Choose File</Button>
              <p className="text-sm text-gray-500">
                Support for CSV, Excel, and JSON files
              </p>
            </label>
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file: {file.name}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {loading && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Analyzing data...</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {analysisResults && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Fraud Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative w-48 h-48">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle
                      className="text-gray-200"
                      strokeWidth="12"
                      stroke="currentColor"
                      fill="transparent"
                      r="90"
                      cx="96"
                      cy="96"
                    />
                    <circle
                      className="text-blue-600 transition-all duration-1000 ease-in-out"
                      strokeWidth="12"
                      strokeDasharray={565.48}
                      strokeDashoffset={565.48 * (1 - analysisResults.overallRisk / 100)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="90"
                      cx="96"
                      cy="96"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-3xl font-bold">{analysisResults.overallRisk.toFixed(1)}%</p>
                    <p className="text-sm text-gray-500">Risk Score</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Premium Fraud Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Premium Fraud Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Risk Level</span>
                    <span className="text-sm text-blue-600 font-medium">
                      {analysisResults.premiumFraud.score.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={analysisResults.premiumFraud.score} />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={analysisResults.premiumFraud.indicators}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis />
                      <Radar
                        dataKey="value"
                        stroke="#0EA5E9"
                        fill="#0EA5E9"
                        fillOpacity={0.5}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Document Forgery Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Document Forgery Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Risk Level</span>
                    <span className="text-sm text-orange-600 font-medium">
                      {analysisResults.documentForgery.score.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={analysisResults.documentForgery.score} className="bg-orange-100" />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={analysisResults.documentForgery.indicators}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis />
                      <Radar
                        dataKey="value"
                        stroke="#F97316"
                        fill="#F97316"
                        fillOpacity={0.5}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Similar cards for Identity Fraud and Claims Fraud... */}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Analysis Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries({
                  premiumFraud: analysisResults.premiumFraud.score,
                  documentForgery: analysisResults.documentForgery.score,
                  identityFraud: analysisResults.identityFraud.score,
                  claimsFraud: analysisResults.claimsFraud.score
                }).map(([key, score]) => {
                  const level = score < 30 ? 'Low' : score < 70 ? 'Medium' : 'High';
                  return (
                    <Alert key={key} variant={level === 'High' ? 'destructive' : level === 'Medium' ? 'warning' : 'default'}>
                      {level === 'High' ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : level === 'Medium' ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                      <AlertDescription>
                        <span className="font-medium">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>{' '}
                        {level === 'High'
                          ? 'High risk detected. Immediate review recommended.'
                          : level === 'Medium'
                          ? 'Medium risk detected. Further investigation suggested.'
                          : 'Low risk detected. Standard processing recommended.'}
                      </AlertDescription>
                    </Alert>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Analysis Report</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPageContent = () => {
    switch(currentPage) {
      case 'analytics':
        return <Analytics />;
      case 'risk':
        return <RiskAssessment />;
      case 'analysis':
        return <DataAnalysis />;
      default:
        return (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                </CardContent>
              </Card>
              {/* Add more metric cards */}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockData.trends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="fraudCases" stroke="#ef4444" name="Fraud Cases" />
                        <Line type="monotone" dataKey="legitimateCases" stroke="#3b82f6" name="Legitimate Cases" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.recentCases.map((case_, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Case #{case_.id}</p>
                          <p className="text-sm text-gray-500">{case_.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{case_.amount}</p>
                          <p className="text-sm text-gray-500">{case_.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300`}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h2 className={`${sidebarOpen ? 'block' : 'hidden'} font-bold text-xl text-blue-600`}>FraudShield AI</h2>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <nav className="mt-8">
          {[
            { icon: Home, label: 'Dashboard', id: 'dashboard' },
            { icon: FileSpreadsheet, label: 'Analysis', id: 'analysis' },
            { icon: Activity, label: 'Analytics', id: 'analytics' },
            { icon: Shield, label: 'Risk Assessment', id: 'risk' }
          ].map(({ icon: Icon, label, id }) => (
            <Button
              key={id}
              variant={currentPage === id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setCurrentPage(id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {sidebarOpen && label}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <img src="https://avatars.githubusercontent.com/u/97673634?v=4" alt="User" className="rounded-full" />
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderPageContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
