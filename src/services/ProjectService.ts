import type { ProjectCreateCommand, ProjectModel } from "@/models/ProjectModel";
import { deleteTodos } from "./TodoService";

export function getProjects(createIfNone = true): ProjectModel[] {
  let projects = JSON.parse(localStorage.getItem("projects") || "[]");
  if (!projects.length && createIfNone) {
    projects = [createProject({ title: "Default project" })];
  }
  return projects;
}

export function createProject(project: ProjectCreateCommand): ProjectModel {
  const projects = getProjects(false);
  const id = Math.max(0, ...projects.map((x) => x.id)) + 1;
  const projectToAdd = { ...project, id } as ProjectModel;
  projects.push(projectToAdd);
  localStorage.setItem("projects", JSON.stringify(projects));
  return projectToAdd;
}

export function editProject(project: ProjectModel): ProjectModel {
  const projects = getProjects();
  let projectToEdit = projects.find((x) => x.id === project.id);
  if (projectToEdit) {
    projectToEdit = Object.assign(projectToEdit, project);
    localStorage.setItem("projects", JSON.stringify(projects));
    return projectToEdit;
  }
  throw "Project not found";
}

export function deleteProject(project: ProjectModel): void {
  const projects = getProjects();
  const projectIdxToDelete = projects.findIndex((x) => x.id === project.id);
  if (projectIdxToDelete >= 0) {
    deleteTodos(project.id);
    projects.splice(projectIdxToDelete, 1);
    localStorage.setItem("projects", JSON.stringify(projects));
    return;
  }
  throw "Project not found";
}
