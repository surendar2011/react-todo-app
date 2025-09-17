import React, { useState } from "react"; // Import React and the useState hook for managing state

function App() {
  // Declare a state variable 'myArray' initialized with an initial list of fruits and a way to update it
  const [myArray, setMyArray] = useState(['apple', 'banana', 'orange']);


  // Declare a state variable to store the current input value from the user
  const [inputValue, setInputValue] = useState("");

  // Create a list of <p> elements by mapping over the array, each item gets a unique 'key' prop
  const myList = myArray.map((item, index) => <p key={index}>{item}</p>);

  // Function to update 'inputValue' state whenever the user types in the input field
  const handleInputChange = (e) => setInputValue(e.target.value);

  // Function to add the input value to the array when the button is clicked
  const submit = () => {
    // Only add if inputValue is not empty or just whitespace
    if (inputValue.trim() !== "") {
      // Create a new array with the existing items plus the new input value
      setMyArray([...myArray, inputValue.trim()]);
      // Clear the input field after adding the new item
      setInputValue("");
    }
  };

  
  return (
    <div>
      {myList}
      <input
        type="text"
        placeholder="enter list here"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={submit}>Add to list</button>
    </div>
  );
}

export default App;