import { useState, useEffect } from "react";

const isTheSameCharacters = (str1, str2) => {
  const first = new Set([...str1]);
  const second = new Set([...str2]);

  if (first.size !== second.size) return false;

  return Array.from(first).every((char) => second.has(char));
};

const StringInput = () => {
  const [counter, setCounter] = useState(0);
  const [state, setState] = useState({ first: "", second: "" });
  const [isFull, setIsFull] = useState(false);

  useEffect(() => {
    setIsFull(counter > 2 ? true : false);
  }, [counter]);

  const onInputHandler = (e) => {
    setState((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  const compareHandler = () => {
    const { first, second } = state;
    setCounter((prevCounter) =>
      isTheSameCharacters(first, second) ? prevCounter + 1 : prevCounter
    );
    setState({ first: "", second: "" });
  };

  const resetHandler = () => {
    setCounter(0);
  };

  return (
    <div className="cont">
      <div className="left-cont">
        <input
          disabled={isFull}
          value={state.first}
          onChange={onInputHandler}
          id="first"
          placeholder="first string"
          className="item"
        />
        <input
          disabled={isFull}
          value={state.second}
          onChange={onInputHandler}
          id="second"
          placeholder="second string"
          className="item"
        />
        <input
          onClick={compareHandler}
          className="item"
          type="button"
          value="Compare strings"
          disabled={!state.first || !state.second}
        />
      </div>
      <div className="right-cont">
        <button
          onClick={resetHandler}
          disabled={!isFull}
          className="counter flex-cont"
        >
          {!isFull ? counter : "Reset"}
        </button>
      </div>
    </div>
  );
};

export default StringInput;
