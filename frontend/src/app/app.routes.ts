import { Routes } from '@angular/router';
import { ProgramComponent } from './Component/program/program.component';
import { ParticipantComponent } from './Component/Participant/participant.component';
import { LoginComponent } from './Component/Auth/login/login.component';
import { ForgetPasswordComponent } from './Component/Auth/forget-password/forget-password.component';
import { RegisterComponent } from './Component/Auth/register/register.component';

export const routes: Routes = [
    {
        path:'\login',
        component:LoginComponent
    },
    {
        path:'\register',
        component:RegisterComponent
    },
    {
        path:'\forget-password',
        component:ForgetPasswordComponent
    },
    
    {
        path:'\program',
        component:ProgramComponent
    },
    {
        path:'\participant',
        component:ParticipantComponent
    },
];
