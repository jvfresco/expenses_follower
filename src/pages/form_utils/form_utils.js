import {required, length} from '../../utils/validators'
import React from 'react'

export function updateFormState(input, value, prevState, formName){
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

export  function handleFormSubmit(e, state, onSubmit, inputChangeHandler, formName){
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

  

export const useForm = (initialState) => {
  const [state, setState] = React.useState({...initialState, formIsValid:false})

  const inputChangeHandler = (input, value) => {
    setState(prevState => {
      return updateFormState(input, value, prevState, Object.keys(state)[0])
    });
  };

  return {state, handleFormSubmit, inputChangeHandler}
}