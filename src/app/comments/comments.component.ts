import {Component, EventEmitter, Input, OnChanges, Output, SimpleChange} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Comment} from './comment/comment.component';
import {CommentsService} from '../services/comments.service';
import {ActivatedRoute} from '@angular/router';
import {Post} from '../post/post.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnChanges {
  @Input() post: Post & Document;
  @Output() handleCommentCreated: EventEmitter<any> = new EventEmitter();
  comments: Array<Comment> = [];
  commentForm = new FormGroup({
    newComment: new FormControl('')
  });

  // postId: number;

  /**carbon
   * constructor(private carbon: CarbonLDP) {
     this.carbon.documents.$getChildren('comments/').then((comments: Array<Comment>) => {
       this.comments = comments.sort(this.sortFunction);
     });
  }*/

  constructor(private _commentsService: CommentsService, private route: ActivatedRoute) {
    /* this.route.paramMap.pipe(
       switchMap((params: ParamMap) => {
         this.postId = +params.get('id');
         return this._commentsService.getAllComments(this.postId);
       })
     ).subscribe((data: Array<Comment>) => this.comments = data);*/
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    if ((changes['post'].currentValue !== changes['post'].previousValue)) {
      if (changes['post'].currentValue.comments) {
        this.comments = <Array<Comment>>[...changes['post'].currentValue.comments].sort(this.sortFunction);
      }
    }
  }

  onSubmit() {
    /** carbon
     const newComment = {content: this.commentForm.value.newComment, types: ['Comment']};
     this.carbon.documents.$createAndRetrieve('comments/', newComment).then((commentDocument: Comment) => {
      this.comments.unshift(commentDocument);
    });*/
    const newComment: Comment = {
      body: this.commentForm.value.newComment,
      author: 'http://localhost:8083/authors/c1b94e49-e450-42bc-a832-0b7e567a5633/'
    };
    /*this._commentsService.createComment(newComment).subscribe(
      (comment: Comment) => {
        this.comments.unshift(comment);
      }
    );*/
    this._commentsService.createCarbonComment(newComment).then((comment) => {
      this.handleCommentCreated.emit(comment);
      this.comments.unshift(comment);
      this.commentForm.reset();
    });
  }

  private sortFunction(a, b) {
    if (a.created < b.created) {
      return 1;
    } else if (a.created > b.created) {
      return -1;
    } else {
      return 0;
    }
  }
}
