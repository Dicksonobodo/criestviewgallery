import { useState, useEffect } from 'react'
import { getArtworks, getArtwork } from '../firebase/artworks'

export const useArtworks = () => {
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getArtworks()
        setArtworks(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const refresh = async () => {
    setLoading(true)
    try {
      const data = await getArtworks()
      setArtworks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { artworks, loading, error, refresh }
}

export const useArtwork = (id) => {
  const [artwork, setArtwork] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    const fetch = async () => {
      try {
        const data = await getArtwork(id)
        setArtwork(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  return { artwork, loading, error }
}