/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import {FormattedMessage} from 'react-intl'

export function ErrorComponent({error}) {
    return (
      <div
        role="alert"
        css={{
          color: 'red',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '3rem'
        }}
      >
        <p><FormattedMessage id='error.page'/></p>
        <pre>{error.message}</pre>
      </div>
    )
  }

  export function InlineError({error}) {
      return(
          <div role="alert"
          css={{
            color: 'red',
            margin: '1rem 0',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            <p><FormattedMessage id='error.inline'/></p>
            <p>{error.message}</p>
          </div>
      )
  }