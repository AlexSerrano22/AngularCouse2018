import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthorService} from '../../services/author.service';
import {AccessPoint} from 'carbonldp/AccessPoint';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class CreateAuthorComponent implements OnInit {
  author: Author = {
    firstName: '',
    lastName: '',
  };
  newAuthorForm = new FormGroup({
    firstName: new FormControl(this.author.firstName, [Validators.required, Validators.minLength(4)]),
    lastName: new FormControl(this.author.lastName, [Validators.required, Validators.minLength(4)]),
  });

  constructor(private _authorService: AuthorService) {
  }

  ngOnInit() {
  }

  createAuthor() {
    const author: Author = {
      firstName: this.newAuthorForm.value.firstName,
      lastName: this.newAuthorForm.value.lastName,
    };

    this._authorService.createCarbonAuthor(author).then((authorDocument) => {
      const postMembersAccessPoint = AccessPoint.create({
        hasMemberRelation: 'posts',
        isMemberOfRelation: 'author'
      });
      return authorDocument.$create(postMembersAccessPoint, 'posts');
    }).then(() => {
      this.newAuthorForm.reset();
    });
  }

}


export interface Author {
  firstName: string;
  lastName: string;
}
