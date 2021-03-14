/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import AccountForm from './AccountForm'
import React, {useMemo} from 'react'
import {useTableData, useRemoveMutation} from '../page_utils/data_hooks'
import {FormattedMessage} from 'react-intl'
import {PageWrapper, TableHeader, PageHeader, ConditionalTable} from '../../components/Table/PageWrapper'
import {useHeaders} from '../page_utils/table_hooks'

const Accounts = () => {
    const {data: accounts, error, isLoading, isError, isSuccess} = useTableData()
    const {mutate: remove} = useRemoveMutation()
    const tableHeaders = useHeaders(remove)
    const columns = useMemo(
      () => [
        {
          Header: <FormattedMessage id='account.table.header.name' />, //Column name
          accessor: "name", // name of the key in data
        },
        {
          Header: <FormattedMessage id='account.table.header.balance' />,
          accessor: "position"
        },
        ...tableHeaders
      ],
      [tableHeaders]
    );

    const rowSubComponent = React.useCallback(
      (id) => <AccountForm id={id}/>,
      []
    )
    
    return (
      <PageWrapper>
        <PageHeader id='account.form.header.account'/>
          <AccountForm />
        <TableHeader id='account.table.header.account' />
        <ConditionalTable 
          columns={columns}
          data={accounts}
          renderRowSubComponent={rowSubComponent}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
          error={error}
        />
      </PageWrapper>
    )
}

export default Accounts