import React from 'react'

//Validates the new input value and the whole form
function updateFormState(input, value, prevState){
          let isValid = true;
          if(prevState[input].validators){
            for (const validator of prevState[input].validators) {
              isValid = isValid && validator(value);
            }
          }
          const updatedForm = {
            ...prevState,
            [input]: {
              ...prevState[input],
              valid: isValid,
              value: value,
              touched: true
            }
          };
          
          let formIsValid = true;
          for (const inputName in updatedForm) {
            if(updatedForm[inputName].valid){
              formIsValid = formIsValid && updatedForm[inputName].valid;
            }
          }
          return {
            ...updatedForm,
            formIsValid: formIsValid
          };
        
}

//executed onSubmit
//Checks for global form validity and submits data or touches the cells if validation failed
function handleFormSubmit(state, onSubmit, inputChangeHandler, e){
    e && e.preventDefault()
    if(state.formIsValid){
      let values = {}
      Object.keys(state).forEach(key => {
        if(key !== 'formIsValid'){
          values[key] = state[key].value
        }
      })
      onSubmit(values)
    } else {
        Object.keys(state).forEach((key) => {
            inputChangeHandler(key, state[key].value)  
        });
    }
  }

  
//Custom hook:
//Accepts an state object, 
//Returns the updated state, handleFormSubmit and inputChangeHandler
export const useForm = (initialState) => {
  const [state, setState] = React.useState({...initialState, formIsValid:false})
  //Each keystroke is updated here
  const inputChangeHandler = (input, value) => {
    setState(prevState => {
      return updateFormState(input, value, prevState)
    });
  };

  return {state, handleFormSubmit, inputChangeHandler}
}