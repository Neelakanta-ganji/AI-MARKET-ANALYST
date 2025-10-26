export interface AnalysisResult {
  shortTermAnalysis: string;
  longTermAnalysis: string;
  targetPrice: number;
  stopLoss: number;
  marketTrend: string;
  currentPrice: number;
  signal: 'Buy' | 'Sell' | 'Hold';
  tickerSymbol: string;
}

export interface Source {
  uri: string;
  title: string;
}