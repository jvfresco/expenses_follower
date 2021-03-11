/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import React, {useMemo} from 'react'
import CategoryForm from './CategoryForm'
import Table from './Table'
import {useCategories, useRemoveMutation} from './hooks'
import * as CATEGORY from './category_types'
import {FormattedMessage} from 'react-intl'

const CategoriesPage = ({type}) => {
  
  const { data: categories, isError, isLoading, isSuccess, error } = useCategories(type)
  const {mutate: remove} = useRemoveMutation(type)
  console.log(categories)
  const columns = useMemo(
    () => [
      {
        Header: <FormattedMessage id="category.category" />, //Column name
        accessor: "name", // name of the key in data
      },
      {
        // expander cell
        Header: <FormattedMessage id="table.edit" />, // No header
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
        Header: <FormattedMessage id="table.delete" />,
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
    (id) => <CategoryForm type={type} id={id}/>,
    [type]
  )
  
  let headers = {}

  switch (type) {
    case CATEGORY.EXPENSE:
      headers = {
        formHeader: <FormattedMessage id="category.form.header.expense" />,
        tableHeader: <FormattedMessage id="category.table.header.expense" />,
      };
      break;
    case CATEGORY.INCOME:
      headers = {
        formHeader: <FormattedMessage id="category.form.header.income" />,
        tableHeader: <FormattedMessage id="category.table.header.income" />,
      };
      break;
    case CATEGORY.PAYMENT:
      headers = {
        formHeader: <FormattedMessage id="category.form.header.payment" />,
        tableHeader: <FormattedMessage id="category.table.header.payment" />,
      };
      break;
    case CATEGORY.COLLECTION:
      headers = {
        formHeader: <FormattedMessage id="category.form.header.collection" />,
        tableHeader: <FormattedMessage id="category.table.header.collection" />,
      };
      break;
    default:
      break;
  }
  

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
        {headers.formHeader}
      </h1>

      <CategoryForm type={type}/>

      <h1 css={{marginBottom: '4rem'}}>
        {headers.tableHeader}
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