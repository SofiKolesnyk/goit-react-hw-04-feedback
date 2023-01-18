import React, { useState } from 'react';
import s from './App.module.css';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification';
import Statistics from './Statistics';

const initOptions = {good: 0, neutral: 0, bad: 0};

function App() {
  const [options, setOptions] = useState(initOptions);
  const {good, neutral, bad} = options;
  const totalFeedback = good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    return Math.round(good / totalFeedback * 100);
  };

  const onLeaveFeedback = (feedbackType) => {
    setOptions(prev => ({...prev, [feedbackType]: prev[feedbackType] + 1 }));
  };

  return (
    <div className={s.container}>
      <Section title='Please leave feedback'>
        <FeedbackOptions
          options={options}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>

      <Section title='Statistics'>
        {!totalFeedback
          ? <Notification message='There is no feedback'/>
          : <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={totalFeedback}
            positivePercentage={countPositiveFeedbackPercentage()}
          />}
      </Section>
    </div>
  );
}

export default App;
