import {Component, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Document} from 'carbonldp/Document';
import {Post} from '../../post/post.component';
import {AuthorService} from '../../services/author.service';

@Component({
  selector: 'app-author-posts',
  templateUrl: './author-posts.component.html',
  styleUrls: ['./author-posts.component.scss']
})
export class AuthorPostsComponent implements OnInit {

  posts: Array<Post & Document>;

  constructor(private route: ActivatedRoute, private _authorService: AuthorService) {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        // this._postService.getPost(params.get('id')))
        this._authorService.getCarbonAuthorPost(params.get('id')))
    ).subscribe((posts: Array<Post & Document>) => {
      this.posts = posts;
    });
  }

  ngOnInit() {
  }

}
