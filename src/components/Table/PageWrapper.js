/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import {FormattedMessage} from 'react-intl'
import Table from './Table'
import {InlineError} from '../Error/ErrorComponent'

const PageHeader = ({id}) => (
    <h1 css={{marginBottom: '4rem'}}>
          <FormattedMessage id={id} />
    </h1>
)

const TableHeader = ({id}) => (
    <h1 css={{marginBottom: '4rem'}}>
          <FormattedMessage id={id} />
    </h1>
)

const ConditionalTable = ({isLoading, isSuccess, isError, error, columns, data, renderRowSubComponent, }) => {
  if(isError){
    return <InlineError error={error} />
  }
  if(isLoading){
    return <div>'Loading data...'</div>
  }
  if(isSuccess){
    return <Table columns={columns} data={data} renderRowSubComponent={renderRowSubComponent}/>
  }
}

const PageWrapper = ({children}) => (
    <div css={{
        width: '40%', 
        padding: '4rem 6rem',
        margin: '3rem auto',
        backgroundColor: 'var(--colors-primary)',
        color: 'var(--colors-menu-text)',
        borderRadius: '5px',
    }}>
        {children}
    </div>
)

export {PageWrapper, TableHeader, PageHeader, ConditionalTable}