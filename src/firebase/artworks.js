import {
  collection, addDoc, getDocs, getDoc,
  doc, updateDoc, deleteDoc, query, orderBy
} from 'firebase/firestore'
import { db } from './config'

const artworksCol = collection(db, 'artworks')

// ✅ Cloudinary upload — no Firebase Storage needed
export const uploadArtworkImage = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  )
  const data = await res.json()
  return data.secure_url
}

export const addArtwork = async (data) => {
  return addDoc(artworksCol, { ...data, createdAt: new Date(), available: true })
}

export const getArtworks = async () => {
  const q = query(artworksCol, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export const getArtwork = async (id) => {
  const snap = await getDoc(doc(db, 'artworks', id))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

export const updateArtwork = async (id, data) => {
  return updateDoc(doc(db, 'artworks', id), data)
}

export const deleteArtwork = async (id) => {
  return deleteDoc(doc(db, 'artworks', id))
}