import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ResourceService} from '../../services/resource.service';
import {ProjectService} from '../../services/project.service';
//import {SidebarService} from '../../services/sidebar.service';
import {FormControl} from '@angular/forms';
//import {ResourceComponent} from '../resource/resource.component';
import {MatTableDataSource} from '@angular/material';
import {Project} from '../../Model/Project';
import {SelectionModel} from '@angular/cdk/collections';
import {Resource} from '../../Model/Resource';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  projectNames: Project[] = [];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
  checkedData: Resource[] = [];
  checkedDataSource = new MatTableDataSource(this.checkedData);
  checkedSelection = new SelectionModel(true, []) ;
  displayedColumns = ["select", "name", "code"];
  public projectfilter: FormControl = new FormControl();
  // @ViewChild(ResourceComponent, {static: false}) rc: ResourceComponent;
  constructor(
                  private projectService: ProjectService,
                  private resourceService: ResourceService) {

  }

  ngOnInit() {
    // this.getProjects();
    this.getResource();
    //this.sidebarService.status = true;
    //console.log('ngoninit');
  }

  ngAfterViewInit() {

  }

  getResource() {
    this.resourceService.getResources().subscribe(resources => {

        this.dataSource.data = resources;
        // this.displayedColumns = Object.keys(this.resources[0]);
      },
      err => console.log(err),
      () => {
        // console.log(this.resources);
        console.log('get complete');
      }
    );

  }

  filterProjectName(value: string) {

  }


  moveDataToOtherTable() {
    this.dataSource.data.forEach(row => {
      // @ts-ignore
      if (this.selection.isSelected(row) && !this.checkedData.includes(row)) {
        // @ts-ignore
        console.log(this.checkedData.includes(row));
        // @ts-ignore
        this.checkedData.push(row);
      }
    });
    this.checkedDataSource.data = this.checkedData;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */

  masterToggle(selectbt?: string) {
    if (!selectbt) {
      this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }
    if (selectbt == 'clear') {
      this.selection.clear();
    }
    if (selectbt =='all') {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  trashRightList() {
    if (this.isAllCheckedSelected()) {
      this.checkedData = [];
      this.checkedDataSource.data = this.checkedData;
      this.checkedSelection.clear();
    } else {
      const indexremove: number[] = [];
      this.checkedDataSource.data.forEach((row, index) => {
        if (this.checkedSelection.isSelected(row)) {
          this.checkedSelection.deselect(row);
          indexremove.push(index);
          console.log(index);
        }
      });
      for (let i = indexremove.length - 1; i >= 0 ; i--) {
        this.checkedData.splice(indexremove[i], 1);
      }
      this.checkedDataSource.data = this.checkedData;
      console.log(this.checkedSelection);
      console.log(this.checkedData);
    }
  }

  masterCheckedToggle() {
    this.isAllCheckedSelected() ?
      this.checkedSelection.clear() :
      this.checkedDataSource.data.forEach(row => this.checkedSelection.select(row));
  }

  isAllCheckedSelected() {
    const numSelected = this.checkedSelection.selected.length;
    const numRows = this.checkedDataSource.data.length;
    return numSelected == numRows;
  }

  submitHandler() {
    const newProject = new Project('Project4');
    newProject.resouces = this.checkedData;
    this.projectService.addProject(newProject).subscribe(res => console.log(res));
  }
}
