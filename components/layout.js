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
      <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#141414] text-[#141414] dark:text-white p-7 md:p-10 lg:p-14">
        <main>
          <Header isDarkTheme={isDarkTheme} handleTheme={(value) => { 
            setDarkTheme(value)
          }} />
          <div className="mt-5 md:mt-10 lg:mt-10 w-full p-0">
            <div className="hidden md:block">
              <p className="text-[13px] text-right whitespace-nowrap origin-right"
                style={{
                  transform: "rotate3d(0, 0, 1, 90deg) translate3d(400px,0,0)"
                }}>
                ☺ &nbsp;&nbsp;&nbsp;&nbsp; I'm happy you're here &nbsp;&nbsp;&nbsp;&nbsp; ☺
              </p>
            </div>
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
