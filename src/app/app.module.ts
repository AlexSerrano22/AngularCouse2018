import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CarbonLDP} from 'carbonldp';
import {PostComponent} from './post/post.component';
import {CommentsComponent} from './comments/comments.component';
import {CommentComponent} from './comments/comment/comment.component';
import {ReactiveFormsModule} from '@angular/forms';
import carbon from './carbon/carbon.config';
import {FormatDatePipe} from './pipes/format-date.pipe';
import {PostService} from './services/post.service';
import {BlogComponent} from './blog/blog.component';
import {HttpClientModule} from '@angular/common/http';
import { CutStringPipe } from './pipes/cut-string.pipe';
import { HeaderComponent } from './header/header.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    CommentsComponent,
    CommentComponent,
    FormatDatePipe,
    BlogComponent,
    CutStringPipe,
    HeaderComponent,
    CreatePostComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: CarbonLDP, useValue: carbon
  },
    PostService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
