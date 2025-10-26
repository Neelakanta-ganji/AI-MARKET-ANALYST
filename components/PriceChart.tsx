import React, { useState, useMemo, useRef, useEffect } from 'react';

interface ChartData {
  date: string;
  price: number;
}

interface PriceChartProps {
  data: ChartData[];
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltip, setTooltip] = useState<{ x: number; y: number; date: string; price: number } | null>(null);
  
  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      if (entries && entries.length > 0) {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      }
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const sortedData = useMemo(() => 
    data.map(d => ({ ...d, dateObj: new Date(d.date) })).sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime()),
    [data]
  );

  const { width, height } = dimensions;
  // Reduced margins for a cleaner, axis-less look
  const margin = { top: 40, right: 10, bottom: 10, left: 10 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const { minPrice, maxPrice, minTime, maxTime, averagePrice, lastDataPoint } = useMemo(() => {
    if (sortedData.length === 0) {
      return { minPrice: 0, maxPrice: 0, minTime: 0, maxTime: 0, averagePrice: 0, lastDataPoint: null };
    }
    const prices = sortedData.map(d => d.price);
    const times = sortedData.map(d => d.dateObj.getTime());
    const minP = Math.min(...prices);
    const maxP = Math.max(...prices);
    // Give some vertical padding to the line
    const pricePadding = (maxP - minP) * 0.1 || 1;
    return {
      minPrice: minP - pricePadding,
      maxPrice: maxP + pricePadding,
      minTime: Math.min(...times),
      maxTime: Math.max(...times),
      averagePrice: prices.reduce((a, b) => a + b, 0) / prices.length,
      lastDataPoint: sortedData[sortedData.length - 1],
    };
  }, [sortedData]);

  const xScale = (time: number) => {
    if (maxTime === minTime) return margin.left;
    return margin.left + ((time - minTime) / (maxTime - minTime)) * innerWidth;
  };

  const yScale = (price: number) => {
    if (maxPrice === minPrice) return margin.top + innerHeight;
    return margin.top + innerHeight - ((price - minPrice) / (maxPrice - minPrice)) * innerHeight;
  };

  const linePath = useMemo(() => {
    if (sortedData.length < 2) return '';
    return sortedData
      .map((d, i) => {
        const x = xScale(d.dateObj.getTime());
        const y = yScale(d.price);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(' ');
  }, [sortedData, innerWidth, innerHeight]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current || sortedData.length === 0 || innerWidth <= 0) return;

    const svgRect = containerRef.current.getBoundingClientRect();
    const mouseX = event.clientX - svgRect.left;
    
    if (mouseX < margin.left || mouseX > width - margin.right) {
        setTooltip(null);
        return;
    }

    const timeAtMouse = minTime + ( (mouseX - margin.left) / innerWidth ) * (maxTime - minTime);

    const closestPoint = sortedData.reduce((prev, curr) => 
      Math.abs(curr.dateObj.getTime() - timeAtMouse) < Math.abs(prev.dateObj.getTime() - timeAtMouse) ? curr : prev
    );

    setTooltip({
      x: xScale(closestPoint.dateObj.getTime()),
      y: yScale(closestPoint.price),
      date: closestPoint.dateObj.toLocaleDateString(),
      price: closestPoint.price,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  if (data.length === 0) {
    return <div className="flex items-center justify-center h-full text-text-secondary">No historical data available.</div>;
  }

  return (
    <div className="w-full h-full relative" ref={containerRef}>
      <svg
        width="100%"
        height="100%"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
            <clipPath id="chart-area">
                <rect x={margin.left} y={margin.top} width={innerWidth} height={innerHeight} />
            </clipPath>
        </defs>
        
        {/* Chart Header */}
        {lastDataPoint && (
          <text x={margin.left + 5} y="25" fill="#FFFFFF" fontSize="16" aria-label={`Latest price: ${lastDataPoint.price.toFixed(2)}`}>
            <tspan fontWeight="bold">{`₹${lastDataPoint.price.toFixed(2)}`}</tspan>
            <tspan fill="#4A5568" dx="8" dy="0"> | </tspan>
            <tspan fill="#B0BEC5" fontWeight="normal" fontSize="12">
                {lastDataPoint.dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </tspan>
          </text>
        )}
        
        {/* Chart content clipped to prevent overflow */}
        <g clipPath="url(#chart-area)">
            {/* Average Price Line */}
            {averagePrice > 0 && (
            <line
                x1={margin.left}
                x2={width - margin.right}
                y1={yScale(averagePrice)}
                y2={yScale(averagePrice)}
                stroke="#4A5568"
                strokeWidth="1"
                strokeDasharray="3,3"
            />
            )}
            
            {/* Line Path */}
            <path d={linePath} fill="none" stroke="#FF7043" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </g>

        {/* Tooltip */}
        {tooltip && (
          <g style={{ pointerEvents: 'none' }}>
            <line
              clipPath="url(#chart-area)"
              x1={tooltip.x}
              y1={margin.top}
              x2={tooltip.x}
              y2={height - margin.bottom}
              stroke="#FF7043"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
            <circle cx={tooltip.x} cy={tooltip.y} r="5" fill="#1F2937" stroke="#FF7043" strokeWidth="2" />
            
            <g transform={`translate(${tooltip.x > innerWidth / 2 ? tooltip.x - 115 : tooltip.x + 15}, ${margin.top + 5})`}>
                <rect x="0" y="0" width="100" height="45" rx="5" fill="rgba(17, 24, 39, 0.85)" stroke="#374151" />
                <text x="10" y="20" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                   ₹{tooltip.price.toFixed(2)}
                </text>
                <text x="10" y="38" fill="#B0BEC5" fontSize="10">
                    {tooltip.date}
                </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

export default PriceChart;
