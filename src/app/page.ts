export interface Page {
    id: number;
    path: string;
    title: string;
    description: string;
    tags: string[];
    lat: number;
    lon: number;
    telephone: string;
}

export interface PageList {
    list: Page[];
}

export interface PageResponse {
    pages: PageList;
}