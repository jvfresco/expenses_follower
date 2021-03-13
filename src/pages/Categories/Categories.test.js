

import {screen, render} from '../../test_utils/utils'
import userEvent from '@testing-library/user-event'
import CategoriesPage from './CategoriesPage'
import CategoryForm from './CategoryForm'
import messages from '../../translations/en.json'
import * as CATEGORY from './category_types'

describe('Categories Page testing', () => {
    test('Loads proper expense page content based on props',() => {
        render(<CategoriesPage type={CATEGORY.EXPENSE}/>)
        expect(screen.getByText(messages['category.form.header.expense'])).toBeInTheDocument()
        expect(screen.getByText(messages['category.table.header.expense'])).toBeInTheDocument()
    })
    test('Loads proper income page content based on props',() => {
        render(<CategoriesPage type={CATEGORY.INCOME}/>)
        expect(screen.getByText(messages['category.form.header.income'])).toBeInTheDocument()
        expect(screen.getByText(messages['category.table.header.income'])).toBeInTheDocument()
    })
    test('Loads proper payment page content based on props',() => {
        render(<CategoriesPage type={CATEGORY.PAYMENT}/>)
        expect(screen.getByText(messages['category.form.header.payment'])).toBeInTheDocument()
        expect(screen.getByText(messages['category.table.header.payment'])).toBeInTheDocument()
    })
    test('Loads proper collection page content based on props',() => {
        render(<CategoriesPage type={CATEGORY.COLLECTION}/>)
        expect(screen.getByText(messages['category.form.header.collection'])).toBeInTheDocument()
        expect(screen.getByText(messages['category.table.header.collection'])).toBeInTheDocument()
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
        userEvent.type(screen.getByLabelText(/name/i), categoryTest)
        userEvent.click(screen.getByRole('button', {name: /save/i}))
        expect(handleSubmit).toBeCalledTimes(1)
        expect(handleSubmit).toBeCalledWith({name: categoryTest})
    })
})