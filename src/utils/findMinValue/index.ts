import {ResponseApi} from "../DataService";

export function getMinValue(fruits: ResponseApi[]) {
    return fruits.reduce((prev, curr) => {
        return prev.price < curr.price ? prev : curr
    });
}