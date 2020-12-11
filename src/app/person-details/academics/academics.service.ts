import { Injectable } from '@angular/core';
import { AcademicsModel } from './academics.model';

@Injectable({
  providedIn: 'root'
})
export class AcademicsService {
  session: AcademicsModel = {
    category: 'Session',
    description: 'August 2020-November 2020',
    ref_code: 6,
    ref_name: 'N20',
    reference_id: 6
  };
  constructor() { }
}
