import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    { text: "apple", checked: false },
    { text: "banana", checked: false },
    { text: "orange", checked: false },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

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

  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const handleEditChange = (e) => setEditText(e.target.value);

  const saveEdit = (index) => {
    const newTodos = [...todos];
    newTodos[index].text = editText.trim() || newTodos[index].text;
    setTodos(newTodos);
    setEditIndex(null);
    setEditText("");
  };

  const handleEditKeyDown = (e, index) => {
    if (e.key === "Enter") {
      saveEdit(index);
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    if (editIndex === index) {
      setEditIndex(null);
      setEditText("");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
      {todos.map(({ text, checked }, index) => (
        <div
          key={index}
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={() => toggleCheck(index)}
            style={{ marginRight: "8px" }}
          />
          {editIndex === index ? (
            <>
              <input
                type="text"
                value={editText}
                onChange={handleEditChange}
                onKeyDown={(e) => handleEditKeyDown(e, index)}
                autoFocus
                style={{ flexGrow: 1, marginRight: "8px" }}
              />
              <button onClick={() => saveEdit(index)} style={{ marginRight: "8px" }}>
                Save
              </button>
              <button onClick={() => setEditIndex(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span
                style={{
                  textDecoration: checked ? "line-through" : "none",
                  flexGrow: 1,
                }}
              >
                {text}
              </span>
              <button onClick={() => startEditing(index)} style={{ marginRight: "8px" }}>
                Edit
              </button>
              <button onClick={() => deleteTodo(index)} style={{ color: "red" }}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}
      <div style={{ marginTop: "16px", display: "flex" }}>
        <input
          type="text"
          placeholder="Enter todo"
          value={inputValue}
          onChange={handleInputChange}
          style={{ flexGrow: 1, marginRight: "8px" }}
        />
        <button onClick={submit}>Add</button>
      </div>
    </div>
  );
}

export default App;
