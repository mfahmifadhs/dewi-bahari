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

const Menu = () => {
  const [menus, setMenu] = useState([])

  useEffect(() => {
    getMenu()
  }, [])

  const getMenu = async () => {
    const response = await axios.get('http://localhost:5000/menu')
    setMenu(response.data)
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
                <CTableHeaderCell>Menu</CTableHeaderCell>
                <CTableHeaderCell>Deskripsi</CTableHeaderCell>
                <CTableHeaderCell className="text-center" style={{ width: '15%' }}>
                  Aksi
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {menus.map((menu, index) => (
                <CTableRow v-for="item in tableItems" key={index}>
                  <CTableDataCell className="text-center">
                    <div>{index + 1}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{menu.menu}</div>
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{menu.description}</div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <Link to={`/menu/edit/${menu.id}`} className="btn btn-warning">
                      <CIcon
                        style={{ color: 'dark' }}
                        icon={cilPencil}
                        size="lg"
                        title="Edit Menu"
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

export default Menu
