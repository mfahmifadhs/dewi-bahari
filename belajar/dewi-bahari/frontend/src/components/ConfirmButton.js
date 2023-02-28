import React from 'react'
import PropTypes from 'prop-types'
import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

function ConfirmButton(props) {
  function handleClick() {
    const confirmed = window.confirm(props.message)
    if (confirmed) {
      props.onConfirm()
    }
  }

  return (
    <button onClick={handleClick} className="btn btn-danger">
      <CIcon style={{ color: 'dark' }} icon={cilTrash} size="lg" />
    </button>
  )
}

ConfirmButton.propTypes = {
  message: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default ConfirmButton
