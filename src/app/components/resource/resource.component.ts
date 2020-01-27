import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
//import {SidebarService} from '../service/sidebar.service';
import {ResourceService} from '../../services/resource.service';
import {Resource} from '../../Model/Resource';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Feature} from '../../Model/Feature';
import {FeatureComponent} from '../feature/feature.component';
import {first} from 'rxjs/operators';
import {Project} from '../../Model/Project';
import {ProjectService} from '../../services/project.service';
@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit, AfterViewInit {
  private resources: Resource[] = [];
  private features: Feature[];
  dataSource = new MatTableDataSource();
  private displayedColumns: string[] = ['resourceName', 'resourceCode'];
  // @ts-ignore
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  private project: Project;
  private newResource: Resource;
  private newFeatureName: string[];
  private update = false;
  private newFeature = new Feature('');

  constructor(
              private resourceService: ResourceService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private projectService: ProjectService,
              ) {
    this.getProject();
    this.getResource();

  }

  ngOnInit() {
    //this.sidebarService.status = true;
    // this.getResource();
    // console.log(this.resources);
    this.dataSource = new MatTableDataSource(this.resources);

    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    console.log('inside after view init');
    // this.projectService.setProjectName('this.project.name');
    console.log('set current project name');
    this.dataSource.paginator = this.paginator;
    console.log('before sort');
    this.dataSource.sort = this.sort;
    // console.log(this.sort);
  }

  getProject(): void {
    console.log('loading project resource');
    this.projectService.getProjectbyId(1).subscribe(project => {
      console.log(project);
      this.project = project;
      console.log(this.project);
      this.projectService.setProjectName(this.project.project_name);
      // this.resources = this.project.resouces;
      // this.dataSource.data = this.resources;
      // this.updateDataSource();
    });
  }

  getResource() {
    this.resourceService.getResources().subscribe(resources => {
      this.resources = resources;
      console.log('populate datasource');
      this.dataSource.data = resources;
      console.log(this.dataSource);
      console.log('get');
      // this.displayedColumns = Object.keys(this.resources[0]);
    },
      err => console.log(err),
      () => {
      // console.log(this.resources);
      this.updateDataSource();
      console.log('get complete');
    }
      );
  }

  addNewRow() {
    this.newResource = new Resource();
    this.resources.push(this.newResource);
    //console.log(this.project.resouces);
    this.updateDataSource();
    this.newResource.editable = true;
    // this.updateDataSource();
  }

  applyFilter(event): void {
    const keyword = event.target.value;
    this.dataSource.filter = keyword.trim().toLowerCase();
  }

  updateDataSource(): void {
    this.dataSource = new MatTableDataSource(this.resources);
  }

  updateResource(resource: Resource) {

    // check if clicked resource has id and not already in update mode,
    // if not save the changes
    if (resource.resource_id !== null || !this.update) {
      // this.newResource = JSON.parse(JSON.stringify(resource));
      // console.log(this.newResource);
      this.newResource = resource;
      // console.log(this.newResource);
      resource.editable = true;
      this.update = true;
    } else {
      console.log('Your have unsaved changes');
    }
  }

  saveResource(rs: Resource, i: number) {
    if (!rs.resource_code || !rs.resource_name) {
      this.openSnackBar('Field cannot be empty', 'Close');
      return 0;
    }
    rs.editable = false;
    if (!rs.resource_id) {
    this.resourceService.addResource(rs).subscribe(
      res => {
        // console.log(res);
        rs.resource_id = res.resource_id;
         },
      err => console.log(err),
      () => {
        console.log('complete add');
        console.log(this.project.resouces);
      }
    ); } else {
      // update the resource
      this.update = false;
      this.resources.splice(i, 1, this.newResource);
      this.updateDataSource();
      rs = this.newResource;
      this.resourceService.updateResource(rs.resource_id, rs).subscribe(
        res => console.log(res),
        err => console.log(err),
        () => {
          console.log('complete update');
        }
      );
    }

  }

  discardResource(re: Resource , i) {
    this.resources.splice(i, 1);
    this.updateDataSource();
    if (!re.projects){
    this.resourceService.deleteResource(re.resource_id).subscribe(
      res => console.log(res),
      error => console.log(error),
      () => console.log('delete resource with id = ' + re.resource_id));
    } else {
      this.openSnackBar('Resource' + re.resource_id + ' cannot be deleted', 'Close');
    }
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }

  importCSV() {

  }
  getFeature() {

  }

  addNewFeature() {
    const dialogRef = this.dialog.open(FeatureComponent, {
      width: '300px',
      data: this.newFeature,
      autoFocus: true,
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if ( !result.value) {
        console.log('The dialog was closed');
        return;
      } else {
          this.newFeature = result.value;
        }
    },
      error => {
        console.log(error);
        },
      () => {
        if (this.newFeature.name) {
          this.displayedColumns.push(this.newFeature.name);
          console.log('New Feature Added' + this.newFeature.name);
        }
      }
    );


  }


}
