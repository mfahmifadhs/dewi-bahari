import React, { useEffect, useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { cilSave } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [menuId, setMenuId] = useState('')
  const [isCreate, setIsCreate] = useState(true)
  const [isRead, setIsRead] = useState(0)
  const [isUpdate, setIsUpdate] = useState(0)
  const [isDelete, setIsDelete] = useState(false)
  const [checkboxValue, setCheckboxValue] = useState(0)
  const navigate = useNavigate()
  const { id } = useParams()
  const [menus, setMenu] = useState([])

  const updateAccess = async (e) => {
    e.preventDefault()
    await axios.patch(`http://localhost:5000/ac/${id}`, {
      menuId,
      isCreate,
      isRead,
      isUpdate,
      isDelete,
    })
    navigate('/ac')
  }

  useEffect(() => {
    getAccessById()
    getMenu()
  }, [])

  const getAccessById = async () => {
    const response = await axios.get(`http://localhost:5000/ac/${id}`)
    setName(response.data.t_user.name)
    setEmail(response.data.t_user.email)
    setMenuId(response.data.menuId)
    setIsCreate(response.data.isCreate)
    setIsRead(response.data.isRead)
    setIsUpdate(response.data.isUpdate)
    setIsDelete(response.data.isDelete)
  }

  const getMenu = async () => {
    const response = await axios.get('http://localhost:5000/menu')
    setMenu(response.data)
  }

  const handleCheckboxChange = (event) => {
    setCheckboxValue(event.target.checked ? 1 : 0)
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Edit Akses</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={updateAccess}>
                <div className="mb-3">
                  <CFormLabel>Pengguna</CFormLabel>
                  <div className="form-group row">
                    <label className="col-md-1">Nama</label>
                    <div className="col-md-6">: {name}</div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-1">Email</label>
                    <div className="col-md-6">: {email}</div>
                  </div>
                </div>
                <div className="mb-3">
                  <CFormLabel>Menu</CFormLabel>
                  <CCol xs={4}>
                    <CFormSelect
                      size="xs"
                      className="mb-3"
                      value={menuId}
                      onChange={(e) => setMenuId(e.target.value)}
                    >
                      {menus.map((menu, index) => (
                        <option key={menu.id} value={menu.id}>
                          {menu.menu}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                </div>
                <div className="mb-3">
                  <CFormLabel>Kewenangan {isCreate} </CFormLabel>
                  <div className="row">
                    <div className="col-md-12 col-6">
                      <CFormCheck
                        checked={isCreate}
                        value={isCreate ? 1 : 0}
                        onChange={(e) => setIsCreate(e.target.value)}
                      />{' '}
                      Create &nbsp;
                      <CFormCheck
                        checked={isRead}
                        value={checkboxValue}
                        onChange={() => setIsRead(!isRead)}
                      />
                      Read &nbsp;
                      <CFormCheck
                        checked={isUpdate}
                        value={checkboxValue}
                        onChange={() => setIsUpdate(!isUpdate)}
                      />{' '}
                      Update &nbsp;
                      <CFormCheck
                        checked={isDelete}
                        value={checkboxValue}
                        onChange={() => setIsDelete(!isDelete)}
                      />{' '}
                      Delete
                    </div>
                  </div>
                </div>
                <CButton
                  className="mt-4 btn-sm"
                  color="primary"
                  type="submit"
                  onClick={() => window.confirm('Simpan Perubahan?')}
                >
                  <strong>
                    <CIcon style={{ color: 'dark' }} icon={cilSave} size="lg" title="Edit Menu" />
                    &nbsp; SIMPAN
                  </strong>
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Edit
