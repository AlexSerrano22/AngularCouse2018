import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PostService} from '../services/post.service';
import {switchMap} from 'rxjs/operators';
import {Document} from 'carbonldp/Document';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post & Document;
  private zone: NgZone;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _postService: PostService) {
    this.zone = new NgZone({enableLongStackTrace: false});
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        // this._postService.getPost(params.get('id')))
        this._postService.getCarbonPost(params.get('id')))
    ).subscribe((post: Post & Document) => {
      this.post = post;
      console.log(post);
    });
  }

  ngOnInit() {
  }

  private on_comment_created(comment) {
    this.post.comments = this.post.comments ? [comment, ...this.post.comments] : [comment];
    this.post.$saveAndRefresh().then((savedPost) => {
      this.post = savedPost;
    });
  }
}


export interface Post {
  title: string;
  id?: string;
  author?: string;
  content: string;
  comments?: Array<Comment>;
}
