import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
        <span className="ms-1">&copy; 2023 Dewi Bahari.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Created by</span>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Tech Team
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
