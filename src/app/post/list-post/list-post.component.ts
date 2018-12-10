import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../post.component';
import {Document} from 'carbonldp/Document';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  @Input() posts: Post & Document;

  constructor() {
  }

  ngOnInit() {
  }

}
