import { TestBed } from '@angular/core/testing';

import { UrlsServiceService } from './urls-service.service';

describe('UrlsServiceService', () => {
  let service: UrlsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
