
import React, { useState, useCallback } from 'react';
import { getMarketAnalysis } from './services/geminiService';
import type { AnalysisResult, Source } from './types';
import InputForm from './components/InputForm';
import AnalysisDisplay from './components/AnalysisDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WelcomeMessage from './components/WelcomeMessage';

const App: React.FC = () => {
  const [companyName, setCompanyName] = useState<string>('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [sources, setSources] = useState<Source[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!companyName.trim()) {
      setError('Please enter a company name.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setSources([]);

    try {
      const result = await getMarketAnalysis(companyName);
      setAnalysis(result.analysis);
      setSources(result.sources);
    } catch (err) {
      console.error(err);
      setError(
        'Failed to fetch analysis. The AI model may be overloaded or an error occurred. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [companyName]);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-accent tracking-tight">
          AI Market Analyst
        </h1>
        <p className="mt-2 text-lg text-text-secondary">
          Get AI-powered stock analysis for NSE & BSE listed companies.
        </p>
      </header>

      <main className="w-full max-w-4xl flex-grow flex flex-col">
        <div className="sticky top-0 z-10 bg-bg-primary py-4">
          <InputForm
            companyName={companyName}
            setCompanyName={setCompanyName}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-8 flex-grow">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && !analysis && <WelcomeMessage />}
          {analysis && <AnalysisDisplay analysis={analysis} companyName={companyName} sources={sources} />}
        </div>
      </main>
      <footer className="w-full max-w-4xl text-center text-text-secondary text-sm mt-8 py-4 border-t border-bg-tertiary">
        <p>Disclaimer: This analysis is AI-generated and for informational purposes only. It is not financial advice.</p>
      </footer>
    </div>
  );
};

export default App;
