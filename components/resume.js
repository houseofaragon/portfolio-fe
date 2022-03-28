export function Resume() {
  return (
    <div className="resume flex flex-row grid gap-10 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
      <div className="basis-1/3 mr-20">
        <h2 className="text-3xl md:text-l"><b>—</b> Experience </h2>
        <br />
        <div className="description">
          <p>I have worked as an Engineering Manager, Tech Lead, and as Fullstack IC on a diverse range of projects. I have:</p>
          <br />
          <p className="light"><b>—</b> Built and tested applications in <strong>React/TS</strong> and <strong>Jest</strong></p>
          <p className="light"><b>—</b> Built microservices in <strong>Node</strong> and <strong>Serverless</strong></p>
          <p className="light"><b>—</b> Contributed to and maintained a design system in <strong>React/TS</strong> using <strong>StoryBook</strong></p>
          <p className="light"><b>—</b> Contributed to, refactored, and maintained monoliths in <strong>PHP</strong> </p>
          <p className="light"><b>—</b> Spun up services and databases in <strong>Terraform</strong> </p>
          <p className="light"><b>—</b> Wrote integration and e2e tests with <strong>Codeception/BDD</strong> </p>
          <br />
          <p>I am very skilled and a quick learner with all listed above. But, I will be the first to admit I am not an expert in any - because there's always something new to learn.</p>
        </div>
      </div>
      <div className="basis-2/3 l-contained">
        <ul className="timeline-list">
          <li>
            <div className="content pr-10 pt-5">
              <h3>Powerschool</h3>
              <p>Associate Engineering Manager</p>
              <br/>
              <ul>
                <li>
                  <p>
                    Improved monitoring of owned components with Datadog slack integrations to help maintain sites overall 99.9%
                  </p>
                  <p>
                    Ensure products were used by over 1M concurrent users at peak load.
                  </p>
                </li>
                <li>
                  <p>Collaborated with tech leads and software engineers while partnering with product owners and design to execute the product roadmap.
                  </p>
                </li>
                <li>
                  <p>
                    Provided technical guidance and mentorship to the teammates by building sustainable paths to achieve their goals.
                  </p>
                </li>
                <li><p>Providing organizational support for their technical requirements, from hiring and people management</p></li>
                <li><p>Develop a deep understanding of the product spaces, so that you can work with Tech Leads and Product Management partners to develop near and long-term product roadmaps. Educate team members on how their work aligns with organizational goals and the importance to the customer</p></li>
                <li><p>Passionate about building features to help students learn, teachers teach, and admins run their schools smoothly</p></li>
              </ul>
            </div>
          </li>
          <li>
          <div className="content pr-10 pt-5">
            <h3>Schoology</h3>
            <p>Lead Engineer</p>
            <br/>
            <ul>
              <li>
                <p>
                  Provided technical feedback and mentorship during explosive growth 
                </p>
              </li>
              <li>
                <p>
                  Enhanced the application's features to effectively fix bugs and overall performance, reliability, and efficiency.
                </p>
              </li>
              <li>
                <p>
                  Documented applications to effectively distribute knowledge and help train new and cross-team engineers.
                </p>
              </li>
              <li>
                <p>
                  Led a team responsible for the creation, distribution, and submission of course materials and integration with Google and Microsoft assignments.
                </p>
              </li>
              <li>
                <p>
                Designed and helped build software systems spanning data processing, infrastructure, serving, and frontend development.
                </p>
              </li>
              <li>
                <p>Mentored a team of 6 engineers</p>
              </li>
              <li>
                <p>Built microservices in Node and Typescript</p>
              </li>
              <li>
                <p>
                Collaborated closely with cross-functional partners in Management, Design, and Product to understand educators’ needs, and to translate them into the right technical decisions and systems.
                </p>
              </li>
            </ul>
            </div>
          </li>
          <li>
          <div className="content pr-10 pt-5">
            <h3>Schoology</h3>
            <p>Senior Software Engineer</p>
            <br/>
            <ul>
              <li>
                <p>Built, tested, and deployed new product features for Schoology's Assessment Management Platform (AMP) that supported the creation and distribution of assessments to sections across districts and organizations.</p>
              </li>
              <li>
                <p>
                  Built components for company's design system, Backpack, that sped of developer's time and unified product user experience.
                </p>
              </li>
              <li>
                <p>
                  Write and test product or system development code
                </p>
              </li>  
              <li>
                <p>
                Contribute to existing documentation or educational content and adapt content based on product/program updates and user feedback
                </p>
              </li>
              <li>
                <p>
                Triage product or system issues and debug/track/resolve by analyzing the sources of issues and the impact on hardware, network, or service operations and quality
                </p>
              </li>
            </ul>
            </div>
          </li>
          <li>
          <div className="content pr-10 pt-5">
            <h3>Enigma</h3>
            <p>Software Engineer</p>
            <br/>
            <ul>
              <li>
                <p>
                Lead frontend engineer responsible for designing and building visualizations of sanctions data 
                </p>
              </li>
              <li>
                <p>
                Collaborate with Product and Design to determine project goals and timelines.
                </p>
              </li>
              <li>
                <p>
                Worked with backend team to ensure data.
                </p>
              </li>
            </ul>
           
            </div>
          </li>
          <li>
          <div className="content pr-10 pt-5">
            <h3>dMetrics</h3>
            <p>Software Engineer</p>
            <br/>
            <p>
              Built and maintained application that utilized AI and NLP to gleam insights into patients' desicion making.
            </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}