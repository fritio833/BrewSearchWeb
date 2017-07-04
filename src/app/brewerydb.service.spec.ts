/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BrewerydbService } from './brewerydb.service';

describe('BrewerydbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrewerydbService]
    });
  });

  it('should ...', inject([BrewerydbService], (service: BrewerydbService) => {
    expect(service).toBeTruthy();
  }));
});
