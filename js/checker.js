import {
    main,
    tasks,
    filterData
} from "./index.js"

export const checker = () => {
    let isdone = 0;
    const parentEl = []

    main.addEventListener("click", (e) => {
        if (e.target.type === "checkbox") {
            isdone++;

            e.target.parentElement.style.backgroundPosition = "top left"
            const checkedEl = tasks.find(element => element.id == e.target.id)
            if (checkedEl.completed === true) checkedEl.completed = false;
            else {
                checkedEl.completed = true
            }
            parentEl.push(e.target.parentElement)
            if (isdone === -1) console.log("ops")

            setTimeout(() => {
                isdone--
                if (isdone === 0) {
                        filterData(tasks)
                        parentEl.length = 0;
                }
            }, 1000);
        }
    })
}