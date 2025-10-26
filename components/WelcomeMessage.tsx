
import React from 'react';

const BulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2.25a.75.75 0 0 1 .75.75v.541a3.753 3.753 0 0 1 2.364 3.033c.09.435.16.883.21 1.339.066.568.112 1.146.136 1.727.025.621.038 1.248.038 1.875a.75.75 0 0 1-1.5 0c0-.585-.012-1.169-.036-1.75a15.012 15.012 0 0 0-.126-1.615c-.048-.44-.11-.872-.18-1.288a2.253 2.253 0 0 0-1.423-1.841V3a.75.75 0 0 1-.75-.75Z" />
    <path fillRule="evenodd" d="M12 21a8.25 8.25 0 0 1-8.25-8.25c0-4.025 2.92-7.37 6.75-8.1a.75.75 0 0 1 .914.654 48.01 48.01 0 0 1 1.17 9.186.75.75 0 0 1-.586.79c-.48.115-1.01.18-1.554.223a2.25 2.25 0 0 0-1.488.334c-.378.225-.723.513-1.02.85A.75.75 0 0 1 8.25 15c0-2.072 1.678-3.75 3.75-3.75s3.75 1.678 3.75 3.75a.75.75 0 0 1-1.28.53c-.297-.337-.642-.625-1.02-.85a2.25 2.25 0 0 0-1.488-.334 14.965 14.965 0 0 0-1.554-.223.75.75 0 0 1-.586-.79 48.007 48.007 0 0 1 1.17-9.186.75.75 0 0 1 .914-.654c3.83 1.28 6.75 4.624 6.75 8.65A8.25 8.25 0 0 1 12 21Z" clipRule="evenodd" />
  </svg>
);


const WelcomeMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 bg-bg-secondary rounded-xl shadow-lg">
      <BulbIcon className="w-16 h-16 text-brand-accent mb-4"/>
      <h2 className="text-2xl font-bold text-text-primary">Ready to Analyze?</h2>
      <p className="mt-2 max-w-md text-text-secondary">
        Enter the name or stock symbol of any company listed on the National Stock Exchange (NSE) or Bombay Stock Exchange (BSE) to get started.
      </p>
      <div className="mt-6 text-left bg-bg-tertiary p-4 rounded-lg w-full max-w-sm">
        <p className="text-sm font-semibold text-text-primary mb-2">Example Inputs:</p>
        <ul className="list-disc list-inside text-text-secondary space-y-1 text-sm">
            <li>Tata Consultancy Services</li>
            <li>HDFC Bank</li>
            <li>RELIANCE</li>
            <li>TCS</li>
        </ul>
      </div>
    </div>
  );
};

export default WelcomeMessage;
