import { useMemo } from "react";

export default function useFAQ() {
  const questions = useMemo(() => {
    return [
      {
        question: "Do I need to create an account to use this platform?",
        answer:
          "Yes, creating an account is required to use Meetio. This helps us ensure secure and personalized meeting experiences.",
      },
      {
        question: "Can I use this on my phone or tablet?",
        answer:
          "Yes, Meetio works smoothly on phones and tablets through any modern web browser. No app download is needed.",
      },
      {
        question: "Is my video call secure?",
        answer:
          "Yes, all calls are secured with end-to-end encryption. Your conversations and data stay private and protected.",
      },
      {
        question: "How many people can join a room?",
        answer:
          "There is no hard limit. The number of participants depends on server’s performance and bandwidth.",
      },
      {
        question: "How to switch to dark mode?",
        answer:
          "You can toggle dark mode using the two small circle buttons at the top of the page.",
      },
    ];
  }, []);
  return questions;
}
