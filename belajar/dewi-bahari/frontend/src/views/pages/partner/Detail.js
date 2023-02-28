import React, { useEffect, useState } from 'react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CImage,
  CInputGroup,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { cilCalendar, cilPencil, cilUser } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import moment from 'moment/moment'

const Partner = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState([])
  const [partner, setPartner] = useState([])
  const [url, setUrl] = useState([])
  const { id } = useParams()

  useEffect(() => {
    getPartnerId()
  }, [])

  const getPartnerId = async () => {
    const response = await axios.get(`http://localhost:5000/pt/${id}`)
    setCategory(response.data.category)
    setPartner(response.data.partner)
    setUrl(response.data.url)
  }

  return (
    <>
      <div className="container">
        <div className="container-fluid" style={{ padding: '0px 200px' }}>
          <h5 className="mb-4">Detail Informasi Mitra</h5>
          <CRow>
            <CCol md={4}>
              <CCard style={{ height: '100%' }}>
                <CCardBody>
                  <CImage src={url} className="img-fluid" />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={8}>
              <CCard style={{ height: '100%' }}>
                <CCardBody>
                  <div className="form-group row p-2">
                    <label className="col-md-3">Kategori</label>
                    <div className="col-md-9">: {category}</div>
                  </div>
                  <div className="form-group row p-2">
                    <label className="col-md-3">Nama Mitra</label>
                    <div className="col-md-9">: {partner}</div>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </div>
      </div>
    </>
  )
}

export default Partner
