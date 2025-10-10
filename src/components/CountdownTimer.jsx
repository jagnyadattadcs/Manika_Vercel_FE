import React, { useState, useEffect, useMemo } from 'react';
import CircularProgress from './CircularProgress';

// Helper to compute remaining time considering start and end
function getTimeRemaining(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = Date.now();

  // If now is before start, show full duration from start to end; else show time left until end
  const base = now < start ? end - start : end - now;
  let diff = Math.max(0, base);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff %= 1000 * 60 * 60 * 24;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff %= 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));
  diff %= 1000 * 60;
  const seconds = Math.floor(diff / 1000);

  return { days, hours, minutes, seconds };
}

const CountdownTimer = ({ startDate="2025-10-10T00:00:00", endDate="2025-10-21T00:00:00" }) => {
  // Defaults: start = now, end = 30 days from now (if not provided)
  const defaultStart = useMemo(() => new Date(), []);
  const defaultEnd = useMemo(() => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), []);

  const start = startDate || defaultStart;
  const end = endDate || defaultEnd;

  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(start, end));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeRemaining(start, end));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [start, end]);

  // When countdown reaches zero, keep it at zero
  const safeTimeLeft = {
    days: Math.max(0, timeLeft.days),
    hours: Math.max(0, timeLeft.hours),
    minutes: Math.max(0, timeLeft.minutes),
    seconds: Math.max(0, timeLeft.seconds),
  };

  const timeUnits = [
    { label: 'Days', value: safeTimeLeft.days, max: 365 },
    { label: 'Hours', value: safeTimeLeft.hours, max: 24 },
    { label: 'Minutes', value: safeTimeLeft.minutes, max: 60 },
    { label: 'Seconds', value: safeTimeLeft.seconds, max: 60 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
      {timeUnits.map((unit, index) => (
        <div
          key={unit.label}
          className="flex flex-col items-center group"
          style={{
            animationDelay: `${index * 150}ms`,
            animation: 'fadeInUp 0.8s ease-out forwards',
          }}
        >
          <div className="relative w-full">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-[#29fe1d]/20 hover:border-[#5fff50]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#29fe1d]/10 p-4">
              <div className="relative mx-auto">
                <CircularProgress
                  value={unit.value}
                  max={unit.max}
                  size={120}
                  strokeWidth={3}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1 tabular-nums">
                    {unit.value.toString().padStart(2, '0')}
                  </div>
                  <div className="text-[10px] md:text-xs text-[#5fff50] uppercase tracking-[0.2em] font-medium">
                    {unit.label}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;