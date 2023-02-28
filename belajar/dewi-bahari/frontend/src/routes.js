import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Menu
const Menu = React.lazy(() => import('./views/pages/menu/Menu'))
const EditMenu = React.lazy(() => import('./views/pages/menu/Edit'))
// User
const User = React.lazy(() => import('./views/pages/user/User'))
const DetailUser = React.lazy(() => import('./views/pages/user/Detail'))
const CreateUser = React.lazy(() => import('./views/pages/user/Create'))
const EditUser = React.lazy(() => import('./views/pages/user/Edit'))
// Access
const Access = React.lazy(() => import('./views/pages/access/Access'))
const CreateAccess = React.lazy(() => import('./views/pages/access/Create'))
const EditAccess = React.lazy(() => import('./views/pages/access/Edit'))
// Destination
const Destination = React.lazy(() => import('./views/pages/destination/Destination'))
const DetailDestination = React.lazy(() => import('./views/pages/destination/Detail'))
const CreateDestination = React.lazy(() => import('./views/pages/destination/Create'))
const EditDestination = React.lazy(() => import('./views/pages/destination/Edit'))
// Article
const Article = React.lazy(() => import('./views/pages/article/Article'))
const DetailArticle = React.lazy(() => import('./views/pages/article/Detail'))
const CreateArticle = React.lazy(() => import('./views/pages/article/Create'))
const EditArticle = React.lazy(() => import('./views/pages/article/Edit'))
// Gallery
const Gallery = React.lazy(() => import('./views/pages/gallery/Gallery'))
const DetailGallery = React.lazy(() => import('./views/pages/gallery/Detail'))
const CreateGallery = React.lazy(() => import('./views/pages/gallery/Create'))
const EditGallery = React.lazy(() => import('./views/pages/gallery/Edit'))
// Partner
const Partner = React.lazy(() => import('./views/pages/partner/Partner'))
const DetailPartner = React.lazy(() => import('./views/pages/partner/Detail'))
const CreatePartner = React.lazy(() => import('./views/pages/partner/Create'))
const EditPartner = React.lazy(() => import('./views/pages/partner/Edit'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  // Menu
  { path: '/menu', name: 'Menu', element: Menu },
  { path: '/menu/edit/:id', name: 'Edit Menu', element: EditMenu },
  // User
  { path: '/us', name: 'Pengguna', element: User },
  { path: '/us/:id', name: 'Detail Pengguna', element: DetailUser },
  { path: '/us/create', name: 'Tambah Pengguna', element: CreateUser },
  { path: '/us/edit/:id', name: 'Edit Pengguna', element: EditUser },
  // Access
  { path: '/ac', name: 'Akses Pengguna', element: Access },
  { path: '/ac/create', name: 'Tambah Akses', element: CreateAccess },
  { path: '/ac/edit/:id', name: 'Edit Akses', element: EditAccess },
  // Destination
  { path: '/dt', name: 'Destinasi Wisata', element: Destination },
  { path: '/dt/:id', name: 'Detail Destinasi Wisata', element: DetailDestination },
  { path: '/dt/create', name: 'Tambah Destinasi Wisata', element: CreateDestination },
  { path: '/dt/edit/:id', name: 'Edit Destinasi Wisata', element: EditDestination },
  // Article
  { path: '/ar', name: 'Artikel', element: Article },
  { path: '/ar/:id', name: 'Detail Artikel', element: DetailArticle },
  { path: '/ar/create', name: 'Tambah Artikel', element: CreateArticle },
  { path: '/ar/edit/:id', name: 'Edit Artikel', element: EditArticle },
  // Gallery
  { path: '/gl', name: 'Galeri', element: Gallery },
  { path: '/gl/:id', name: 'Detail Galeri', element: DetailGallery },
  { path: '/gl/create', name: 'Tambah Galeri', element: CreateGallery },
  { path: '/gl/edit/:galleryId/:id', name: 'Edit Galeri', element: EditGallery },
  // Mitra
  { path: '/pt', name: 'Mitra', element: Partner },
  { path: '/pt/:id', name: 'Detail Mitra', element: DetailPartner },
  { path: '/pt/create', name: 'Tambah Mitra', element: CreatePartner },
  { path: '/pt/edit/:id', name: 'Edit Mitra', element: EditPartner },
]

export default routes
