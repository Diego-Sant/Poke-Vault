import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    context?: HttpContext;
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}

export interface Cards {
    cards: Card[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}

export interface Card {
    id?: string;
    title: string;
    imageUrl: string;
    price: string;
    rarity: number;
    createdAt: Date;
    userId: string;
}

export interface PaginationParams {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    page: number;
    perPage: number;
}