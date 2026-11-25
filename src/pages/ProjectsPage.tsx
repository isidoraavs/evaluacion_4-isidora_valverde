import {projects as projectsData} from "../data/portfolioData";import {ProjectCard} from "../components/ProjectCard";import {GitHubProjects} from "../components/GitHubProjects";export function ProjectsPage(){return (<section className="projects section-shell" id="proyectos" aria-labelledby="projects-title">
            <div className="section-kicker"><span>02</span><span>TRABAJO EN PROGRESO</span></div>
            <div className="projects__heading">
                <div>
                    <h2 id="projects-title">Aprender haciendo<span className="hero__period">.</span></h2>
                    <p>Proyectos y áreas que forman parte de mi recorrido académico.</p>
                </div>
                <span className="projects__project-count">01 proyecto documentado</span>
            </div>

            <div className="projects__project-grid">{projectsData.map(project=><ProjectCard key={project.id} project={project}/>)}
                

                

                
            </div>
        <GitHubProjects/></section>);}