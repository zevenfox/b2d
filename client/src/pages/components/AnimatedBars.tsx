import React, { useState, useEffect } from 'react';

interface Bar {
    baseHeight: number;  // Base height of the bar
    amplitude: number;   // Amplitude for oscillation
    color: string;       // Color for the bar
}

interface BarChartProps {
    totalBars?: number;
    chartHeight?: number;
    barWidth?: number;
    targetHeight?: number; // Target height for each bar
}

const BarChart: React.FC<BarChartProps> = ({
                                               totalBars = 40,     // Number of bars in the chart
                                               chartHeight = 200,  // Maximum height of the chart
                                               barWidth = 30,      // Width of each bar
                                               targetHeight = 120,  // Target height for each bar
                                           }) => {
    const [bars, setBars] = useState<Bar[]>([]);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const generateBars = () => {
            const newBars = Array.from({ length: totalBars }).map((_) => {
                // Random amplitude for each bar
                const amplitude = Math.random() * 30; // Max amplitude for oscillation
                const baseHeight = targetHeight; // All bars start with the same height
                const color = '#0C1A2A'; // Default color for pre-generated bars

                return {
                    baseHeight: baseHeight,
                    amplitude: amplitude,
                    color: color, // Set initial color
                };
            });

            setBars(newBars);
        };

        const animateBars = () => {
            if (progress < 1) {
                setProgress(prev => Math.min(prev + 0.1, 1)); // Adjust speed for bars growing
            }
        };

        generateBars();
        const intervalId = setInterval(animateBars, 1); // Adjust interval speed

        const resizeHandler = () => {
            setProgress(0); // Reset progress values on resize
            generateBars();
        };

        window.addEventListener('resize', resizeHandler);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener('resize', resizeHandler);
        };
    }, [progress, totalBars]);

    const totalWidth = window.innerWidth; // Full width of the screen
    const totalBarWidth = totalBars * barWidth; // Total width occupied by bars
    const totalSpacing = totalWidth - totalBarWidth; // Space left for spacing
    const barSpacing = totalSpacing / (totalBars - 1); // Space between bars

    return (
        <svg className="pt-16" width="100%" height={chartHeight} preserveAspectRatio="none">
            {bars.map((bar, index) => (
                <rect
                    key={index}
                    x={index * (barWidth + barSpacing)} // Position each bar with spacing
                    y={chartHeight - bar.baseHeight} // Start bars from the bottom
                    width={barWidth}
                    height={bar.baseHeight} // This will be updated by CSS animation
                    style={{
                        fill: bar.color, // Apply the default color
                        animationDelay: `${index * 0.1}s`, // Stagger animation for each bar
                    }}
                    className={`bar bar-${index % totalBars}`} // Apply wave animation
                />
            ))}
        </svg>
    );
};

export default BarChart;
