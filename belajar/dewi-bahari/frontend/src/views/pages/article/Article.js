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
import moment from 'moment'
import ConfirmButton from 'src/components/ConfirmButton'

const Article = () => {
  const user = JSON.parse(localStorage.getItem('token'))
  const navigate = useNavigate()
  const [articles, setArticle] = useState([])

  useEffect(() => {
    getArticle()
    deleteArticle()
  }, [])
  const getArticle = async () => {
    const response = await axios.get(`http://localhost:5000/ar/us/${user.id}`)
    setArticle(response.data)
  }

  const deleteArticle = async (id) => {
    await axios.delete(`http://localhost:5000/ar/${id}`)
    getArticle()
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CTable align="middle" className="mb-4 border bg-white table-bordered" hover responsive>
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell>No</CTableHeaderCell>
                <CTableHeaderCell>Tanggal</CTableHeaderCell>
                <CTableHeaderCell>Kreator</CTableHeaderCell>
                <CTableHeaderCell>Destinasi</CTableHeaderCell>
                <CTableHeaderCell>Judul</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Aksi</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {articles.map((value, index) => (
                <CTableRow v-for="item in tableItems" key={value.id}>
                  <CTableDataCell className="text-center">
                    <div>{index + 1}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{moment(value.createdAt).format('HH:mm / DD-MM-Y')}</div>
                  </CTableDataCell>
                  <CTableDataCell>{value.t_user.name}</CTableDataCell>
                  <CTableDataCell>
                    <div>{value.t_destination.destination}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{value.title}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="text-center">
                      {value.isApprove == 'true' ? '✅' : value.isApprove == null ? '' : '❌'}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <Link to={`/ar/${value.id}`} className="btn btn-primary">
                      <CIcon
                        style={{ color: 'dark' }}
                        icon={cilInfo}
                        size="lg"
                        title="Detail Destinasi Wisata"
                      />
                    </Link>{' '}
                    {value.isApprove == 'false' ? (
                      ''
                    ) : (
                      <Link to={`/ar/edit/${value.id}`} className="btn btn-warning">
                        <CIcon
                          style={{ color: 'dark' }}
                          icon={cilPencil}
                          size="lg"
                          title="Edit Destinasi Wisata"
                        />
                      </Link>
                    )}{' '}
                    <ConfirmButton
                      className="btn btn-danger"
                      message="Apakah anda ingin menghapus data destinasi wisata ini?"
                      onConfirm={() => deleteArticle(value.id)}
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

export default Article
