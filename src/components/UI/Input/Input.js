import React from 'react';
import styled from '@emotion/styled'
import CurrencyInput from 'react-currency-input-field'



export const StyledInput = styled.input({
    margin: "1rem 0",
    width: "100%",
    height: "4rem",
    display: "block",
    font: "inherit",
    fontSize: "1.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "3px",
    border: "1px solid #ccc",
    ":focus":{
        outline: "none",
        borderColor: "#33a2ff",
        color: "#33a2ff",
    },
    ":placeholder-shown + label":{
        opacity: "0",
        visibility: "hidden",
        transform: "translateY(-2rem)",
    }
},
props => ({
    borderColor: (props.touched && props.invalid) ? "red" : "none",
    backgroundColor: (props.touched && props.invalid) ? "#ffc2c2" : "white"
})
)

const StyledCurrency = StyledInput.withComponent(CurrencyInput)
const StyledSelector = StyledInput.withComponent('select')

const StyledLabel = styled.label({
    display: "block",
    textTransform: "uppercase",
    marginBottom: "0.25rem",
    transition: "all .3s",
    transform: "translateY(-6.5rem)",
    color: "#999"
})

const ValidationMessage = styled.p({
  color: "red",
  marginTop: "-1.5rem",
  fontSize: "1.3rem"
})


const input = props => {

  //+ symbol before booleans avoids a warning caused by emotion painting the boolean into the DOM
return (
  <div className="input" style={{margin: "2rem 0"}}>
    
    {props.control === 'input' && (
      <StyledInput
        touched={+props.touched}
        invalid={+!props.valid}
        type={props.type}
        id={props.id}
        required={props.required}
        value={props.value}
        placeholder={props.placeholder}
        onChange={e => props.onChange(props.id, e.target.value, e.target.files)}
        onBlur={props.onBlur}
      />
    )}
    {props.control === 'currency' && (
      <StyledCurrency
        id={props.id}
        name={props.id}
        placeholder={props.placeholder}
        decimalsLimit={3}
        onValueChange={(value, name) => props.onChange(name, value)}
        allowNegativeValue= {false}
        value={props.value}
        invalid={+!props.valid}
        touched={+props.touched}
        intlConfig={{"locale":"de-DE","currency":"EUR"}}
      />
    )}
    {props.control === 'select' && (
      <StyledSelector
      name={props.name}
      id={props.id}
      touched={props.touched}
      invalid={!props.valid}
      onChange={(e) => props.onChange(props.id, e.target.value)}
     
    >
      {/* {props.options.length === 1 ? null : <option value=""></option>} */}
      <option value=""></option>
      {props.options.map((option) => {
        return (
          <option key={option.id} id={option.id} value={option.name}>
            {option.name}
          </option>
        );
      })}
    </StyledSelector>
    )

    }
    {props.label && <StyledLabel id={props.id} htmlFor={props.id}>{props.label}</StyledLabel>}
    {props.control === 'textarea' && (
      <textarea
        className={[
          !props.valid ? 'invalid' : 'valid',
          props.touched ? 'touched' : 'untouched'
        ].join(' ')}
        id={props.id}
        rows={props.rows}
        required={props.required}
        value={props.value}
        onChange={e => props.onChange(props.id, e.target.value)}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
      />
    )}
    
    {props.validationMessage && props.touched && !props.valid && <ValidationMessage>{props.validationMessage}</ValidationMessage>}
  </div>
)
};

export default input;