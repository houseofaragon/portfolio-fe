export function Projects({ projects }) {
  return (
    <div className=''>
      <ul className="timeline-list">
        {projects.map((project, index) => {
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
      <div className="mb-10 project pr-10 pt-5 leading-relaxed">
        <h3 className='pb-3'>{title}</h3>
        <p className='pb-3 text-l text-slate-600 dark:text-slate-300'> {content} </p>
        <p className='pb-3 text-xs'> Tools: <span className="tools">{meta}</span></p>
        <a className='text-xs hover:bg-slate-500 dark:bg-slate-400 dark:hover:bg-slate-100 dark:text-black
        dark:hover:text-black' href={`${link}`} target="_blank" aria-label={link}> Live </a>
        {github &&
          <a className='text-xs hover:bg-slate-500 dark:bg-slate-400 dark:hover:bg-slate-100 dark:text-black
          dark:hover:text-black' href={`${github}`} target="_blank" aria-label={github}> Code </a>
        }
      </div>
    )
}
