import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AlertService {
    constructor(private snackBar: MatSnackBar) { }

    success(message: string, duration = 4000) {
        this.snackBar.open(message, 'OK', { duration });
    }

    error(message: string, duration = 4000) {
        this.snackBar.open(message, 'OK', { duration });
        // TODO: Track client messages to see if we need to improve the user experience.
    }
}