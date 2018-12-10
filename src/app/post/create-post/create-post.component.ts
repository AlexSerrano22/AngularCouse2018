import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../post.component';
import {AuthorService} from '../../services/author.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  post: Post = {
    title: '',
    content: '',
    author: '',
  };
  newPostForm = new FormGroup({
    title: new FormControl(this.post.title, [Validators.required, Validators.minLength(4)]),
    content: new FormControl(this.post.content, [Validators.required, Validators.minLength(4)]),
    author: new FormControl(this.post.author, [Validators.required, Validators.minLength(4)])
  });


  constructor(private _postService: PostService, private _authorService: AuthorService) {
  }

  ngOnInit() {
  }

  createPost() {
    /*const post: Post = {
      content: this.newPostForm.value.content,
      title: this.newPostForm.value.title,
      author: this.newPostForm.value.author,
    };*/
    const post: Post = {
      content: this.newPostForm.value.content,
      title: this.newPostForm.value.title,
    };

    this._postService.createCarbonPost(post).then((document) => {
      this._authorService.addPost(this.newPostForm.value.author, document.$id);
      /* const commentsMembersAccessPoint = AccessPoint.create({
         hasMemberRelation: 'posts',
         isMemberOfRelation: 'author'
       });
       return authorDocument.$create(postMembersAccessPoint, 'posts');
     }).then(() => {*/
      this.newPostForm.reset();
    });
    /*
    this._postService.createPost(post).subscribe((res) => {
      this.newPostForm.reset();
    });*/

  }

}
