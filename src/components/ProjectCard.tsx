import type { ProjectArtworkList, ProjectCardProps, UiElement } from "../types/ui";

const arts: ProjectArtworkList = [
                    <div className="project-card__project-art project-card__api-art" aria-hidden="true">
                        <span className="project-card__art-caption">ESTRUCTURA / 001</span>
                        <div className="project-card__api-window">
                            <div className="project-card__window-dots"><i></i><i></i><i></i><span>students.api</span></div>
                            <p><b>POST</b> <span>/estudiantes</span></p>
                            <p><b>PATCH</b> <span>/estudiantes/&#123;id&#125;</span></p>
                            <div className="project-card__api-line"></div>
                            <small>FastAPI · Python</small>
                        </div>
                        <span className="project-card__art-stamp">API<br />REST</span>
                    </div>
                    ,<div className="project-card__note-graphic project-card__frontend-graphic" aria-hidden="true">
                        <span className="project-card__graphic-bracket">&lt;/&gt;</span>
                        <span className="project-card__graphic-line project-card__line-a"></span><span className="project-card__graphic-line project-card__line-b"></span>
                        <span className="project-card__graphic-block"></span>
                        <span className="project-card__graphic-caption">IDEA → INTERFAZ</span>
                    </div>
                    ,<div className="project-card__note-graphic project-card__security-graphic" aria-hidden="true">
                        <span className="project-card__security-ring project-card__ring-a"></span><span className="project-card__security-ring project-card__ring-b"></span>
                        <span className="project-card__security-shield">✳</span>
                        <span className="project-card__graphic-caption">OBSERVAR · PROTEGER</span>
                    </div>
];

export function ProjectCard({ project }: ProjectCardProps): UiElement {
    const variant = project.id === 1 ? "featured" : "note";

    return (
        <article className={`project-card project-card--${variant}`}>
            {arts[project.id - 1]}
            <div className="project-card__project-body">
                <div className="project-card__project-meta">
                    <span>{project.category}</span>
                    <span>{project.period}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.tags.length > 0 ? (
                    <ul className="project-card__tag-list" aria-label="Tecnologías utilizadas">
                        {project.tags.map((tag: string) => <li key={tag}>{tag}</li>)}
                    </ul>
                ) : (
                    <span className="project-card__note-label">
                        En aprendizaje <span aria-hidden="true">↗</span>
                    </span>
                )}
            </div>
        </article>
    );
}
