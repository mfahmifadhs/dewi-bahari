import React, { useEffect, useState } from 'react'
import ConfirmButton from 'src/components/ConfirmButton'

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
import { cilInfo, cilPencil, cilTrash } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom'

const Partner = () => {
  const [partners, setPartner] = useState([])

  useEffect(() => {
    getPartner()
    deletePartner()
  }, [])

  const getPartner = async () => {
    const response = await axios.get('http://localhost:5000/pt')
    setPartner(response.data)
  }

  const deletePartner = async (id) => {
    await axios.delete(`http://localhost:5000/pt/${id}`)
    getPartner()
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
                <CTableHeaderCell>Kategori</CTableHeaderCell>
                <CTableHeaderCell>Nama Mitra</CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ width: '20%' }}>
                  Logo
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ width: '15%' }}>
                  Aksi
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {partners.map((value, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <div>{index + 1}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.category}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.partner}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <figure className="image is-128x128 mt-3">
                      <img src={value.url} alt="Preview Image" className="img-fluid" width="100" />
                    </figure>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <Link to={`/pt/${value.id}`} className="btn btn-primary">
                      <CIcon
                        style={{ color: 'dark' }}
                        icon={cilInfo}
                        size="lg"
                        title="Detail Mitra"
                      />
                    </Link>{' '}
                    <Link to={`/pt/edit/${value.id}`} className="btn btn-warning">
                      <CIcon
                        style={{ color: 'dark' }}
                        icon={cilPencil}
                        size="lg"
                        title="Edit Mitra"
                      />
                    </Link>{' '}
                    <ConfirmButton
                      className="btn btn-danger"
                      message="Apakah anda ingin menghapus data mitra ini?"
                      onConfirm={() => deletePartner(value.id)}
                    />
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

export default Partner
