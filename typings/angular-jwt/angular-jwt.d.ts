// Type definitions for angular-jwt 0.0.8
// Project: https://github.com/auth0/angular-jwt
// Definitions by: Reto Rezzonico <https://github.com/rerezz>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../angularjs/angular.d.ts" />

declare module angular.jwt {

    interface IJwtHelper {
        decodeToken<T>(token: string): T;
        getTokenExpirationDate(token: any): Date;
        isTokenExpired(token: any, offsetSeconds?: number): boolean;
    }

    interface IJwtInterceptor {
        tokenGetter(): string;
    }
}
