import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header({ isDarkTheme, handleTheme }) {
  const router = useRouter()

  return (
    <>
      <div className='p-5 md:p-10 lg:p-20 w-full t-0 l-0 flex flex-row items-center justify-between z-[100]'
     >
          <div className="w-1/4 z-[100] logo">
              <Link href={`/`}>
              <svg className="cursor-pointer
              h-[30px] w-[30px] -ml-[5px] text-purple-400
              fill-current
              hover:text-purple-700 dark:text-purple-500  dark:fill-current
              dark:hover:text-purple-400" 
              viewBox="0 0 600 600">
              <path d="M103.1,77h118.3v173.2L368.4,77h140.3L347.1,260.6L514.2,504H372.1L264.7,345.4l-43.3,48.2V504H103.1V77z"
		        />
</svg>
              </Link>
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
            <Link href={`/about`}>
              <a className='mr-5 md:mr-10' style={
                router.pathname === '/about' 
                ? { textUnderlineOffset: "5px",
                textDecoration: "underline" 
              } 
            : {} }>ABOUT</a>
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
