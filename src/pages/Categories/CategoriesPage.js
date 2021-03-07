/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import React, {useMemo} from 'react'
import CategoryForm from './CategoryForm'


import Table from './Table'

import {useCategories, useRemoveMutation} from './hooks'


const CategoriesPage = (props) => {

  const type = props.purpose === 'expense' ? 'expense-category' : 'income-category'
  
  const { data: categories, isError, isLoading, isSuccess, error } = useCategories(props.token, type)
  const {mutate: remove} = useRemoveMutation(props.token, type)

  const columns = useMemo(
    () => [
      {
        Header: "Category name", //Column name
        accessor: "category", // name of the key in data
      },
      {
        // expander cell
        Header: "Edit", // No header
        id: "expander", 
        Cell: ({ row, rows }) => (
          <span
            {...row.getToggleRowExpandedProps({
              onClick: () => { //allows only one expanded row at a time
                const expandedRow = rows.find(r => r.isExpanded)
                if(expandedRow){
                  if(expandedRow.id !== row.id){
                    expandedRow.toggleRowExpanded(false)
                  }
                }
                row.toggleRowExpanded()
              },
            })}
          >
            {row.isExpanded ? "-" : "+"}
          </span>
        ),
        SubCell: () => null, 
      },
      {
        Header: "Delete",
        id: "delete",
        Cell: ({row}) => (
          <span onClick={() => remove(row.original._id)}>
            X
          </span>
        )
      }
    ],
    [remove]
  );

    const rowSubComponent = React.useCallback(
      (id) => (
        <div>
          <CategoryForm type={type} token={props.token} id={id}/>
        </div>
      ),
      [props.token, type]
    );

  return (
    <div css={{
      width: '40%', 
      padding: '4rem 6rem',
      margin: '3rem auto',
      backgroundColor: 'var(--colors-primary)',
      color: 'var(--colors-menu-text)',
      borderRadius: '5px',

    }}>
      <h1 css={{marginBottom: '4rem'}}>
        {props.purpose === "expense"
          ? "Add new expense category"
          : "Add new income category"}
      </h1>
      <CategoryForm type={type} token={props.token} />

      <h1 css={{marginBottom: '4rem'}}>
        {props.purpose === "expense"
          ? "Available expense categories"
          : "Available income categories"}
      </h1>

      {isLoading ? (
        <div>'Loading data...'</div>
      ) : isSuccess ? (
        <Table
          columns={columns}
          data={categories}
          renderRowSubComponent={rowSubComponent}
        />
      ) : null}
    </div>
  );
}

export default CategoriesPage