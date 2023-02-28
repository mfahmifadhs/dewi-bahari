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
import { cilInfo, cilPencil } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'
import ConfirmButton from 'src/components/ConfirmButton'

const User = () => {
  const user = JSON.parse(localStorage.getItem('token'))
  const [users, setUser] = useState([])

  useEffect(() => {
    getUser()
    deleteUser()
  }, [])

  const getUser = async () => {
    const response = await axios.get('http://localhost:5000/us')
    setUser(response.data)
  }

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/us/${id}`)
    getUser()
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
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Kontak</CTableHeaderCell>
                <CTableHeaderCell style={{ width: '30%' }}>Alamat</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Role</CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ width: '15%' }}>
                  Aksi
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {users.map((value, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <div>{index + 1}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.email}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.phoneNum}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.address}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div>{value.t_role.role}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <Link to={`/us/${value.id}`} className="btn btn-primary">
                      <CIcon
                        style={{ color: 'dark' }}
                        icon={cilInfo}
                        size="lg"
                        title="Detail User"
                      />
                    </Link>{' '}
                    <Link to={`/us/edit/${value.id}`} className="btn btn-warning">
                      <CIcon
                        style={{ color: 'dark' }}
                        icon={cilPencil}
                        size="lg"
                        title="Edit User"
                      />
                    </Link>{' '}
                    {value.id == user.id ? (
                      ''
                    ) : (
                      <ConfirmButton
                        className="btn btn-danger"
                        message="Apakah anda ingin menghapus data user ini?"
                        onConfirm={() => deleteUser(value.id)}
                      />
                    )}
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

export default User
