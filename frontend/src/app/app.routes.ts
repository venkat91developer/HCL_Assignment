import { Routes } from '@angular/router';
import { LoginComponent } from './Component/Auth/login/login.component';
import { ForgetPasswordComponent } from './Component/Auth/forget-password/forget-password.component';
import { RegisterComponent } from './Component/Auth/register/register.component';
import { ProgramListComponent } from './Component/Programs/list/list.component';
import { ProgramFormComponent } from './Component/Programs/form/form.component';
import { ParticipantListComponent } from './Component/Participant/list/list.component';
import { ParticipantFormComponent } from './Component/Participant/form/form.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'forgot-password',
        component:ForgetPasswordComponent
    },
    {
        path:'program',
        component:ProgramListComponent
    },
    {
        path:'program/add',
        component:ProgramFormComponent
    },
    {
        path:'program/edit/:id',
        component:ProgramFormComponent
    },
    {
        path:'participant',
        component:ParticipantListComponent
    },
    {
        path:'participant/add',
        component:ParticipantFormComponent
    },
    {
        path:'participant/edit/:id',
        component:ParticipantFormComponent
    },
];
