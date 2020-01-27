import {Resource} from './Resource';
import {User} from './user';

export class Project {
  constructor(name: string) {
    this.project_name = name;
  }
  project_id?: number;
  project_name: string;
  submit?: string;
  resouces: Resource[];
  user?: User;
}
