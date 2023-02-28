import React, { useEffect, useState } from 'react'

import {
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { cilPencil } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'

const Access = () => {
  const [access, setAccess] = useState([])

  useEffect(() => {
    getAccess()
  }, [])

  const getAccess = async () => {
    const response = await axios.get('http://localhost:5000/ac')
    console.log(response.data)
    setAccess(response.data)
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CTable align="middle" className="mb-4 border bg-white table-bordered" hover responsive>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell className="text-center" style={{ width: '5%' }}>
                  No
                </CTableHeaderCell>
                <CTableHeaderCell>Nama</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Menu</CTableHeaderCell>
                <CTableHeaderCell>Create</CTableHeaderCell>
                <CTableHeaderCell>Read</CTableHeaderCell>
                <CTableHeaderCell>Update</CTableHeaderCell>
                <CTableHeaderCell>Delete</CTableHeaderCell>
                <CTableHeaderCell>Aksi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {access.map((value, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <div>{index + 1}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.t_user.email}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="text-center">{value.t_menu.menu}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="text-center">{value.isCreate}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="text-center">{value.isRead}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div className="text-center">{value.isUpdate}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div className="text-center">{value.isDelete}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <Link to={`/ac/edit/${value.id}`} className="btn btn-warning">
                      <CIcon
                        style={{ color: 'dark' }}
                        icon={cilPencil}
                        size="lg"
                        title="Edit User"
                      />
                    </Link>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
    </>
  )
}

export default Access
