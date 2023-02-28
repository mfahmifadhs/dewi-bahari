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
import { Link, useNavigate } from 'react-router-dom'
import ConfirmButton from 'src/components/ConfirmButton'

const Destination = () => {
  const user = JSON.parse(localStorage.getItem('token'))
  const navigate = useNavigate()
  const [destinations, setDestination] = useState([])

  useEffect(() => {
    getDestination()
    deleteDestination()
  }, [])

  const getDestination = async () => {
    let response = ''
    if (user.role === 1) {
      response = await axios.get('http://localhost:5000/dt')
    } else {
      response = await axios.get(`http://localhost:5000/dt/us/${user.id}`)
    }
    setDestination(response.data)
  }

  const deleteDestination = async (id) => {
    await axios.delete(`http://localhost:5000/dt/${id}`)
    getDestination()
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CTable align="middle" className="mb-4 border bg-white table-bordered" hover responsive>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell>No</CTableHeaderCell>
                <CTableHeaderCell>Provinsi</CTableHeaderCell>
                <CTableHeaderCell>Kabupaten / Kota</CTableHeaderCell>
                <CTableHeaderCell>Kelas</CTableHeaderCell>
                <CTableHeaderCell>Destinasi Wisata</CTableHeaderCell>
                <CTableHeaderCell>Alamat</CTableHeaderCell>
                <CTableHeaderCell>Pengelola</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Aksi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {destinations.map((value, index) => (
                <CTableRow v-for="item in tableItems" key={value.id}>
                  <CTableDataCell className="text-center">
                    <div>{index + 1}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.t_province.province}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.t_city.city}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>Kelas {value.category}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.destination}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.address}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.t_user.name}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="text-center">
                      {value.isApprove == 'true' ? '✅' : value.isApprove == null ? '' : '❌'}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <Link to={`/dt/${value.id}`} className="btn btn-primary">
                      <CIcon
                        style={{ color: 'dark' }}
                        icon={cilInfo}
                        size="lg"
                        title="Detail Destinasi Wisata"
                      />
                    </Link>{' '}
                    <Link to={`/dt/edit/${value.id}`} className="btn btn-warning">
                      <CIcon
                        style={{ color: 'dark' }}
                        icon={cilPencil}
                        size="lg"
                        title="Edit Destinasi Wisata"
                      />
                    </Link>{' '}
                    {user.role != 1 ? (
                      ''
                    ) : (
                      <ConfirmButton
                        className="btn btn-danger"
                        message="Apakah anda ingin menghapus data destinasi wisata ini?"
                        onConfirm={() => deleteDestination(value.id)}
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

export default Destination
