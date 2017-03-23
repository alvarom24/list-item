export class Item {
    id: number;
    title: string = '';
    price: string;
    image: string;
    quantity: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

