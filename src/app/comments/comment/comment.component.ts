import {Component, Input, OnInit} from '@angular/core';
import {Document} from 'carbonldp/Document';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;

  constructor() {
  }

  ngOnInit() {
  }

}

export interface Comment {
  id?: number;
  body: string;
  postId: number;
  author: string;
  created: Date;
}
