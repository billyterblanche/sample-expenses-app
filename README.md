# Expenses Application

This is a simple SPA created to track user expenses. This project was created as a part of a coding challenge. It consists of a UI and a server.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.3.

## Requirements

- [Node and npm](http://nodejs.org)
- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/installing.html)
  - Dependency on [Visual Studio 2010 Tools for Office Runtime](https://www.microsoft.com/en-us/download/details.aspx?id=48217) and
  - Microsoft Excel 2007 or higher

## Installation

1. Clone the repository: `git clone git@github.com:...todo`
2. Change into root directory: cd expenses-app
3. Run: `npm install`
4. Make sure MySQL is running
5. Build application, start the Angular app and start the server: `npm start`
6. Visit `http://localhost:4200/` to register an account and login

### Start the Angular app

Run `npm run-script run-app` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

We added in a fake server to assist with easing the development for the UI. This can be toggled on by updating the in the `userMockServer` value to true in the environments folder.

### Start the API server

Run `npm run-script run-server` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

#### MySQL

##### User

The user configured needs to have access to EXECUTE, INSERT, SELECT, AND UPDATE under the Adminstrative Roles.

##### Configuration

There are some files that can be used to get the database setup and can be found in ~/src/server/config/*

## License

MIT License

Copyright (c) 2020 billyterblanche

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.