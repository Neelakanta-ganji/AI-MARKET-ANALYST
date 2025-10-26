import React from 'react';
import type { AnalysisResult, Source } from '../types';

interface AnalysisDisplayProps {
  analysis: AnalysisResult;
  companyName: string;
  sources: Source[];
}

const TrendUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
  </svg>
);

const TrendDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72v-5.69a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clipRule="evenodd" />
  </svg>
);

const BuySignalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const SellSignalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const HoldSignalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const AnalysisCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
  <div className={`bg-bg-secondary rounded-xl shadow-lg p-6 ${className}`}>
    <h3 className="text-xl font-bold text-brand-accent mb-3">{title}</h3>
    <div className="text-text-secondary leading-relaxed">{children}</div>
  </div>
);

const GlobeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.001 2.25c-5.384 0-9.75 4.366-9.75 9.75s4.366 9.75 9.75 9.75 9.75-4.366 9.75-9.75S17.385 2.25 12.001 2.25Zm3.336 14.155a.75.75 0 0 0-1.047.212l-.98 1.472a.75.75 0 0 0 .976 1.139l.98-1.472a.75.75 0 0 0 .071-1.351ZM12.751 18a.75.75 0 0 0 .75-.75V16.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 .75.75Zm-2.25-.75a.75.75 0 0 0 0-1.5h-.75a.75.75 0 0 0 0 1.5h.75ZM9 15.75a.75.75 0 0 0 .75-.75v-.75a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 .75.75Zm.75-2.25a.75.75 0 0 0-.75.75v.75a.75.75 0 0 0 1.5 0v-.75a.75.75 0 0 0-.75-.75Zm.91-2.525a.75.75 0 0 0-1.06 0l-.678.677a.75.75 0 0 0 1.06 1.06l.678-.677a.75.75 0 0 0 0-1.06Zm2.24-1.21a.75.75 0 0 0-.75.75v.75a.75.75 0 0 0 1.5 0v-.75a.75.75 0 0 0-.75-.75Zm.75 2.25a.75.75 0 0 0 0-1.5h-.75a.75.75 0 0 0 0 1.5h.75ZM15 11.25a.75.75 0 0 0 .75-.75v-.75a.75.75 0 0 0-1.5 0v.75c0 .414.336.75.75.75Zm.75-2.25a.75.75 0 0 0-.75.75v.75a.75.75 0 0 0 1.5 0v-.75a.75.75 0 0 0-.75-.75Zm-2.502-1.99a.75.75 0 0 0-1.06 1.06l.677.678a.75.75 0 0 0 1.06-1.06l-.677-.678ZM12.751 6a.75.75 0 0 0 .75-.75V4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 .75.75Zm-2.25-.75a.75.75 0 0 0 0-1.5h-.75a.75.75 0 0 0 0 1.5h.75Z" />
    </svg>
);

const SignalCard: React.FC<{ signal: string }> = ({ signal }) => {
  const getSignalStyles = (sig: string) => {
    switch (sig?.toLowerCase()) {
      case 'buy':
        return {
          bgColor: 'bg-green-900/50',
          borderColor: 'border-green-700',
          textColor: 'text-green-200',
          icon: <BuySignalIcon className="w-12 h-12" />,
        };
      case 'sell':
        return {
          bgColor: 'bg-red-900/50',
          borderColor: 'border-red-700',
          textColor: 'text-red-200',
          icon: <SellSignalIcon className="w-12 h-12" />,
        };
      case 'hold':
      default:
        return {
          bgColor: 'bg-yellow-900/50',
          borderColor: 'border-yellow-700',
          textColor: 'text-yellow-200',
          icon: <HoldSignalIcon className="w-12 h-12" />,
        };
    }
  };

  const styles = getSignalStyles(signal);

  return (
    <div className={`rounded-xl p-6 text-center shadow-lg ${styles.bgColor} border ${styles.borderColor}`}>
      <p className={`text-sm font-semibold uppercase tracking-wider ${styles.textColor} opacity-70 mb-2`}>
        Analyst Signal
      </p>
      <div className="flex items-center justify-center gap-4">
        {styles.icon}
        <p className={`text-5xl font-extrabold ${styles.textColor}`}>{signal}</p>
      </div>
    </div>
  );
};


const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, companyName, sources }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        {analysis.tickerSymbol && (
          <p className="text-lg font-semibold text-brand-accent uppercase tracking-widest mb-1">
            {analysis.tickerSymbol}
          </p>
        )}
        <h2 className="text-3xl font-bold text-text-primary">
          Analysis for <span className="text-brand-light">{companyName}</span>
        </h2>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-bg-tertiary rounded-xl p-6 text-center shadow-lg col-span-1 md:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-2">Current Price</p>
            <p className="text-5xl font-extrabold text-brand-light">₹{analysis.currentPrice?.toFixed(2)}</p>
        </div>
        <div className="bg-green-900/50 border border-green-700 rounded-xl p-6 text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-green-300 mb-2">Target Price</h3>
            <p className="text-4xl font-extrabold text-green-200 flex items-center justify-center gap-2">
                <TrendUpIcon className="w-8 h-8"/> ₹{analysis.targetPrice?.toFixed(2)}
            </p>
        </div>
        <div className="bg-red-900/50 border border-red-700 rounded-xl p-6 text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-red-300 mb-2">Stop Loss</h3>
            <p className="text-4xl font-extrabold text-red-200 flex items-center justify-center gap-2">
                <TrendDownIcon className="w-8 h-8"/> ₹{analysis.stopLoss?.toFixed(2)}
            </p>
        </div>
      </div>
       <div className="bg-bg-secondary rounded-xl p-6 text-center shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-2">Market Trend</p>
        <p className="text-2xl font-bold text-text-primary">{analysis.marketTrend}</p>
      </div>

      {/* Analyst Signal */}
      {analysis.signal && <SignalCard signal={analysis.signal} />}
      
      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalysisCard title="Short-Term Analysis">
          <p>{analysis.shortTermAnalysis}</p>
        </AnalysisCard>
        <AnalysisCard title="Long-Term Analysis">
          <p>{analysis.longTermAnalysis}</p>
        </AnalysisCard>
      </div>

      {/* Data Sources */}
      {sources && sources.length > 0 && (
        <div className="bg-bg-secondary rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-brand-accent mb-4 flex items-center gap-2">
            <GlobeIcon className="w-6 h-6" />
            Data Sources
          </h3>
          <ul className="space-y-2 text-text-secondary">
            {sources.map((source, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-brand-accent mt-1">●</span>
                <a 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-brand-light hover:underline transition-colors duration-200 break-all"
                  title={source.uri}
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
           <p className="text-xs text-text-secondary/70 mt-4">Analysis is grounded on information from the web. Please verify sources.</p>
        </div>
      )}
    </div>
  );
};

export default AnalysisDisplay;