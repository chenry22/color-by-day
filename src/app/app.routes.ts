import { Routes } from '@angular/router';
import { ColorPage } from './color-page/color-page';
import { RespondPage } from './respond-page/respond-page';

export const routes: Routes = [
    {
        path: '',
        component: ColorPage,
    },
    {
        path: 'respond',
        component: RespondPage
    }
];
