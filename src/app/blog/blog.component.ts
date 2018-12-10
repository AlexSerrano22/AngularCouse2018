import {Component, OnInit} from '@angular/core';
import {PostService} from '../services/post.service';
import {Post} from '../post/post.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  posts: Array<Post> = [];

  constructor(private _postService: PostService) {
   /* this._postService.getAllPost().subscribe((data) => {
      this.posts = data;
    });*/
    this._postService.getAllCarbonPost().then((data) => {
      console.log(data);
      this.posts = data;
    });
  }

  ngOnInit() {
  }

}
