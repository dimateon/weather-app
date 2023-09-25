import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {
    constructor(private matSnackBar: MatSnackBar) {}

    public showError(message?: string): Observable<null> {
        const msg = message ? message : 'Oops, something went wrong! :(';
        this.matSnackBar.open(msg, null, {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['snackbar'],
        });
        return EMPTY;
    }
}
