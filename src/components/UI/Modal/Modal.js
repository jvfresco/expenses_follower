
/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import ReactDOM from 'react-dom';
import {FormattedMessage} from 'react-intl'

import {Button} from '../Button/Button';

//TODO: Create closing button, context for all modal?
const ModalCloseButton = () => {

}

const ModalTitle = (props) => (
  <header
        className="modal__header"
        css={css`
          border-bottom: 2px solid #fff;
        `}
      >
        <h1
          css={css`
            font-size: 3rem;
            color: var(--colors-primary);
            padding: 1rem 0;
            background-color: var(--colors-menu-text-hover);
            text-align: center;
          `}
        >
          {props.title}
        </h1>
      </header>
)

const ModalActionButtons = (props) => (
  <div
        css={css`
          padding: 1rem;
          text-align: right;
        `}
      >
        <Button design="danger" mode="flat" onClick={props.onCancelModal}>
          <FormattedMessage id='button.cancel'/>
        </Button>
        <Button
          mode="raised"
          onClick={props.onAcceptModal}
          disabled={!props.acceptEnabled}
          loading={props.isLoading}
        >
          <FormattedMessage id='button.accept'/>
        </Button>
      </div>
)

const ModalContent = (props) => (
    <div
        className="modal__content"
        css={css`
          padding: 1rem;
          text-align:center;
        `}
      >
        {props.children}
      </div>
)

const Modal = (props) =>{

  let portalRoot = document.getElementById('modal-root')
  if(!portalRoot){
    portalRoot = document.createElement('div')
    portalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(portalRoot)
  }

  return(
  ReactDOM.createPortal(
    <div
      className="modal"
      css={css`
        position: fixed;
        width: 35%;
        transform: translateX(-50%);
        left: 50%;
        top: 20vh;
        background-color: var(--colors-primary);
        border-radius: 5px;
        z-index: 200;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        
      `}
    >
      {props.children}
      
    </div>
    ,
    portalRoot
  )

  )}
export {Modal, ModalContent, ModalCloseButton, ModalActionButtons, ModalTitle};
