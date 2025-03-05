
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate, label = "Until Our Anniversary" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // If the date has passed, we can show 0s or a special message
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="glass-card overflow-hidden">
        <div className="text-center mb-4">
          <p className="text-love-600 text-lg font-medium uppercase tracking-wider">{label}</p>
        </div>
        
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          <TimeUnit value={timeLeft.days} unit="Days" />
          <TimeUnit value={timeLeft.hours} unit="Hours" />
          <TimeUnit value={timeLeft.minutes} unit="Minutes" />
          <TimeUnit value={timeLeft.seconds} unit="Seconds" />
        </div>
      </Card>
    </div>
  );
};

const TimeUnit = ({ value, unit }: { value: number; unit: string }) => (
  <div className="flex flex-col items-center justify-center">
    <div className="w-full aspect-square flex items-center justify-center bg-white/70 rounded-lg shadow-sm border border-white/30 p-2">
      <span className="text-2xl sm:text-4xl md:text-5xl font-semibold text-love-700 font-serif animate-pulse-soft">
        {value}
      </span>
    </div>
    <span className="text-xs sm:text-sm text-foreground/70 mt-1">{unit}</span>
  </div>
);

export default CountdownTimer;
