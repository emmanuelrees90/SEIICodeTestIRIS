import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubdivisionDataDisplayComponent } from './subdivision-data-display.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule

import { SubdivisionService } from '../services/subdivision.service';
import { Subdivision } from '../models/app.interface';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SubdivisionDataDisplayComponent', () => {
  let component: SubdivisionDataDisplayComponent;
  let fixture: ComponentFixture<SubdivisionDataDisplayComponent>;
  let mockSubdivisionService: jasmine.SpyObj<SubdivisionService>;
  const mockData: Subdivision[] = [
    {
      id: 1,
      code: '001',
      name: 'Subdivision A',
      longitude: 45.0,
      latitude: -75.0,
      fieldSurveyTerritoryId: 1,
      marketId: 1,
      subdivisionStatusId: 1,
      surveyMethodId: 1,
      activeSections: 3,
      futureSections: 5,
      builtOutSections: 7,
      totalLots: 100,
      fieldSurveyTerritoryName: 'Territory A',
      marketName: 'Market A',
      marketAbbreviation: 'MA',
      subdivisionStatusCode: 'Active',
      surveyMethodCode: 'Method A',
      county: 'County A',
      community: null,
      zoom17Date: '2023-08-11T18:20:25.557Z',
      zoom18Date: '2023-08-11T18:20:25.557Z',
      subdivisionGeometryId: null,
      subdivisionGeometryBoundingBoxId: null,
      subdivisionGeometryBoundaryId: null,
      subdivisionGeometryIntelligenceBoundaryId: 24714,
      subdivisionGeometryIntelligenceBoundaryStatusId: 4,
      subdivisionGeometryIntelligenceBoundaryStatusCode: 'Finalized',
      subdivisionGeometryIntelligenceBoundaryStatusChangeDate: '2022-07-14T04:41:38.403Z',
      nearMapImageDate: '2023-06-17T18:02:42.000Z',
      imageBoxId: 59809,
      mostRecentIPointBatchDate: '2023-07-07T00:00:00.000Z',
      iPoints: null,
      validatediPoints: null,
      subdivisionSpecificStatus: 'Future'
    }
  ];

  beforeEach(waitForAsync(() => {
    mockSubdivisionService = jasmine.createSpyObj('SubdivisionService', ['getSubvisionData']);

    TestBed.configureTestingModule({
      declarations: [SubdivisionDataDisplayComponent],
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatSelectModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: SubdivisionService, useValue: mockSubdivisionService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubdivisionDataDisplayComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize dataSource and fetch data on init', () => {
    mockSubdivisionService.getSubvisionData.and.returnValue(of(mockData));
    fixture.detectChanges();
    expect(component.dataSource.data.length).toBe(1);
    expect(component.isLoading).toBe(false);
    expect(mockSubdivisionService.getSubvisionData).toHaveBeenCalled();
  });

  it('should set paginator and sort after view init', () => {
    mockSubdivisionService.getSubvisionData.and.returnValue(of(mockData));
    fixture.detectChanges();
    component.ngAfterViewInit();

    expect(component.dataSource.paginator).toBe(component.paginator);
    expect(component.dataSource.sort).toBe(component.sort);
  });

  it('should filter data based on status', () => {
    mockSubdivisionService.getSubvisionData.and.returnValue(of(mockData));
    fixture.detectChanges();

    component.handleFilter('Active');
    expect(component.dataSource.filterPredicate).toBeTruthy();
    expect(component.dataSource.filter).toBe('Active');
  });

  it('should clear the filter when "Default" is selected', () => {
    mockSubdivisionService.getSubvisionData.and.returnValue(of(mockData));
    fixture.detectChanges();

    component.handleFilter('Default');
    expect(component.dataSource.filterPredicate).toBeTruthy();
    expect(component.dataSource.filter).toBe('');
  });
});