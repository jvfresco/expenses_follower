import React from 'react'
import userEvent from '@testing-library/user-event'
import Login from './Login'
import Signup from './Signup'
import {screen, fireEvent, render, act, waitForElementToBeRemoved} from '../../test_utils/utils'
import messages from '../../translations/en.json'

describe('Testing LOGIN component',()=>{
    test('Should render all expected UI form elements',async()=> {
        render(<Login />)
        await waitForElementToBeRemoved(()=> expect(screen.getByText(/loading/i)))
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByRole('button', {name:/login/i})).toBeInTheDocument()
        expect(screen.getByRole('link', {name:/signup/i})).toBeInTheDocument()
    })

    test('Should execute onLogin function when login button is clicked with the values in the input fields',async()=>{
        const handleLogin = jest.fn()
        render(<Login onSubmit={handleLogin}/>)
        await waitForElementToBeRemoved(()=> expect(screen.getByText(/loading/i)))
        const email = 'chucknorris@gmail.com'
        const password = 'i need no password'

        userEvent.type(screen.getByLabelText(/email/i), email)
        userEvent.type(screen.getByLabelText(/password/i), password)
        userEvent.click(screen.getByRole('button', {name:/login/i}))
        expect(handleLogin).toBeCalledTimes(1)
        expect(handleLogin).toBeCalledWith({email: email, password: password})
    })

    test('Should display validation errors if inputs fields do not validate', async () => {
        render(<Login />)
        await waitForElementToBeRemoved(()=> expect(screen.getByText(/loading/i)))
        const emailInput = screen.getByLabelText(/email/i)
        const passwordInput = screen.getByLabelText(/password/i)
        fireEvent.change(emailInput, {target: {value: 'aaa'}})
        fireEvent.change(passwordInput, {target: {value: 'aaa'}})
        expect(screen.getByText(messages['validation.email'])).toBeInTheDocument()
        expect(screen.getByText(messages['validation.password'])).toBeInTheDocument()
    })
    test('Should NOT execute onLogin if there are validation errors', async() => {
        const handleLogin = jest.fn()
        render(<Login onLogin={handleLogin}/>)
        await waitForElementToBeRemoved(()=> expect(screen.getByText(/loading/i)))
        userEvent.click(screen.getByRole('button', {name:/login/i}))
        expect(handleLogin).not.toBeCalledTimes(1)
    }) 
})

describe('Testing SIGNUP component', ()=> {
    test('Should render all expected UI form elements',async()=> {
        render(<Signup />)
        await waitForElementToBeRemoved(()=> expect(screen.getByText(/loading/i)))
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
        expect(screen.getByRole('button', {name:/signup/i})).toBeInTheDocument()
        expect(screen.getByRole('link', {name:/login/i})).toBeInTheDocument()
    })

    test('Should execute signup function when signup button is clicked with the values in the input fields',async()=> {
        const handleSignup = jest.fn()
        render(<Signup onSubmit={handleSignup}/>)
        await waitForElementToBeRemoved(()=> expect(screen.getByText(/loading/i)))
        const email = 'chucknorris@gmail.com'
        const password = 'i need no password'
        const name = "Chuck"

        userEvent.type(screen.getByLabelText(/email/i), email)
        userEvent.type(screen.getByLabelText(/password/i), password)
        userEvent.type(screen.getByLabelText(/name/i), name)
        userEvent.click(screen.getByRole('button', {name:/signup/i}))
        expect(handleSignup).toBeCalledTimes(1)
        expect(handleSignup).toBeCalledWith({email: email, name:name, password: password})
    })
    test('Should show proper validation errors if submitted data is invalid', async() => {
        render(<Signup />)
        await waitForElementToBeRemoved(()=> expect(screen.getByText(/loading/i)))
        userEvent.click(screen.getByRole('button', {name: /signup/i}))
        expect(screen.getByText(messages['validation.email'])).toBeInTheDocument()
        expect(screen.getByText(messages['validation.password'])).toBeInTheDocument()
        expect(screen.getByText(messages['validation.required'])).toBeInTheDocument()
    })
    test('Should NOT execute signup function if there are validation errors', async() => {
        const handleSignup = jest.fn()
        render(<Signup onSubmit={handleSignup}/>)
        await waitForElementToBeRemoved(()=> expect(screen.getByText(/loading/i)))
        userEvent.click(screen.getByRole('button', {name:/signup/i}))
        expect(handleSignup).not.toBeCalledTimes(1)
    }) 
})
