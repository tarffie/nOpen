import { getTimeBasedGreeting } from "@repo/utils";

interface GreetingProps {
  name: string;
}

const hours: number = new Date().getHours();
const greeting: string = getTimeBasedGreeting(hours);

export const Greeting = ({ name }: GreetingProps) => {
  return <h2>Good {`${greeting},  ${name}! 👋`}</h2>;
};
