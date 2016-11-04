/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShopsService } from './shops.service';

describe('Service: Shop', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopsService]
    });
  });

  it('should ...', inject([ShopsService], (service: ShopsService) => {
    expect(service).toBeTruthy();
  }));
});
