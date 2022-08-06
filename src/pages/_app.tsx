import { useRouter } from 'next/router'
import { setState } from '@/helpers/store'
import { Suspense, useEffect } from 'react'
import Header from '@/config'
import Dom from '@/components/layout/dom'
import '@/styles/index.css'
import dynamic from 'next/dynamic'
import { Loader } from '@/components/canvas/Loader'

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: true,
})

function App({ Component, pageProps = { title: 'Sung Jae Yoo' } }) {
  const router = useRouter()

  useEffect(() => {
    setState({ router })
  }, [router])

  return (
    <>
      <Header title={pageProps.title} />
      <Dom>
        <Component {...pageProps} />
      </Dom>
      {Component?.r3f && <LCanvas>{Component.r3f(pageProps)}</LCanvas>}
    </>
  )
}

export default App
