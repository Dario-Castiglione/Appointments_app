import { filterData} from "./index.js"

export function sorting(orderElement, array) {
    switch (orderElement.value) {
        case "alfabetico":
            array.sort(function (a, b) {
                const titleA = a.title.toUpperCase();
                const titleB = b.title.toUpperCase();
                if (titleA < titleB){
                    return a.title.localeCompare(b.title);
                }
              });
            break;
        case "dataC":
            array.sort(function (a, b) {
                return a.date.localeCompare(b.date);
              });
            break;
        case "dataD":
            array.sort(function (a, b) {
                return b.date.localeCompare(a.date);
              });
            break;
        default:
            break;
    }
    filterData(array)
}