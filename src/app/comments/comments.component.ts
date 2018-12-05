import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Comment} from './comment/comment.component';
import {CommentsService} from '../services/comments.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Array<Comment> = [];
  commentForm = new FormGroup({
    newComment: new FormControl('')
  });
  postId: number;

  /**carbon
   * constructor(private carbon: CarbonLDP) {
     this.carbon.documents.$getChildren('comments/').then((comments: Array<Comment>) => {
       this.comments = comments.sort(this.sortFunction);
     });
  }*/

  constructor(private _commentsService: CommentsService, private route: ActivatedRoute,) {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.postId = +params.get('id');
        return this._commentsService.getAllComments(this.postId);
      })
    ).subscribe((data: Array<Comment>) => this.comments = data);
  }

  ngOnInit() {
  }

  onSubmit() {
    /** carbon
     const newComment = {content: this.commentForm.value.newComment, types: ['Comment']};
     this.carbon.documents.$createAndRetrieve('comments/', newComment).then((commentDocument: Comment) => {
      this.comments.unshift(commentDocument);
    });*/
    const newComment: Comment = {
      body: this.commentForm.value.newComment,
      postId: this.postId,
      author: 'someone',
      created: new Date()
    };
    this._commentsService.createComment(newComment).subscribe(
      (comment: Comment) => {
        this.comments.unshift(comment);
      }
    );
    this.commentForm.reset();
  }

}
