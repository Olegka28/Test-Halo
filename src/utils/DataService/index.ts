export interface ResponseApi {
    name: string;
    category: string;
    price: number | string;
    id: number | string;
    nameUser?: string;
    number?: string;
}

class BaseApi {

    private static baseUrl: string = 'http://localhost:8888/fruits'

    static put(
        body?: Record<string, unknown>
    ): Promise<ResponseApi[]> {
        return fetch(`${this.baseUrl}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then((res) => res.json()).catch(error => console.log(error));
    }

    static get(): Promise<ResponseApi[]> {
        return fetch(`${this.baseUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            },
        }).then((res) => res.json()).catch(error => console.log(error));
    }
}

export default BaseApi;
