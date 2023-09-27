import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class QueryParametersService {
    constructor(private _route: ActivatedRoute, private _router: Router) {}

    public getQueryParams(): Params {
        return this._route.snapshot.queryParams;
    }

    public getQueryParamByName<T>(name: string): T {
        return (this._route.snapshot.queryParamMap.get(name) as T) || null;
    }

    public setQueryParam(name: string, value: string): void {
        const params = { ...this._route.snapshot.queryParams };
        params[name] = value;
        this._router.navigate([], {
            relativeTo: this._route,
            queryParams: params,
        });
    }

    public addQueryParam(name: string, value: string): void {
        const params = { ...this._route.snapshot.queryParams };
        if (params[name]) {
            params[name] = Array.from(new Set([params[name], value].join(',').split(','))).join(',');
        } else {
            params[name] = value;
        }
        this._router.navigate([], {
            relativeTo: this._route,
            queryParams: params,
        });
    }
}
