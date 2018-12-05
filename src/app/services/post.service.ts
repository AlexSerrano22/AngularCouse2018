import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Post} from '../post/post.component';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  BASE_API_URL = 'http://localhost:3000/';

  constructor(private _httpClient: HttpClient) {
  }

  getAllPost(): Observable<Array<Post>> {
    return this._httpClient.get(`${this.BASE_API_URL}posts`)
      .pipe(map((data: Array<Post>) => data.map(element => {
        element.date = new Date(element.date);
        return element;
      })));
  }

  createPost(post: Post): Observable<any> {
    return this._httpClient.post(`${this.BASE_API_URL}posts`, post);
  }

  getPost(id): Observable<Post> {
    return this._httpClient.get(`${this.BASE_API_URL}posts/${id}`).pipe(map((data: Post) => data));
  }
}
