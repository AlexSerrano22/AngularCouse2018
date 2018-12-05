import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../comments/comment/comment.component';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  BASE_API_URL = 'http://localhost:3000/';

  constructor(private _httpClient: HttpClient) {
  }

  getAllComments(postId): Observable<Array<Comment>> {
    return this._httpClient.get(`${this.BASE_API_URL}comments?postId=${postId}`)
      .pipe(map((data: Array<Comment>) => data.map((element: Comment) => {
        element.created = new Date(element.created);
        return element;
      }).sort(this.sortFunction)));
  }

  createComment(comment: Comment): Observable<any> {
    return this._httpClient.post(`${this.BASE_API_URL}comments`, comment);
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
