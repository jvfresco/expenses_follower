

import {screen, render} from '../../test_utils/utils'
import userEvent from '@testing-library/user-event'
import CategoriesPage from './CategoriesPage'
import CategoryForm from './CategoryForm'
import messages from '../../translations/en.json'


describe('Categories Page testing', () => {
    test('Loads proper expense page content based on props',() => {
        render(<CategoriesPage purpose='expense'/>)
        expect(screen.getAllByText(/expenses categories/i)).toHaveLength(2)
    })
    test('Loads proper income page content based on props',() => {
        render(<CategoriesPage purpose='income'/>)
        expect(screen.getAllByText(/incomes categories/i)).toHaveLength(2)
    })
   
})

describe('Category form tests', ()=> {
    test('If validation is not valid onSubmit is not executed, and error message is displayed', () => {
        const handleSubmit = jest.fn()
        render(<CategoryForm onSubmit={handleSubmit} />)
        userEvent.click(screen.getByRole('button', {name:/save/i}))
        expect(handleSubmit).not.toBeCalledTimes(1)
        expect(screen.getByText(messages['validation.length3'])).toBeInTheDocument()
    })
    test('If submited with valid data call onSubmit with the category field value', () => {
        const handleSubmit = jest.fn()
        const categoryTest = 'categoryTest'
        render(<CategoryForm onSubmit={handleSubmit} />)
        userEvent.type(screen.getByLabelText(/category/i), categoryTest)
        userEvent.click(screen.getByRole('button', {name: /save/i}))
        expect(handleSubmit).toBeCalledTimes(1)
        expect(handleSubmit).toBeCalledWith({category: categoryTest})
    })
})