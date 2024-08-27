import { TestBed } from '@angular/core/testing';

import { SubdivisionService } from './subdivision.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SubdivisionService', () => {
  let service: SubdivisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SubdivisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
