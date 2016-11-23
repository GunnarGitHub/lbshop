import { Injectable } from '@angular/core';

import { Shop, Department } from '../model'

@Injectable()
export class DepartmentsService {
  departmentsLoaded: boolean;

  constructor() {
    console.log("DepartmentsService constructor");
    this.departmentsLoaded = false;
  }


  getDepartments(owner: string) {
    console.log("DepartmentsService getDepartments");

  }

}
