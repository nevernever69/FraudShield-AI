// fraudAnalysis.d.ts
export interface AnalysisFunction {
    (): {
      score: number;
      indicators: Array<{
        name: string;
        value: number;
      }>;
    };
  }
  
  export declare function analyzePremiumFraud(): ReturnType<AnalysisFunction>;
  export declare function analyzeDocumentForgery(): ReturnType<AnalysisFunction>;
  export declare function analyzeIdentityFraud(): ReturnType<AnalysisFunction>;
  export declare function analyzeClaimsFraud(): ReturnType<AnalysisFunction>;