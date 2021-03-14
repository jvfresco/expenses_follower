/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
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
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
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
            fontWeight: 'bold'
          }}>
            <p>Uh oh... There's a problem. You should try again.</p>
            <p>{error.message}</p>
          </div>
      )
  }