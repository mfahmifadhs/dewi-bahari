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
import { cilPlus, cilUserPlus } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate } from 'react-router-dom'

const Create = () => {
  const user = JSON.parse(localStorage.getItem('token'))
  const [kdKab, setKabKot] = useState('')
  const [category, setCategory] = useState('')
  const [destination, setDestination] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [embMap, setEmbMap] = useState('')
  const [userId, setUserId] = useState('')
  const [filePict, setFilePict] = useState('')
  const [preview, setPreview] = useState('')
  const [users, setUser] = useState([])
  const [prov, setProv] = useState([])
  const [cities, setCities] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')

  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const loadImage = (e) => {
    const image = e.target.files[0]
    setFilePict(image)
    setPreview(URL.createObjectURL(image))
  }

  const handleProvinceSelection = (e) => {
    setSelectedProvince(e.target.value)
  }

  useEffect(() => {
    addDestination()
    getProv()
    getUser()
    getCities()
    // setCities(response.data)
  }, [selectedProvince])

  const addDestination = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        'http://localhost:5000/dt',
        {
          kdProv: selectedProvince,
          kdKab,
          category,
          destination,
          description,
          address,
          embMap,
          userId: user.role == 1 ? userId : user.id,
          filePict,
        },
        {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        },
      )
      navigate('/dt')
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  const getProv = async () => {
    const response = await axios.get('http://localhost:5000/pv')
    setProv(response.data)
  }

  const getCities = async () => {
    const response = await axios.get(`http://localhost:5000/ct/pv/${selectedProvince}`)
    setCities(response.data)
  }

  const getUser = async () => {
    const response = await axios.get('http://localhost:5000/us')
    setUser(response.data)
  }

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Tambah Destinasi Wisata</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={addDestination}>
                <div className="mb-3">
                  <CRow>
                    <CCol xs={6}>
                      <CFormLabel>Provinsi*</CFormLabel>
                      <CFormSelect
                        size="xs"
                        value={selectedProvince}
                        onChange={handleProvinceSelection}
                        required
                      >
                        <option value="">-- Pilih Provinsi --</option>
                        {prov.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.province}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol xs={6}>
                      <CFormLabel>Kabupaten/Kota*</CFormLabel>
                      <CFormSelect
                        size="xs"
                        value={kdKab}
                        onChange={(e) => setKabKot(e.target.value)}
                        required
                      >
                        <option value="">-- Pilih Kabupaten/Kota --</option>
                        {cities.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.city}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                  </CRow>
                </div>
                <div className="mb-1">
                  <CRow>
                    <CCol xs={6}>
                      <CFormLabel>Pengelola*</CFormLabel>

                      {user.role == 1 ? (
                        <CFormSelect
                          size="xs"
                          className="mb-3"
                          value={userId}
                          onChange={(e) => setUserId(e.target.value)}
                          required
                        >
                          <option value="">-- Pilih Pengelola --</option>
                          {users.map((value, index) => (
                            <option key={value.id} value={value.id}>
                              {value.name}
                            </option>
                          ))}
                        </CFormSelect>
                      ) : (
                        <CFormSelect
                          size="xs"
                          className="mb-3"
                          value={user.id}
                          onChange={(e) => setUserId(user.id)}
                          required
                        >
                          <option key={user.id}>{user.name}</option>
                        </CFormSelect>
                      )}
                    </CCol>
                    <CCol xs={6}>
                      <CFormLabel>Pilih Kelas*</CFormLabel>
                      <CFormSelect
                        size="xs"
                        className="mb-3"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="">-- Pilih Kelas --</option>
                        <option value="1">Kelas 1</option>
                        <option value="2">Kelas 2</option>
                        <option value="3">Kelas 3</option>
                        <option value="4">Kelas 4</option>
                      </CFormSelect>
                    </CCol>
                  </CRow>
                </div>
                <div className="mb-3">
                  <CFormLabel>Foto Header*</CFormLabel>
                  <CFormInput type="file" onChange={loadImage} required></CFormInput>
                  <span className="file-cta">
                    <span className="file-label small">(Ukuran gambar maksimal 5 MB)</span>
                  </span>
                  {preview ? (
                    <figure className="image is-128x128">
                      <img src={preview} alt="Preview Image" className="img-fluid" width="200" />
                    </figure>
                  ) : (
                    ''
                  )}
                  <span className="text-danger mb-3">{msg}</span>
                </div>
                <div className="mb-3">
                  <CFormLabel>Nama Destinasi Wisata*</CFormLabel>
                  <CFormInput
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Nama Destinasi Wisata"
                    required
                  ></CFormInput>
                </div>
                <div className="mb-3">
                  <CFormLabel>Deskripsi Destinasi Wisata*</CFormLabel>
                  <CFormTextarea
                    rows="3"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Deskripsi Destinasi Wisata"
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel>Alamat Destinasi Wisata*</CFormLabel>
                  <CFormTextarea
                    rows="3"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Alamat Destinasi Wisata"
                    required
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel>
                    Lokasi Peta* <Link to="">?</Link>
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    value={embMap}
                    onChange={(e) => setEmbMap(e.target.value)}
                    placeholder="Embed Map  Lokasi Peta"
                    required
                  ></CFormInput>
                </div>
                <CButton
                  color="primary"
                  type="submit"
                  onClick={() => window.confirm('Tambah Baru?')}
                  className="mt-4"
                >
                  <strong>
                    <CIcon style={{ color: 'dark' }} icon={cilPlus} size="lg" />
                    &nbsp; TAMBAH
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

export default Create
