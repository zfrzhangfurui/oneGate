import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import { IvoryError, IvoryUnauthorizedError } from '../error';
import { Inject, PLATFORM_ID, Optional, Injectable } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { API_GATEWAY } from '../token';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

    constructor(@Inject(PLATFORM_ID) private platform: Object,
        // @Optional() @Inject(PLATFORM_SERVER_REQUEST) private request: Request,
        @Inject(API_GATEWAY) private api_gateway: string) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const clonedReq =
            isPlatformServer(this.platform) ?
                req.clone({
                    url: this.api_gateway + req.url,
                    // withCredentials: true,
                    headers: (() => {
                        let myHeaders = req.headers;
                        // if (this.request.headers['cookie']) {
                        //     myHeaders = myHeaders.set('Cookie', this.request.headers['cookie']);
                        // }
                        // if (this.request.headers['x-real-ip']) {
                        //     myHeaders = myHeaders.set('x-real-ip', this.request.headers['x-real-ip']);
                        // }
                        // if (this.request.headers['x-forwarded-for']) {
                        //     myHeaders = myHeaders.set('X-Forwarded-For', this.request.headers['x-forwarded-for']);
                        // }
                        // if (this.request.headers['x-forwarded-proto']) {
                        //     myHeaders = myHeaders.set('X-Forwarded-Proto', this.request.headers['x-forwarded-proto']);
                        // }
                        // if (this.request.headers['host']) {
                        //     myHeaders = myHeaders.set('Host', this.request.headers['host']);
                        // }
                        return myHeaders;
                    })()
                }) :
                req.clone({
                    url: this.api_gateway + req.url,
                    // withCredentials: true
                });
        return next.handle(clonedReq).pipe(
            // catchError(
            //     e => {
            //         console.log(e);
            //         return next.handle(clonedReq);
            //         // return clonedReq;

            //         // if (e instanceof HttpErrorResponse) {
            //         //     if(e.status==401){
            //         //         return throwError(new IvoryUnauthorizedError())
            //         //     }
            //         //     const sagitError = new IvoryError(
            //         //         e.error.code || 999,
            //         //         e.error.description || 'Unknown error.',
            //         //         e
            //         //     );
            //         //     return throwError(sagitError); //it's a trick!
            //         // }
            //         // return throwError(new IvoryError(998, 'Unknown error.', e));
            //     })
        );
    }
}