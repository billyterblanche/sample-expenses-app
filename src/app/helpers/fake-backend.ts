import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User, Expense, } from '../models'

let userId = 0;
let users: User[] = JSON.parse(localStorage.getItem('users')) || [];
let expenses: Expense[] = JSON.parse(localStorage.getItem(`expenses:${userId}`)) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            console.warn('using fake server to process request');
            switch (true) {
                case url.endsWith('/login') && method === 'POST':
                    return authenticate();
                case url.endsWith('/register') && method === 'POST':
                    return register();
                case url.match('/expenses') && method === 'GET':
                    return getUserExpenses();
                case url.match('/tax') && method === 'GET':
                    return getTax();
                case url.endsWith('/expenses') && method === 'POST':
                    return createUserExpenses();
                case url.match(/\/expenses\/\d+$/) && method === 'PUT':
                    return updateUserExpenses();
                case url.match(/\/expenses\/\d+$/) && method === 'DELETE':
                    return deleteUserExpenses();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() : Observable<HttpResponse<User>> {
            const { username, password } = body;
            const user: User = users.find((x: { username: string; password: string; }) => x.username === username && x.password === password);
            if (!user) {
                return error('Username or password is incorrect');
            }

            userId = user.id;
            
            return ok({
                id: user.id,
                username: user.username,
                logginDate: new Date(),
                token: 'fake-jwt-token'
            });
        }

        function register() {
            const user: User = <User>body;

            if (users.find((x: { username: string; }) => x.username === user.username)) {
                return error(`Username ${user.username} is already taken`);
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }
        
        function getUserExpenses() {
            if (!isLoggedIn()) {
                return unauthorized();
            }
            
            expenses = JSON.parse(localStorage.getItem(`expenses:${userId}`)) || [];
            return ok({ expenses: expenses });
        }
        
        function getTax() {
            if (!isLoggedIn()) {
                return unauthorized();
            }
            
            return ok({ id: 1, rate: 20 });
        }

        function createUserExpenses() {
            if (!isLoggedIn()) {
                return unauthorized();
            }

            const expense: Expense = <Expense>body;

            if (expenses.find((x: { description: string; value: number; dateOfExpense: Date }) =>
            {
                return x.description === expense.description &&
                x.value === expense.value &&
                x.dateOfExpense === expense.dateOfExpense;
            })) {
                return error(`Expenses ${expense.description} has already been captured with the same date and value`);
            }

            expense.id = expenses.length ? Math.max(...expenses.map(x => x.id)) + 1 : 1;
            expenses.push(expense);
            localStorage.setItem(`expenses:${userId}`, JSON.stringify(expenses));

            return ok();
        }

        function updateUserExpenses() {
            if (!isLoggedIn()) {
                return unauthorized();
            }
            
            const expense: Expense = <Expense>body;
            const index = expenses.findIndex(x => x.id === expense.id);
            expenses[index] = expense;
            localStorage.setItem(`expenses:${userId}`, JSON.stringify(expenses));

            return ok();
        }

        function deleteUserExpenses() {
            if (!isLoggedIn()) {
                return unauthorized();
            }

            expenses = expenses.filter(x => x.id !== idFromUrl());
            localStorage.setItem(`expenses:${userId}`, JSON.stringify(expenses));
            return ok();
        }

        // helper functions

        function ok(body?: any) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message: string) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            setUserId();
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function setUserId() {
            const user = JSON.parse(localStorage.getItem('currentUser')) as User;
            if (user) {
                userId = user.id;
                return;
            }

            userId = 0;
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}