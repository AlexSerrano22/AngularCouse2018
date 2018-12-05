import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PostService} from '../services/post.service';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _postService: PostService) {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this._postService.getPost(params.get('id')))
    ).subscribe((post: Post) => {
      this.post = post;
    });
  }

  ngOnInit() {
  }

}


export interface Post {
  title: string;
  id?: number;
  author: string;
  content: string;
  date: Date;
}
