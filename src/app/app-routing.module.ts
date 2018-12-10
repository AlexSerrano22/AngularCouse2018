import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogComponent} from './blog/blog.component';
import {CreatePostComponent} from './post/create-post/create-post.component';
import {PostComponent} from './post/post.component';
import {CreateAuthorComponent} from './author/create-author/create-author.component';
import {AuthorPostsComponent} from './author/author-posts/author-posts.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent
  },
  {
    path: 'create-post',
    component: CreatePostComponent
  },
  {
    path: 'post/:id',
    component: PostComponent
  },
  {
    path: 'create-author',
    component: CreateAuthorComponent
  },
  {
    path: 'author/:id',
    component: AuthorPostsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
