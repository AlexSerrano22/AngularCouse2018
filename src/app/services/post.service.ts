import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Post} from '../post/post.component';
import {CarbonLDP} from 'carbonldp';
import {URI} from 'carbonldp/RDF/URI';
import {Document} from 'carbonldp/Document';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  BASE_API_URL = 'http://localhost:3000/';

  constructor(private _httpClient: HttpClient, private _carbonLDP: CarbonLDP) {
    /* this._carbonLDP.documents.$exists('author/').then((exist) => {
       if (!exist) {
         this._carbonLDP.documents.$create('', {}, 'slug').then((doc) => {
           console.log('document Created', doc);
         });
       }
     });*/
  }

  getAllPost(): Observable<Array<Post>> {
    return this._httpClient.get(`${this.BASE_API_URL}posts`)
      .pipe(map((data: Array<Post>) => data.map(element => {
        // element.date = new Date(element.date);
        return element;
      })));
  }

  createPost(post: Post): Observable<any> {
    return this._httpClient.post(`${this.BASE_API_URL}posts`, post);
  }

  getPost(id): Observable<Post> {
    return this._httpClient.get(`${this.BASE_API_URL}posts/${id}`).pipe(map((data: Post) => data));
  }

  /**
   * CARBON LDP
   * */

  createCarbonPost(post: Post): Promise<Post & Document> {
    const slug = URI.getSlug(post.title);
    post['types'] = ['Post'];
    return this._carbonLDP.documents.$create('posts/', post, slug);
  }

  getCarbonPost(id): Promise<Post & Document> {
    return this._carbonLDP.documents.$get(`posts/${id}/`, _ => _
      .properties(
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
          },
          'comments': {
            'query': _ => _
              .withType('Comment')
              .properties(_.all)
          }
        }
      )
    );
  }

  getAllCarbonPost(): Promise<Array<Post & Document>> {
    return this._carbonLDP.documents.$getMembers('posts/', _ => _
      .properties(
        {
          'title': _.inherit,
          'content': _.inherit,
          'author': {
            'query': _ => _
              .withType('Author')
              .properties({
                'firstName': _.inherit
              })
          }
        })
    );
  }


  addComment(postID: string, commentID: string) {
    this._carbonLDP.documents.$get(`${postID}comments/`).then((authorAccessPoint) => {
      return authorAccessPoint.$addMember(commentID);
    });
  }

}
