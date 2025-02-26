import { Routes } from '@angular/router';
import { ProgramComponent } from './Component/program/program.component';
import { ParticipantComponent } from './Component/participant/participant.component';

export const routes: Routes = [
    {
        path:'\program',
        component:ProgramComponent
    },
    {
        path:'\participant',
        component:ParticipantComponent
    },
];
