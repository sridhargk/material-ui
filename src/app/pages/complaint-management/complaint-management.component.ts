import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

export interface Complaint {
  houseNumber: string;
  complaintedBy: string;
  complaintType: string;
  complaintDescription: string;
  complaintStatus: string;
}

export interface House {
  houseNumber: string;
  ownerName?: string;
}

export interface ComplaintType {
  id: number;
  name: string;
}

const COMPLAINT_DATA: Complaint[] = [
  {
    houseNumber: '12-B',
    complaintedBy: 'Owner',
    complaintType: 'Maintanence',
    complaintDescription: 'Not Cleaned',
    complaintStatus: 'Not Yet Started',
  },
  {
    houseNumber: '12-B',
    complaintedBy: 'Owner',
    complaintType: 'Maintanence',
    complaintDescription: 'Not Cleaned',
    complaintStatus: 'Not Yet Started',
  },
  {
    houseNumber: '12-B',
    complaintedBy: 'Owner',
    complaintType: 'Maintanence',
    complaintDescription: 'Not Cleaned',
    complaintStatus: 'Not Yet Started',
  },
];

const AVAILABLE_HOUSES: House[] = [
  { houseNumber: '1-A' },
  { houseNumber: '2-A' },
  { houseNumber: '2-B' },
  { houseNumber: '3-A' },
  { houseNumber: '4-A' },
  { houseNumber: '5-A' },
  { houseNumber: '6-A' },
  { houseNumber: '7-A' },
  { houseNumber: '10-A' },
  { houseNumber: '12-A' },
  { houseNumber: '12-B' },
  { houseNumber: '13-B' },
];

const AVAILABLE_COMPLAINT_TYPES: ComplaintType[] = [
  { id: 1, name: 'Maintenance' },
  { id: 2, name: 'Cleaning' },
  { id: 3, name: 'General' },
];

@Component({
  selector: 'app-complaint-management',
  templateUrl: './complaint-management.component.html',
  styleUrls: ['./complaint-management.component.scss'],
})
export class ComplaintManagementComponent implements OnInit {
  complaintFormGroup: FormGroup;

  displayedColumns: string[] = [
    'houseNumber',
    'complaintType',
    'complaintDescription',
    'complaintStatus',
  ];

  dataSource: MatTableDataSource<Complaint>;

  houses = AVAILABLE_HOUSES;
  complaintTypes = AVAILABLE_COMPLAINT_TYPES;

  filteredHouses: Observable<House[]>;

  constructor(private formBuilder: FormBuilder) {
    this.dataSource = new MatTableDataSource(COMPLAINT_DATA);
  }

  ngOnInit(): void {
    this.createComplaintForm();

    this.filteredHouses = this.complaintFormGroup.controls.houseNumber.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.houseNumber)),
      map((houseNumber) =>
        houseNumber ? this._filterHouses(houseNumber) : this.houses.slice()
      )
    );
  }

  displayHouseFn(house: House): string {
    return house && house.houseNumber ? house.houseNumber : '';
  }

  private _filterHouses(houseNumber: string): House[] {
    const filterValue = houseNumber.toLowerCase();

    return this.houses.filter(
      (option) => option.houseNumber.toLowerCase().indexOf(filterValue) === 0
    );
  }

  createComplaintForm() {
    this.complaintFormGroup = this.formBuilder.group({
      houseNumber: ['', [Validators.required]],
      complaintedBy: ['', [Validators.required]],
      complaintType: ['', [Validators.required]],
      complaintDescription: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  onSubmit(formData) {
    const data = formData;
    data.houseNumber = formData.houseNumber.houseNumber;
    data.complaintStatus = 'Not Yet Started';
    this.dataSource.data.push(data);
    this.dataSource.filter = '';
    this.createComplaintForm();
  }
}
