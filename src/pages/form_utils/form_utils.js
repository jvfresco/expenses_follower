import React from 'react'

//Validates the new input value and the whole form
function updateFormState(input, value, prevState, formName){
          let isValid = true;
          if(prevState[formName][input].validators){
            for (const validator of prevState[formName][input].validators) {
              isValid = isValid && validator(value);
            }
          }
          const updatedForm = {
            ...prevState[formName],
            [input]: {
              ...prevState[formName][input],
              valid: isValid,
              value: value,
              touched: true
            }
          };
          let formIsValid = true;
          for (const inputName in updatedForm) {
            formIsValid = formIsValid && updatedForm[inputName].valid;
          }
          return {
            [formName]: updatedForm,
            formIsValid: formIsValid
          };
        
}

//executed onSubmit
//Checks for global form validity and submits data or touches the cells if validation failed
function handleFormSubmit(e, state, onSubmit, inputChangeHandler, formName){
    e.preventDefault()
    if(state.formIsValid){
      let values = {}
      Object.keys(state[formName]).forEach(key => {
        values[key] = state[formName][key].value
      })
      onSubmit(values)
    } else {
        Object.keys(state[formName]).forEach((key) => {
            inputChangeHandler(key, state[formName][key].value)
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
      return updateFormState(input, value, prevState, Object.keys(state)[0])
    });
  };

  return {state, handleFormSubmit, inputChangeHandler}
}