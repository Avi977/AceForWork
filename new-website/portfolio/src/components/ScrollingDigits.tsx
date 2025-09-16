import React, { useEffect, useState } from 'react';

interface ScrollingDigitsProps {
  value: number;
  duration?: number;
  className?: string;
}

interface DigitProps {
  digit: number;
  previousDigit: number;
  isAnimating: boolean;
  duration: number;
}

const ScrollingDigit: React.FC<DigitProps> = ({ digit, previousDigit, isAnimating, duration }) => {
  const [currentDigit, setCurrentDigit] = useState(digit);

  useEffect(() => {
    if (isAnimating && digit !== previousDigit) {
      // Create a sequence of digits to scroll through
      const start = previousDigit;
      const end = digit;
      let current = start;

      const totalSteps = Math.abs(end - start);
      const stepDuration = duration / Math.max(totalSteps, 1);

      const animate = () => {
        if (current !== end) {
          current = current < end ? current + 1 : current - 1;
          setCurrentDigit(current);
          setTimeout(animate, stepDuration / 10);
        }
      };

      setTimeout(animate, 50);
    } else {
      setCurrentDigit(digit);
    }
  }, [digit, previousDigit, isAnimating, duration]);

  return (
    <span className="relative inline-block w-[1ch] text-center overflow-hidden">
      <span
        className={`inline-block transition-transform duration-150 ${
          isAnimating ? 'animate-pulse' : ''
        }`}
        style={{
          transform: isAnimating ? 'translateY(-2px)' : 'translateY(0)',
        }}
      >
        {currentDigit}
      </span>
    </span>
  );
};

const ScrollingDigits: React.FC<ScrollingDigitsProps> = ({
  value,
  duration = 600,
  className = ''
}) => {
  const [previousValue, setPreviousValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== previousValue) {
      setIsAnimating(true);

      setTimeout(() => {
        setIsAnimating(false);
        setPreviousValue(value);
      }, duration);
    }
  }, [value, previousValue, duration]);

  // Convert numbers to arrays of digits
  const currentDigits = value.toString().split('').map(Number);
  const previousDigits = previousValue.toString().split('').map(Number);

  // Pad arrays to same length
  const maxLength = Math.max(currentDigits.length, previousDigits.length);
  while (currentDigits.length < maxLength) currentDigits.unshift(0);
  while (previousDigits.length < maxLength) previousDigits.unshift(0);

  return (
    <span
      className={`inline-flex items-center justify-center font-mono font-bold ${
        isAnimating ? 'text-blue-300' : ''
      } ${className}`}
    >
      {currentDigits.map((digit, index) => (
        <ScrollingDigit
          key={index}
          digit={digit}
          previousDigit={previousDigits[index] || 0}
          isAnimating={isAnimating}
          duration={duration}
        />
      ))}
    </span>
  );
};

export default ScrollingDigits;