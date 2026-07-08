### 06-07-2026

# Concepts 
- DOM
- Events 
- States 
- Components 
- Props 
- Conditional Rendering 
- Controlled Input 

## DOM
Connects web pages to scripts or programming language by representing the structure of a document in memory. 

## Events
Nothing happens until something happens. 
What are events? Any trigger caused by the user(clicking, typing, etc.)

### Adding event handlers:
```jsx
export default function Button() {
  function handleclick(){
    alert('You clicked me! ');
  }
  return(
    <button onClick = {handleClick}>
    Click me
    <\button>
  );
}

```

### States
A component's memory
Components often need to change what's on the screen as a result of an interaction.
And a regular variable isn't enough because : 
- A local variable doesn't persist between renders because on the render it's rendered from scratch.
- Changes to local variable won't trigger renders. 

so two things need to happen :
- A state variable to retain the data between renders. 
- A state setter function to update the render component. 

```jsx 
import {usestate} from 'react'
.
.
.

const [Index, setIndex] = useState(0); //index is a state variable and setIndex is a state setter variable
```





## Conditional Rendering
Conditional rendering means showing different UI based on a condition.
You can use JavaScript conditions like `if`, `&&`, or the ternary operator inside JSX.

### Using Ternary operator
```jsx
function Greeting({ isLoggedIn }) {
  return isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please log in.</h1>;
}
```

### Using Logical AND operator 
```jsx
function UserPanel({ isLoggedIn, username }) {
  return (
    <div>
      {isLoggedIn && <p>Welcome, {username}!</p>}
    </div>
  );
}
```

## Controlled input with state variable

An input like <input /> is uncontrolled. Even if you pass an initial value like <input defaultValue="Initial text" />, your JSX only specifies the initial value. It does not control what the value should be right now .i.e in any given instance. 

To render a controlled input, pass the value prop to it (or checked for checkboxes and radios). React will force the input to always have the value you passed. Usually, you would do this by declaring a state variable:

### Example

```jsx
function Form() {
  const [firstName, setFirstName] = useState(""); //Declare a state variable 

  return (
    <input
      value={firstName}  //here we match the input value to the state variable 
      onChange={e => setFirstName(e.target.value)}
    />
  );
}
```