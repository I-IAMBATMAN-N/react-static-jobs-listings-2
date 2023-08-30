import { useState } from "react";

export default function Header({ searchWords, setSearchWords }) {
  return (
    <header className="main-header">
      {/*  */}
      <InputForm />
      {/*  */}
    </header>
  );
  function InputForm() {
    const [input, setInput] = useState("");

    function handleInput(string) {
      setInput(string);
    }
    function handleForm(e, string) {
      e.preventDefault();
      if (string.length > 0) {
        setSearchWords((words) => [...words, string]);
      }
    }
    function handleClear() {
      setSearchWords([]);
    }
    function handleDelete(string) {
      setSearchWords((arr) => arr.filter((item) => item !== string));
    }
    return (
      <form className="input-container" onSubmit={(e) => handleForm(e, input)}>
        <div className="keyword-container">
          {searchWords ? (
            searchWords.map((word) => (
              <span key={Math.random()} className="keyword-span">
                <span className="featured-tech">{word}</span>
                <span
                  className="clear-cross"
                  onClick={() => handleDelete(word)}
                >
                  X
                </span>
              </span>
            ))
          ) : (
            <></>
          )}
        </div>
        <input
          autoFocus
          maxLength={12}
          minLength={3}
          type="text"
          className="header-input"
          value={input}
          onChange={(e) => handleInput(e.target.value)}
        />
        <span className="btn-clear" onClick={handleClear}>
          Clear
        </span>
      </form>
    );
  }
}
