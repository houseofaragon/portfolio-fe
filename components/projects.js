import { useMemo, Suspense } from 'react'

export function Projects({ projects }) {
  return (
    <div className=''>
      {projects.map((project, index) => {
          return <Project project={project} index={index} key={index} />
      })}
    </div>
  )
}

function Project({project, index}) {
    const {title, content, meta, github, link} = project.attributes

    return (
        <div className="mb-10 pr-40">
          <p className="item__album">{title}</p>
          <p> {content} </p>
          <p> {meta} </p>
          <p> {github} </p>
          <p> {link} </p>
        </div>
    )
}
