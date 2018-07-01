import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayStoryComponent } from './components/play-story/play-story.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'play',
        component: PlayStoryComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
