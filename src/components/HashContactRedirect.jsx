import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function HashContactRedirect() {
  const { hash, pathname, search } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Redirige automatiquement quand on arrive avec /#contact ou n'importe quelle page#contact
    if (hash && hash.toLowerCase() === '#contact' && pathname !== '/contact') {
      navigate(`/contact${search || ''}`, { replace: true })
    }
  }, [hash, pathname, search, navigate])

  return null
}
