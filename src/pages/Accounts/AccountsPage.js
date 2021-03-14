/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import AccountForm from './AccountForm'
import React, {useMemo} from 'react'
import {useTableData, useRemoveMutation} from '../page_utils/data_hooks'
import {FormattedMessage} from 'react-intl'
import Table from '../Categories/Table'
import {useHeaders} from '../page_utils/table_hooks'

const Accounts = () => {
    const {data: accounts, error, run, isLoading, isError, isSuccess} = useTableData()
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
    

    return(
      <div css={{
        width: '40%', 
        padding: '4rem 6rem',
        margin: '3rem auto',
        backgroundColor: 'var(--colors-primary)',
        color: 'var(--colors-menu-text)',
        borderRadius: '5px',
  
      }}>
        <h1 css={{marginBottom: '4rem'}}>
          Add new account
        </h1>
        <AccountForm />
        <h1 css={{marginBottom: '4rem'}}>
        Available accounts list
        </h1>
        {isLoading ? (
          <div>'Loading data...'</div>
        ) : isSuccess ? (
          <Table
            columns={columns}
            data={accounts}
            renderRowSubComponent={rowSubComponent}
          />
        ) : null}
    </div>
    )
}

export default Accounts