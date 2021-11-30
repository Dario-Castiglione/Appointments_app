import {
    main,
    tasks,
    filterData
} from "./index.js"

export const checker = () => {

    let isgoing = false
    main.addEventListener("click", (e) => {
        if (e.target.type === "checkbox" && isgoing === false) {
            isgoing = true
            e.target.parentElement.style.backgroundPosition = "top left"
            const checkedEl = tasks.find(element => element.id == e.target.id)
            if (checkedEl.completed === true) checkedEl.completed = false;
            else {
                checkedEl.completed = true
            }
            setTimeout(() => {
                e.target.parentElement.style.animation = "disappear 0.3s linear"
            }, 1000);
            setTimeout(() => {
                filterData(tasks)
                isgoing = false
            }, 1300);
        }
    })
}