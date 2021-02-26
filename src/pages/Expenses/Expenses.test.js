
import ExpenseForm from './ExpenseForm'
import {screen, fireEvent, render} from '../../test_utils/utils'
import userEvent from '@testing-library/user-event'




describe('ExpenseForm component test', () => {
    test('Does it render all expected input fields', () => {
        render(<ExpenseForm />)
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/amount/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/tax/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/type/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
    })

    test('If form submited with invalid inputs should not call onSubmit',()=> {
        const handleSubmit = jest.fn()
        render(<ExpenseForm onSubmit={handleSubmit}/>)
        screen.getByRole('button', {name:/save/i}).click()
        expect(handleSubmit).not.toBeCalledTimes(1)
    })

    test('If form is valid expect execution of onSubmit prop with expected fields',() => {
        const handleSubmit = jest.fn()
        render(<ExpenseForm onSubmit={handleSubmit}/>)
        const amount = "12"
        const description = 'testing'
        const date = '2019-03-29'
        const tax = "1"

        userEvent.type(screen.getByLabelText(/amount/i), amount)
        userEvent.type(screen.getByLabelText(/description/i), description)
        userEvent.type(screen.getByLabelText(/tax/i), tax)

        fireEvent.change(screen.getByLabelText('date'), {target: {value: date}})
        expect(screen.getByLabelText('date').value).toEqual(date)

        fireEvent.change(screen.getByLabelText(/category/i), { target: { value: 'cat1' } })
        fireEvent.change(screen.getByLabelText(/type/i), { target: { value: 'type1' } })
        fireEvent.change(screen.getByLabelText(/account/i), { target: { value: 'account1' } })

        expect(screen.getByRole('option', {name: 'cat1'}).selected).toBeTruthy()
        expect(screen.getByRole('option', {name: 'type1'}).selected).toBeTruthy()
        expect(screen.getByRole('option', {name: 'account1'}).selected).toBeTruthy()

        userEvent.click(screen.getByRole('button', {name: /save/i}))
     
        expect(handleSubmit).toBeCalledTimes(1)
        expect(handleSubmit).toBeCalledWith({amount, description, date, tax, category: 'cat1', type: 'type1', account: 'account1'})
    })
})