import { TestBed } from '@angular/core/testing';

import { BlogService } from './post.service';

describe('BlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogService = TestBed.get(BlogService);
    expect(service).toBeTruthy();
  });
});
