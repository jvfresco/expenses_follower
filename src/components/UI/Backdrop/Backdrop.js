/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import ReactDOM from 'react-dom';



const backdrop = props => {
  let portalRoot = document.getElementById('backdrop-root')
  if(!portalRoot){
    portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'backdrop-root')
    document.body.appendChild(portalRoot)
  }
  return(
  ReactDOM.createPortal(
    <div
      className={'backdrop'}
      onClick={props.onClick}
      css={css`
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.75);
        z-index: 100;
        position: fixed;
        left: 0;
        top: 0;
        transition: opacity 0.3s ease-out;
        opacity: 1;
      `}
    />,
    portalRoot
  )
  )
}
export default backdrop;
