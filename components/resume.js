export function Resume() {
  return (
    <div className="resume flex flex-row grid gap-10 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
      <div className="basis-1/3 mr-5 md:mr-20">
      <h2 className="hidden text-3xl md:text-l md:block"><b>—</b> About </h2>
        <br />
        <p>Please get in touch:</p>
        <h5> karen.c.aragon@gmail.com</h5>
        <br/>
        <div className="description">
          <p>I have worked as an Engineering Manager, Tech Lead, and as a Fullstack IC on a diverse range of projects. I have:</p>
          <br />
          <p className="light"><b>—</b> Built and tested applications in <strong>React/TS</strong> and <strong>Jest</strong></p>
          <p className="light"><b>—</b> Built microservices in <strong>Node</strong> and <strong>Serverless</strong></p>
          <p className="light"><b>—</b> Contributed to and maintained a design system in <strong>React/TS</strong> using <strong>StoryBook</strong></p>
          <p className="light"><b>—</b> Contributed to, refactored, and maintained monoliths in <strong>PHP</strong> </p>
          <p className="light"><b>—</b> Spun up services and databases in <strong>Terraform</strong> </p>
          <p><b>—</b> Wrote integration and e2e tests with <strong>Codeception/BDD</strong> </p>
          <br />
          <p className="light">I am skilled with all listed above. But, I will be the first to admit I am not an expert in any - because there's always something new to learn.</p>
        </div>
      </div>
      <div className="basis-2/3 l-contained pb-10">
        <ul className="timeline-list">
          <li>
            <div className="content md:pr-10 pt-5">
              <h3>Powerschool</h3>
              <p className="text-slate-600 dark:text-slate-300">Associate Engineering Manager</p>
              <p className="text-slate-600 dark:text-slate-300">2021-2022</p>
            </div>
          </li>
          <li>
          <div className="content pr-10 pt-5">
            <h3>Schoology</h3>
            <p className="text-slate-600 dark:text-slate-300">Lead Engineer</p>
            <p className="text-slate-600 dark:text-slate-300">2019-2021</p>
            </div>
          </li>
          <li>
          <div className="content pr-10 pt-5">
            <h3>Schoology</h3>
            <p className="text-slate-600 dark:text-slate-300">Senior Software Engineer</p>
            <p className="text-slate-600 dark:text-slate-300">2017-2019</p>
            </div>
          </li>
          <li>
          <div className="content pr-10 pt-5">
            <h3>Enigma</h3>
            <p className="text-slate-600 dark:text-slate-300">Frontend Software Engineer</p>
            <p className="text-slate-600 dark:text-slate-300">2016</p>
            </div>
          </li>
          <li>
            <div className="content pr-10 pt-5">
            <h3>dMetrics</h3>
            <p className="text-slate-600 dark:text-slate-300">Frontend Software Engineer</p>
            <p className="text-slate-600 dark:text-slate-300">2015</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}