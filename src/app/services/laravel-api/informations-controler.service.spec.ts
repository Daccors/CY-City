import { TestBed } from '@angular/core/testing';

import { InformationsControlerService } from './informations-controler.service';

describe('InformationsControlerService', () => {
  let service: InformationsControlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformationsControlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
