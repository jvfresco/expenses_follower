import {FormattedMessage} from 'react-intl'
import {Button} from '../Button/Button'

const SaveButton = ({ onClick, loading, ...props }) => (
  <Button
    design="primary"
    type="button"
    loading={loading}
    style={{ width: "100%" }}
    onClick={() => onClick()}
    {...props}
  >
    <FormattedMessage id="button.save" />
  </Button>
);

const EditButton = ({ onClick, loading, ...props }) => (
  <Button
    design="secondary"
    type="button"
    loading={loading}
    style={{ width: "50%" }}
    onClick={() => onClick()}
    {...props}
  >
    <FormattedMessage id="button.edit" />
  </Button>
);

const DeleteButton = ({ onClick, loading, ...props }) => (
  <Button
    design="danger"
    type="button"
    loading={loading}
    style={{ width: "50%" }}
    onClick={() => onClick()}
  >
    <FormattedMessage id="button.delete" />
  </Button>
);


const FormControls = (props) => {
    return (
        <div css={{marginBottom: '4rem'}}>
            {props.children}
        </div>
      );
}

export {SaveButton, EditButton, DeleteButton, FormControls}