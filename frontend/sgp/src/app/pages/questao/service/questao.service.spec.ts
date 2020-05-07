import { TestBed } from '@angular/core/testing';

import { QuestaoService } from './questao.service';

describe('QuestaoService', () => {
  let service: QuestaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
