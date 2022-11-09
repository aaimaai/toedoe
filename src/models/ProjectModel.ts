export interface ProjectModel {
  id: number;
  title: string;
  index: number;
}

export interface ProjectCreateCommand {
  title: string;
  index?: number;
}
