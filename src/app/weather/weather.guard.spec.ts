import { TestBed, async, inject } from '@angular/core/testing';

import { WeatherGuard } from './weather.guard';

describe('WeatherGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherGuard]
    });
  });

  it('should ...', inject([WeatherGuard], (guard: WeatherGuard) => {
    expect(guard).toBeTruthy();
  }));
});
