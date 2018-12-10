import {Injectable} from '@angular/core';
import {Document} from 'carbonldp/Document';
import {CarbonLDP} from 'carbonldp';
import {Author} from '../author/create-author/create-author.component';
import {Post} from '../post/post.component';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private _carbonLDP: CarbonLDP) {
  }


  createCarbonAuthor(author: Author): Promise<Author & Document> {
    author['types'] = ['Author'];
    return this._carbonLDP.documents.$create('authors/', author);
  }

  addPost(authorID: string, post: string) {
    this._carbonLDP.documents.$addMember(`${authorID}posts/`, post);
  }

  getCarbonAuthorPost(authorID): Promise<Array<Post & Document>> {
    return this._carbonLDP.documents.$getMembers(`authors/${authorID}/posts/`, _ => _.properties(
      {
        'title': _.inherit,
        'content': _.inherit,
        'author': {
          'query': _ => _
            .withType('Author')
            .properties({
              'firstName': _.inherit,
              'lastName': _.inherit
            })
        }
      }
    ));
  }
}
