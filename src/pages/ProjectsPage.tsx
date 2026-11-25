import { GitHubProjects } from "../components/GitHubProjects";
import { ProjectCard } from "../components/ProjectCard";
import { projects as projectsData } from "../data/portfolioData";
import type { ProjectsPageProps, UiElement } from "../types/ui";

export function ProjectsPage({ showApi = true, headingLevel = "h1" }: ProjectsPageProps): UiElement {
    const Heading = headingLevel;

    return (
        <section className="projects section-shell" id="proyectos" aria-labelledby="projects-title">
            <div className="section-kicker"><span>02</span><span>TRABAJO EN PROGRESO</span></div>
            <div className="projects__heading">
                <div>
                    <Heading className="projects__title" id="projects-title">Aprender haciendo<span className="hero__period">.</span></Heading>
                    <p>Proyectos y áreas que forman parte de mi recorrido académico.</p>
                </div>
                <span className="projects__project-count">01 proyecto documentado</span>
            </div>

            <div className="projects__project-grid">
                {projectsData.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
            {showApi && <GitHubProjects />}
        </section>
    );
}
