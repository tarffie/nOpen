interface GreetingProps {
  name: string;
}

const currentDate: Date = new Date();
const hours: number = currentDate.getHours();

const getTimeBasedGreeting = (hour: number): string => {
  const MORNING_START = 6;
  const AFTERNOON_START = 12;
  const EVENING_START = 18;
  const NIGHT_START = 0;

  if (hour >= MORNING_START && hour < AFTERNOON_START) return "morning";
  if (hour >= AFTERNOON_START && hour < EVENING_START) return "afternoon";
  if (hour >= NIGHT_START && hour < MORNING_START) return "night";
  return "evening";
};

const greeting: string = getTimeBasedGreeting(hours);

export const Greeting = ({ name }: GreetingProps) => {
  return <h2>Good {`${greeting},  ${name}! 👋`}</h2>;
};
