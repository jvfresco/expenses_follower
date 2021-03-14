/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import React, {useMemo} from 'react'
import CategoryForm from './CategoryForm'
import {useTableData, useRemoveMutation} from '../page_utils/data_hooks'
import * as ENDPOINTS from '../../routes/endpoints'
import {FormattedMessage} from 'react-intl'
import { useRouteMatch } from 'react-router-dom'
import {useHeaders} from '../page_utils/table_hooks'
import {PageWrapper, TableHeader, PageHeader, ConditionalTable} from '../../components/Table/PageWrapper'

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
        formHeader: "category.form.header.expense",
        tableHeader: "category.table.header.expense",
      };
      break;
    case ENDPOINTS.INCOME:
      headers = {
        formHeader: "category.form.header.income",
        tableHeader: "category.table.header.income",
      };
      break;
    case ENDPOINTS.PAYMENT:
      headers = {
        formHeader: "category.form.header.payment",
        tableHeader: "category.table.header.payment",
      };
      break;
    case ENDPOINTS.COLLECTION:
      headers = {
        formHeader: "category.form.header.collection",
        tableHeader: "category.table.header.collection",
      };
      break;
    default:
      break;
  }
  
  return (
    <PageWrapper>
      <PageHeader id={headers.formHeader}/>
        <CategoryForm />
      <TableHeader id={headers.tableHeader} />
      <ConditionalTable 
        columns={columns}
        data={categories}
        renderRowSubComponent={rowSubComponent}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
    </PageWrapper>
  )
}
export default CategoriesPage