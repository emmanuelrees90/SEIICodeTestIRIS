import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SubdivisionService } from '../services/subdivision.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subdivision } from '../models/app.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

const FILTER_MAP = {
  Active: 'activeSections',
  Future: 'futureSections',
  Builtout: 'builtOutSections',
  Default: 'Default'
} as const;

type FilterStatus = keyof typeof FILTER_MAP;

@Component({
  selector: 'app-subdivision-data-display',
  templateUrl: './subdivision-data-display.component.html',
  styleUrls: ['./subdivision-data-display.component.css']
})
export class SubdivisionDataDisplayComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedStatus = '';
  subdivisionStatuses = ['Default', 'Active', 'Future', 'Builtout'];
  //commented other columns for viewing purposes
  displayedColumns: string[] = [
    'id',
    'code',
    'name',
    'longitude',
    'latitude',
    // 'fieldSurveyTerritoryId',
    // 'marketId',
    // 'subdivisionStatusId',
    // 'surveyMethodId',
    'activeSections',
    'futureSections',
    'builtOutSections',
    // 'totalLots',
    // 'fieldSurveyTerritoryName',
    // 'marketName',
    // 'marketAbbreviation',
    // 'subdivisionStatusCode',
    // 'surveyMethodCode',
    // 'county',
    // 'community',
    // 'zoom17Date',
    // 'zoom18Date',
    // 'subdivisionGeometryId',
    // 'subdivisionGeometryBoundingBoxId',
    // 'subdivisionGeometryBoundaryId',
    // 'subdivisionGeometryIntelligenceBoundaryId',
    // 'subdivisionGeometryIntelligenceBoundaryStatusId',
    // 'subdivisionGeometryIntelligenceBoundaryStatusCode',
    // 'subdivisionGeometryIntelligenceBoundaryStatusChangeDate',
    'nearMapImageDate',
    // 'imageBoxId',
    // 'mostRecentIPointBatchDate',
    // 'iPoints',
    // 'validatediPoints',
    // 'subdivisionSpecificStatus'
  ];
  isLoading = true;
  pageSizeOptions = [10, 15, 25, 100];
  dataSource = new MatTableDataSource<Subdivision>([]);

  constructor(private subdivisionService: SubdivisionService) { }

  ngOnInit(): void {
    this.paginateData();
  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    // Handles sorting of requested properties of SubvisionData utilizing angular material out of the box sorting feature
    this.dataSource.sort = this.sort; 
  }


  paginateData() {
    this.subdivisionService.getSubvisionData().subscribe(data => {
      this.dataSource.data = data;
      this.isLoading = false;
    });

  }

  handleFilter(status: FilterStatus) {
    if (status === 'Default') {
      this.dataSource.filterPredicate = (data: Subdivision, filter: string) => true;
      this.dataSource.filter = '';
    } else {
      const filterField = FILTER_MAP[status];
      this.dataSource.filterPredicate = (data: Subdivision, filter: string) => {
        return data[filterField] > 0;
      };
      this.dataSource.filter = status;
    }
  }

}
