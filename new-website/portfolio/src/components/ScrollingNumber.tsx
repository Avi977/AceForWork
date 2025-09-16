import React, { useEffect, useState, useRef } from 'react';

interface ScrollingNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

const ScrollingNumber: React.FC<ScrollingNumberProps> = ({
  value,
  duration = 800,
  className = ''
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousValue = useRef(value);

  useEffect(() => {
    if (value !== previousValue.current) {
      setIsAnimating(true);

      // Animate from previous to current value
      const start = previousValue.current;
      const end = value;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        const currentValue = Math.round(start + (end - start) * easeOutQuart);
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          previousValue.current = value;
        }
      };

      requestAnimationFrame(animate);
    }
  }, [value, duration]);

  return (
    <span
      className={`inline-block transition-all duration-200 ${
        isAnimating ? 'scale-110 text-blue-300' : 'scale-100'
      } ${className}`}
    >
      {displayValue}
    </span>
  );
};

export default ScrollingNumber;