export interface Department {
    $key?: string;
    owner: string;
    name: string;
    order: number;
}

export interface Item {
    $key?: string;
    owner: string;
    buy: boolean;
    quantity: number;
    unit: string;
    name: string;
    order: number;
}

export interface Shop {
    $key?: string,
    owner: string;
    name: string;
    order: number;
}

export interface User {
    $key?: string,
    email: string;
    name: string;
    shopOwner: string;
}

export interface AppState {
    user: User;
    shop: Shop;
    shops: Shop[];
    departments : Department[];
    items: Item[];
}