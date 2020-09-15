import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(6);
  const [neutral, setNeutral] = useState(2);
  const [bad, setBad] = useState(100);
  const feedbackData = [
    { name: "good", value: good, setValue: setGood },
    { name: "neutral", value: neutral, setValue: setNeutral },
    { name: "bad", value: bad, setValue: setBad },
  ];
  const statistics = feedbackData.map(({ name, value }) => {
    return { name, value };
  });

  return (
    <div>
      <h1>give feedback</h1>
      <Buttons buttons={feedbackData} />
      <h1>statistics</h1>
      <Statistics statistics={statistics} />
    </div>
  );
};

const Buttons = ({ buttons }) => {
  return (
    <div>
      {buttons.map(({ name, value, setValue }) => {
        return (
          <Button key={name} name={name} value={value} setValue={setValue} />
        );
      })}
    </div>
  );
};

const Button = ({ name, value, setValue }) => {
  return <button onClick={() => setValue(value + 1)}>{name}</button>;
};

const Statistics = ({ statistics }) => {
  const total = {
    name: "all",
    value: statistics.map(({ value }) => value).reduce((a, b) => a + b),
  };
  const average = {
    name: "average",
    value:
      Math.round((statistics
        .map((a) => (a.name === "neutral" ? 0 : a.value))
        .reduce((a, b) => a - b) / total.value)*100)/100,
  };
  const positive = {
    name: "positive",
    value:
      total.value === 0
        ? 0
        : `${
            Math.round(
              (statistics.filter((a) => a.name === "good")[0].value /
                total.value) *
                1000
            ) / 10
          } %`,
  };
  if (total.value === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <tbody>
        {[...statistics, total, average, positive].map(({ name, value }) => {
          return <Statistic key={name} name={name} value={value} />;
        })}
      </tbody>
    </table>
  );
};

const Statistic = ({ name, value }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
