import { Routes } from '@angular/router';
import { ColorPage } from './color-page/color-page';
import { RespondPage } from './respond-page/respond-page';
import { ResponsesPage } from './responses-page/responses-page';

export const routes: Routes = [
    {
        path: '',
        component: ColorPage,
    },
    {
        path: 'respond',
        component: RespondPage
    },
    {
        path: 'responses',
        component: ResponsesPage
    }
];
