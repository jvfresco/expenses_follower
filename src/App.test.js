import React from 'react'
import userEvent from '@testing-library/user-event'
import App from './App'
import {render, screen} from './test_utils/utils'

describe('Testing APP component',()=>{
    test('Should render Global Position after logging in with a valid account',async() => {
        render(<App />)
        const email = 'test@test.com'
        const password = '12345'
        userEvent.type(screen.getByLabelText(/email/i), email)
        userEvent.type(screen.getByLabelText(/password/i), password)
        screen.getByRole('button', {name:/login/i}).click()
        expect(await screen.findByText(/global position view/i)).toBeInTheDocument()

    }
)}
)