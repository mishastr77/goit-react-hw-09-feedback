import React, { useState } from "react";
import Container from "./components/Conteiner";
import FeedbackOptions from "./components/FeedbackOptions";
import FeedbackStats from "./components/FeedbackStats";
import Notification from "./components/Notification";

export default function App() {
  const initialState = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  const [state, setState] = useState(initialState);

  const handleChangeStats = (name) => {
    setState((prev) => ({
      ...prev,
      [name]: prev[name] + 1,
    }));
  };

  const getTotal = () => {
    const { good, neutral, bad } = state;
    return good + neutral + bad;
  };

  const getPositiveFeedback = () => {
    const { good } = state;
    return good ? Math.ceil((good / getTotal()) * 100) + "%" : "0%";
  };

  return (
    <>
      <Container>
        <FeedbackOptions onChangeStats={handleChangeStats} />
        {!!getTotal() ? (
          <FeedbackStats
            stats={state}
            total={getTotal()}
            positiveFeedback={getPositiveFeedback()}
          />
        ) : (
          <Notification message="No feedback given" />
        )}
      </Container>
    </>
  );
}
