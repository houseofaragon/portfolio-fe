import Meta from './meta'
import Header from './header'
import { useEffect, useState } from 'react'

export default function Layout({ preview, children }) {
  const [isDarkTheme, setDarkTheme] = useState(false)


  useEffect(() => {
    const theme = localStorage.getItem('darkTheme')
    if (theme === 'dark') {
      setDarkTheme(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkTheme(false)
      document.documentElement.classList.remove('dark')
      localStorage.removeItem('darkTheme')
    }
  }, [])

  useEffect(() => {
    if (isDarkTheme ) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkTheme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.removeItem('darkTheme')
    }
  }, [isDarkTheme])

  return (
    <>
      <Meta />
      <div className="w-full-screen h-full-screen bg-[#f7f7f7] dark:bg-[#141414] text-[#141414] dark:text-white">
        <main>
          <Header isDarkTheme={isDarkTheme} handleTheme={(value) => { 
            setDarkTheme(value)
          }} />
            <div className="absolute  md:block right-[5vw] md:right-[5vw] lg:right-[5vw]" 
            style={{
                  transform: "rotate(90deg) translate3d(50%, 0, 0)",
                  transformOrigin: "100% 50%",
                  bottom: "50%",
                }}>
              <p className="text-[13px] whitespace-nowrap"
                >
                ☺ &nbsp;&nbsp;&nbsp;&nbsp; I'm happy you're here &nbsp;&nbsp;&nbsp;&nbsp; ☺
              </p>
            </div>
          <div className='px-5 md:px-10 lg:px-20 lg:-mt-10'>
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
