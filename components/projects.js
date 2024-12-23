export function Projects({ projects }) {
  console.log('projects', projects)
  return (
    <div className='pb-10'>
      <ul className="timeline-list">
        {projects.data.map((project, index) => {
          return (
            <li key={index}>
              <div className="content">
                <Project
                  project={project}
                  index={index}
                  key={index} 
                />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Project({project, index}) {
    const {title, content, meta, github, link} = project.attributes

    return (
      <div className="project pt-5 -mb-5 md:mb-10 md:pr-10 leading-relaxed">
        <h3 className='pb-3'>{title}</h3>
        <p className='pb-3 text-l text-slate-600 dark:text-slate-300'> {content} </p>
        <p className='pb-3 text-xs'> Tools: <span className="tools">{meta}</span></p>
        <a className='text-xs
        bg-purple-200
        hover:bg-purple-100
        dark:bg-purple-400 
        dark:hover:bg-purple-300 
        dark:text-black' href={`${link}`} target="_blank" aria-label={link}> Live </a>
        {github &&
          <a className='text-xs
          bg-purple-200
          hover:bg-purple-100
          dark:bg-purple-400 
          dark:hover:bg-purple-300 
          dark:text-black' href={`${github}`} target="_blank" aria-label={github}> Code </a>
        }
      </div>
    )
}
