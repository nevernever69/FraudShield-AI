import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Upload, AlertTriangle, FileText, Check, X, AlertCircle, Download } from 'lucide-react';

// Fraud detection scoring functions
const analyzePremiumFraud = (data) => {
  // Simulated analysis based on premium amounts and policy details
  return {
    score: Math.random() * 100,
    indicators: [
      { name: 'Premium vs Coverage Mismatch', value: Math.random() * 100 },
      { name: 'Payment Pattern Anomalies', value: Math.random() * 100 },
      { name: 'Policy Modifications', value: Math.random() * 100 },
      { name: 'Historical Claims Ratio', value: Math.random() * 100 }
    ]
  };
};

const analyzeDocumentForgery = (data) => {
  // Simulated document authenticity analysis
  return {
    score: Math.random() * 100,
    indicators: [
      { name: 'Document Inconsistencies', value: Math.random() * 100 },
      { name: 'Information Mismatch', value: Math.random() * 100 },
      { name: 'Signature Anomalies', value: Math.random() * 100 },
      { name: 'Missing Information', value: Math.random() * 100 }
    ]
  };
};

const analyzeIdentityFraud = (data) => {
  // Simulated identity verification analysis
  return {
    score: Math.random() * 100,
    indicators: [
      { name: 'Identity Verification', value: Math.random() * 100 },
      { name: 'Contact Information', value: Math.random() * 100 },
      { name: 'Social Media Presence', value: Math.random() * 100 },
      { name: 'Historical Records', value: Math.random() * 100 }
    ]
  };
};

const analyzeClaimsFraud = (data) => {
  // Simulated claims analysis
  return {
    score: Math.random() * 100,
    indicators: [
      { name: 'Claim Amount Analysis', value: Math.random() * 100 },
      { name: 'Timing Patterns', value: Math.random() * 100 },
      { name: 'Service Provider Check', value: Math.random() * 100 },
      { name: 'Documentation Quality', value: Math.random() * 100 }
    ]
  };
};

const DataAnalysis = () => {
  const [file, setFile] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      // Simulated file reading and analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate analysis results
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

  const getRiskLevel = (score) => {
    if (score < 30) return { level: 'Low', color: 'text-green-500' };
    if (score < 70) return { level: 'Medium', color: 'text-yellow-500' };
    return { level: 'High', color: 'text-red-500' };
  };

  const RiskIndicator = ({ score, label }) => {
    const { level, color } = getRiskLevel(score);
    return (
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className={`text-lg font-bold ${color}`}>{level}</p>
        </div>
        <p className="text-2xl font-bold">{score.toFixed(1)}%</p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Data Analysis</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
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
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-700">
              Upload your dataset
            </p>
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
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          <AlertTriangle className="h-5 w-5 inline mr-2" />
          {error}
        </div>
      )}

      {analysisResults && (
        <div className="space-y-6">
          {/* Overall Risk Score */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Overall Fraud Risk Assessment</h3>
            <div className="flex items-center justify-center">
              <div className="relative">
                <svg className="w-48 h-48">
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
                    className="text-blue-600"
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
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Premium Fraud */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Premium Fraud Analysis</h3>
              <RiskIndicator 
                score={analysisResults.premiumFraud.score} 
                label="Premium Fraud Risk"
              />
              <div className="mt-4 h-64">
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
            </div>

            {/* Document Forgery */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Document Forgery Analysis</h3>
              <RiskIndicator 
                score={analysisResults.documentForgery.score} 
                label="Document Forgery Risk"
              />
              <div className="mt-4 h-64">
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
            </div>

            {/* Identity Fraud */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Identity Fraud Analysis</h3>
              <RiskIndicator 
                score={analysisResults.identityFraud.score} 
                label="Identity Fraud Risk"
              />
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={analysisResults.identityFraud.indicators}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Radar
                      dataKey="value"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Claims Fraud */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Claims Fraud Analysis</h3>
              <RiskIndicator 
                score={analysisResults.claimsFraud.score} 
                label="Claims Fraud Risk"
              />
              <div className="mt-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={analysisResults.claimsFraud.indicators}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Radar
                      dataKey="value"
                      stroke="#EC4899"
                      fill="#EC4899"
                      fillOpacity={0.5}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Findings and Recommendations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-4">Analysis Findings</h3>
            <div className="space-y-4">
              {Object.entries({
                premiumFraud: analysisResults.premiumFraud.score,
                documentForgery: analysisResults.documentForgery.score,
                identityFraud: analysisResults.identityFraud.score,
                claimsFraud: analysisResults.claimsFraud.score
              }).map(([key, score]) => {
                const { level, color } = getRiskLevel(score);
                return (
                  <div key={key} className="flex items-start space-x-2">
                    {level === 'High' ? (
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    ) : level === 'Medium' ? (
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    ) : (
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">
                        {key.replace(/([A-Z])/g, ' $1').trim()} Analysis
                      </p>
                      <p className="text-sm text-gray-600">
                        {level === 'High'
                          ? 'High risk detected. Immediate review recommended.'
                          : level === 'Medium'
                          ? 'Medium risk detected. Further investigation suggested.'
                          : 'Low risk detected. Standard processing recommended.'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Export Button */}
          <div className="flex justify-end">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="h-4 w-4" />
              <span>Export Analysis Report</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataAnalysis;
