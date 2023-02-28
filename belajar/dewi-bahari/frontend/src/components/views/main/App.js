import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Beranda from "./pages/Beranda"
import Photo from "./pages/Galeri/Photo"
import Video from "./pages/Galeri/Video"
import Profil from "./pages/Profil"
import Tentang from "./pages/Tentang"
import Artikel from "./pages/Artikel"
import Mitra from "./pages/Mitra"
import DetailProfil from "./pages/DetailProfil"
import ArtikelDetail from "./pages/ArtikelDetail"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/beranda" element={<Beranda />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/galeri/foto" element={<Photo />} />
          <Route path="/galeri/video" element={<Video />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/mitra" element={<Mitra />} />
          <Route path="/profil/detail/:id" element={<DetailProfil />} />
          <Route path="/artikel/detail/:id" element={<ArtikelDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
