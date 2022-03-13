import { useMemo, Suspense } from 'react'

export function Projects({ projects }) {
  return (
    <div className=''>
      <ul class="timeline-list">
        {projects.map((project, index) => {
          return (
            <li>
              <div class="content">
                <Project project={project} index={index} key={index} />
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
          <p className='pb-3 text-l'> {content} </p>
          <p className='pb-3 text-xs'> Tools: <span className="tools">{meta}</span></p>
          <a className='text-xs' href={`${link}`} target="_blank" aria-label={link}> Live </a>
          <a className='text-xs' href={`${github}`} target="_blank" aria-label={github}> Code </a>
        </div>
    )
}
