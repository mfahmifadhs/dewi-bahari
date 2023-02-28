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
import { cilPencil, cilUserPlus } from '@coreui/icons'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Create = () => {
  const navigate = useNavigate()
  const [kdProv, setProv] = useState([])
  const [provName, setProvName] = useState([])
  const [kdKab, setKabKot] = useState([])
  const [cityName, setCityName] = useState([])
  const [destination, setDestination] = useState([])
  const [category, setCategory] = useState([])
  const [address, setAddress] = useState([])
  const [description, setDescription] = useState([])
  const [embMap, setEmbMap] = useState([])
  const [userId, setUserId] = useState([])
  const [users, setUser] = useState([])
  const [provs, setProvs] = useState([])
  const [cities, setCities] = useState([])
  const [filePict, setFilePict] = useState([])
  const [preview, setPreview] = useState('')
  const [msg, setMsg] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(false)
  const { id } = useParams()

  const loadImage = (e) => {
    const image = e.target.files[0]
    setFilePict(image)
    setPreview(URL.createObjectURL(image))
  }

  const handleProvinceSelection = (e) => {
    setSelectedProvince(e.target.value)
  }

  useEffect(() => {
    getDestinationById()
    getProv()
    getCities()
    getUser()
  }, [selectedProvince])

  const updateDestination = async (e) => {
    e.preventDefault()
    const saveProv = selectedProvince == false ? kdProv : selectedProvince
    try {
      await axios.patch(
        `http://localhost:5000/dt/${id}`,
        {
          kdProv: saveProv,
          kdKab,
          destination,
          category,
          address,
          description,
          embMap,
          userId,
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

  const getDestinationById = async () => {
    const response = await axios.get(`http://localhost:5000/dt/${id}`)
    setProv(response.data.kdProv)
    setProvName(response.data.t_province.province)
    setKabKot(response.data.kdKab)
    setCityName(response.data.t_city.city)
    setCategory(response.data.category)
    setDestination(response.data.destination)
    setAddress(response.data.address)
    setEmbMap(response.data.embMap)
    setDescription(response.data.description)
    setUserId(response.data.userId)
    setFilePict(response.data.filePict)
    setPreview(response.data.url)
  }

  const getProv = async () => {
    const response = await axios.get('http://localhost:5000/pv')
    setProvs(response.data)
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
              <strong>Edit Destinasi Wisata</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={updateDestination}>
                <div className="mb-3">
                  <CRow>
                    <CCol xs={6}>
                      <CFormLabel>Provinsi*</CFormLabel>
                      <CFormSelect
                        size="xs"
                        value={selectedProvince}
                        onChange={handleProvinceSelection}
                      >
                        <option value={kdProv}>{provName}</option>
                        {provs.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.province}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol xs={6}>
                      <CFormLabel>Kabupaten/Kota*</CFormLabel>
                      <CFormSelect size="xs" onChange={(e) => setKabKot(e.target.value)}>
                        <option value={kdKab}>
                          {cities.length == 0 ? cityName : '-- Pilih Kabupaten/Kota --'}
                        </option>
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
                      <CFormSelect
                        size="xs"
                        className="mb-3"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      >
                        <option value="">-- Pilih Pengelola --</option>
                        {users.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </CFormSelect>
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
                  <CFormInput type="file" onChange={loadImage}></CFormInput>
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
                  ></CFormInput>
                </div>
                <CButton
                  color="primary"
                  type="submit"
                  onClick={() => window.confirm('Ubah Informasi Destinasi Wisata?')}
                  className="mt-4"
                >
                  <strong>
                    <CIcon style={{ color: 'dark' }} icon={cilPencil} size="lg" title="Edit Menu" />
                    &nbsp; UBAH
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
