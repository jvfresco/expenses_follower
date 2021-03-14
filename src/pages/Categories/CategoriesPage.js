/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import React, {useMemo} from 'react'
import CategoryForm from './CategoryForm'
import Table from './Table'
import {useTableData, useRemoveMutation} from '../page_utils/data_hooks'
import * as ENDPOINTS from '../../routes/endpoints'
import {FormattedMessage} from 'react-intl'
import { useRouteMatch } from 'react-router-dom'
import {useHeaders} from '../page_utils/table_hooks'

const CategoriesPage = () => {
  
  const { data: categories, isError, isLoading, isSuccess, error } = useTableData()
  const {mutate: remove} = useRemoveMutation()
  const {url} = useRouteMatch()
  const tableHeaders = useHeaders(remove)
  const columns = useMemo(
    () => [
      {
        Header: <FormattedMessage id="category.category" />, //Column name
        accessor: "name", // name of the key in data
      },
      ...tableHeaders
    ],
    [tableHeaders]
  );

  const rowSubComponent = React.useCallback(
    (id) => <CategoryForm id={id}/>,
    []
  )
  
  let headers = {}

  switch (url) {
    case ENDPOINTS.EXPENSE:
      headers = {
        formHeader: <FormattedMessage id="category.form.header.expense" />,
        tableHeader: <FormattedMessage id="category.table.header.expense" />,
      };
      break;
    case ENDPOINTS.INCOME:
      headers = {
        formHeader: <FormattedMessage id="category.form.header.income" />,
        tableHeader: <FormattedMessage id="category.table.header.income" />,
      };
      break;
    case ENDPOINTS.PAYMENT:
      headers = {
        formHeader: <FormattedMessage id="category.form.header.payment" />,
        tableHeader: <FormattedMessage id="category.table.header.payment" />,
      };
      break;
    case ENDPOINTS.COLLECTION:
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

      <CategoryForm/>

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