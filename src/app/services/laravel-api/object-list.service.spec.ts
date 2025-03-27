import { TestBed } from '@angular/core/testing';

import { ObjectListService } from './object-list.service';

describe('ObjectListService', () => {
  let service: ObjectListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
