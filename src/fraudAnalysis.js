// Helper function to generate random data points for the radar chart
const generateRadarData = (indicators) => {
    return indicators.map(name => ({
      name,
      value: Math.floor(Math.random() * 100)
    }));
  };
  
  // Analyze premium fraud patterns
  const analyzePremiumFraud = () => {
    const indicators = [
      'Payment Irregularities',
      'Policy Changes',
      'Claims History',
      'Risk Rating',
      'Premium Patterns'
    ];
    
    return {
      score: Math.random() * 100,
      indicators: generateRadarData(indicators),
      details: {
        highRiskPatterns: Math.floor(Math.random() * 10),
        suspiciousTransactions: Math.floor(Math.random() * 20)
      }
    };
  };
  
  // Analyze document authenticity
  const analyzeDocumentForgery = () => {
    const indicators = [
      'Document Consistency',
      'Digital Signatures',
      'Metadata Analysis',
      'Template Matching',
      'Historical Verification'
    ];
    
    return {
      score: Math.random() * 100,
      indicators: generateRadarData(indicators),
      details: {
        inconsistencies: Math.floor(Math.random() * 8),
        suspiciousPatterns: Math.floor(Math.random() * 15)
      }
    };
  };
  
  // Analyze identity fraud indicators
  const analyzeIdentityFraud = () => {
    const indicators = [
      'Identity Verification',
      'Contact Information',
      'Social Validation',
      'Device Analysis',
      'Behavioral Patterns'
    ];
    
    return {
      score: Math.random() * 100,
      indicators: generateRadarData(indicators),
      details: {
        suspiciousMatches: Math.floor(Math.random() * 12),
        verificationFails: Math.floor(Math.random() * 18)
      }
    };
  };
  
  // Analyze claims fraud patterns
  const analyzeClaimsFraud = () => {
    const indicators = [
      'Claim Frequency',
      'Amount Patterns',
      'Documentation Quality',
      'Time Analysis',
      'Related Claims'
    ];
    
    return {
      score: Math.random() * 100,
      indicators: generateRadarData(indicators),
      details: {
        unusualPatterns: Math.floor(Math.random() * 15),
        highRiskIndicators: Math.floor(Math.random() * 25)
      }
    };
  };
  
  export {
    analyzePremiumFraud,
    analyzeDocumentForgery,
    analyzeIdentityFraud,
    analyzeClaimsFraud
  };