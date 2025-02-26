import { Routes } from '@angular/router';
import { LoginComponent } from './Component/Auth/login/login.component';
import { ForgetPasswordComponent } from './Component/Auth/forget-password/forget-password.component';
import { RegisterComponent } from './Component/Auth/register/register.component';

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
];
