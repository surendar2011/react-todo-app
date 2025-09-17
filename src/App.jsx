import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    { text: 'apple', checked: false },
    { text: 'banana', checked: false },
    { text: 'orange', checked: false },
  ]);

  const [inputValue, setInputValue] = useState("");

  const toggleCheck = (index) => {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);
  };

  const submit = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue !== "") {
      setTodos([...todos, { text: trimmedValue, checked: false }]);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => setInputValue(e.target.value);

  return (
    <div>
      {todos.map(({ text, checked }, index) => (
        <div key={index}>
          <input 
            type="checkbox" 
            checked={checked} 
            onChange={() => toggleCheck(index)} 
          />
          <span style={{ textDecoration: checked ? "line-through" : "none" }}>
            {text}
          </span>
        </div>
      ))}
      <input 
        type="text" 
        placeholder="Enter todo" 
        value={inputValue} 
        onChange={handleInputChange} 
      />
      <button onClick={submit}>Add to list</button>
    </div>
  );
}

export default App;
