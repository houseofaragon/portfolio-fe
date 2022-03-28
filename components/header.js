import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header({ isDarkTheme, handleTheme }) {
  const router = useRouter()

  return (
    <>
      <div className='w-full t-0 l-0 flex flex-row items-center justify-between z-[100]'
     >
          <div className="w-1/4 z-[100]">
            <p>
              <Link href={`/`}>
                <a className="hover:underline"> K. Aragon</a>
              </Link>
            </p>
          </div>
          <div className="text-right w-3/4 z-[100]" data-testid="header-menu" >
            <Link href={`/work`}>
              <a className='mr-5 md:mr-10'
                style={router.pathname === '/work' ? { textUnderlineOffset: "5px",
                textDecoration: "underline" 
              } 
            : {}}>WORK</a>
            </Link>
            <Link href={`/posts`}>
              <a className='mr-5 md:mr-10' style={router.pathname === '/posts' 
                ? { textUnderlineOffset: "5px",
                    textDecoration: "underline" 
                  } 
                : {}}>WRITING</a>
            </Link>
            <Link href={`/cv`}>
              <a className='mr-5 md:mr-10' style={
                router.pathname === '/cv' 
                ? { textUnderlineOffset: "5px",
                textDecoration: "underline" 
              } 
            : {} }>CV</a>
            </Link>
            <button onClick={() => handleTheme(!isDarkTheme)}>
              <span className=''>{ isDarkTheme ? `☼` : `☽` }</span>
            </button>
          </div>
          {/* <div className='w-1/4 text-right rounded-lg hover:text-blue-400 z-[100]'>
            <button onClick={() => handleTheme(!isDarkTheme)}>
              <span className=''>{ isDarkTheme ? `☼` : `☽` }</span>
            </button>
          </div> */}
      </div>
    </>
  )
}
