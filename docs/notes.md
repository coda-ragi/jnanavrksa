# Concepts 
- DOM
- Events 
  - Event handlers 
  - Event listeners 
- States 
- Components 
- Props 
- Conditional Rendering 
- Controlled Input 








# Controlled input with state variable

An input like <input /> is uncontrolled. Even if you pass an initial value like <input defaultValue="Initial text" />, your JSX only specifies the initial value. It does not control what the value should be right now .i.e in any given instance. 

To render a controlled input, pass the value prop to it (or checked for checkboxes and radios). React will force the input to always have the value you passed. Usually, you would do this by declaring a state variable:

## Example

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