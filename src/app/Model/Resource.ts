import {Project} from './Project';

export class Resource {
  resource_id?: number;
  resource_name: string;
  resource_code: string;
  projectId?: string;
  project?: Project;
  projects?: Project[];
  // features?: Feature[];
  // tslint:disable-next-line:variable-name
  editable?: boolean;
  submit?: string;
  update?: boolean;
  constructor() {
  }
}
