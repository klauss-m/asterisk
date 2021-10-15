import { Fab } from 'react-tiny-fab'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp'

import Hero from './Hero'
import Footer from './Footer'
import Cards from './Cards'
import { useMemo, useState } from 'react'

export function LandingPage() {
  const [showFab, setShowFab] = useState(false)

  document.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      setShowFab(true)
    } else {
      setShowFab(false)
    }
  })

  const MemoCards = useMemo(() => <Cards />, [])

  return (
    <>
      <Hero />
      {MemoCards}
      <Footer />
      {showFab && (
        <Fab
          icon={<ArrowCircleUpIcon />}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      )}
    </>
  )
}
