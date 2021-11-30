import {
    filterData,
    tasks
} from "./index.js"

function orderByName(a, b) {
    if (a.title < b.title) {
        return -1
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
}

function orderById(a, b) {
    if (a.id < b.id) {
        return -1
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
}

function orderByIdRev(a, b) {
    if (b.id < a.id) {
        return -1
    }
    if (b.id > a.id) {
        return 1;
    }
    return 0;
}
export function sorting(orderElement, array) {
    switch (orderElement.value) {
        case "alfabetico":
            array.sort(orderByName)
            break;
        case "dataC":
            array.sort(orderById)
            break;
        case "dataD":
            array.sort(orderByIdRev)
            break;
        default:
            break;
    }
    filterData(tasks)
}