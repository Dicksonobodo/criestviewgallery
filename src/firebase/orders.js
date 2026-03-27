import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from './config'

const ordersCol = collection(db, 'orders')

export const saveOrder = async (orderData) => {
  return addDoc(ordersCol, { ...orderData, createdAt: new Date(), status: 'paid' })
}

export const getOrders = async () => {
  const q = query(ordersCol, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}