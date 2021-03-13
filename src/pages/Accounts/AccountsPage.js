/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import AccountForm from './AccountForm'
import React, {useMemo} from 'react'
import {useAuth} from '../../context/auth-context'
import {useAccounts, useRemoveMutation} from './hooks'
import {FormattedMessage} from 'react-intl'
import Table from '../Categories/Table'

const Accounts = () => {
    const {user} = useAuth()
    const {data: accounts, error, run, isLoading, isError, isSuccess} = useAccounts()
    const {mutate: remove} = useRemoveMutation()
   
    const columns = useMemo(
      () => [
        {
          Header: "Account name", //Column name
          accessor: "name", // name of the key in data
        },
        {
          Header: 'Position amount',
          accessor: "position"
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