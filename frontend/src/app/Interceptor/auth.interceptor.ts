import { HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  const token = localStorage.getItem('accessToken') || "";
  const modifiedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return next(modifiedReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        return handleTokenRefresh(req, next);
      }
      return throwError(() => error);
    })
  );
};

const handleTokenRefresh = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const http = inject(HttpClient);
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    logoutUser();
    return throwError(() => new Error('No refresh token found, logging out.'));
  }

  return http.post<{ accessToken: string }>('/api/v1/auth/refresh', { refreshToken })
    .pipe(
      switchMap(response => {
        localStorage.setItem('accessToken', response.accessToken);
        const newRequest = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${response.accessToken}`
          }
        });
        return next(newRequest);
      }),
      catchError(err => {
        logoutUser();
        return throwError(() => err);
      })
    );
};

const logoutUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login'; 
};
