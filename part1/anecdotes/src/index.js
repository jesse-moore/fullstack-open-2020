import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]);
  const randomNumber = () => Math.floor(Math.random() * (anecdotes.length - 0));
  const mostVotes = votes.indexOf(votes.reduce((a, b) => (a > b ? a : b)));
  const handleNext = () => {
    setSelected(randomNumber());
  };
  const handleVote = () => {
    setVotes((votes) => {
      const newVotes = votes.map((e, i) => (i === selected ? e + 1 : e));
      return newVotes;
    });
  };
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNext}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <MostVotedAnecdote
        anecdote={props.anecdotes[mostVotes]}
        votes={votes[mostVotes]}
      />
    </div>
  );
};

const MostVotedAnecdote = ({ anecdote, votes }) => {
  if (votes === 0) return null;
  return (
    <div>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
