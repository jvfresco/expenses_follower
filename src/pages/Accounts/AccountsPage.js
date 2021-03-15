import AccountForm from './AccountForm'
import React, {useMemo} from 'react'
import {useTableData, useRemoveMutation, useDataMutation} from '../page_utils/data_hooks'
import {FormattedMessage} from 'react-intl'
import {PageWrapper, TableHeader, PageHeader, ConditionalTable} from '../../components/Table/PageWrapper'
import {useHeaders} from '../page_utils/table_hooks'

const Accounts = () => {
    const {data: accounts, isLoading, isSuccess} = useTableData()
    // const {mutate: remove} = useRemoveMutation()
    const {update, remove, create, isCreating, isRemoving, isUpdating, error, isError} = useDataMutation()
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
      (id) => <AccountForm id={id} update={update} remove={remove} isRemoving={isRemoving} isUpdating={isUpdating} error={error} isError={isError}/>,
      [error, isError, isRemoving, isUpdating, remove, update]
    )
    
    return (
      <PageWrapper>
        <PageHeader id='account.form.header.account'/>
          <AccountForm create={create} isCreating={isCreating} error={error} isError={isError}/>
        <TableHeader id='account.table.header.account' />
        <ConditionalTable 
          columns={columns}
          data={accounts}
          renderRowSubComponent={rowSubComponent}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </PageWrapper>
    )
}

export default Accounts