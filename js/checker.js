import {
    main,
    tasks,
    filterData
} from "./index.js";

export const checker = () => {
    let isdone = 0;
    const taskclassed = [];

    main.addEventListener("click", (e) => {

        if (e.target.type === "checkbox") {
            isdone++;
            e.target.parentElement.parentElement.style.backgroundPosition = "top left";
            const checkedEl = tasks.find(element => element.id == e.target.id);
            checkedEl.completed === true ? checkedEl.completed = false : checkedEl.completed = true;
            
            setTimeout(() => {
                isdone--
                if (isdone === 0) {
                    filterData(tasks)
                }
            }, 1000);
        }

        if (e.target.classList.contains("task") ||
            e.target.parentElement.classList.contains("task") &&
            e.target.type != "checkbox") {
            function open(task) {

                taskclassed.length > 0 && taskclassed[0].classList.remove("opened-task"), taskclassed.length = 0;
                task.classList.add("opened-task");
                taskclassed.push(task);
            }
            e.target.classList.contains("task") ? open(e.target) : open(e.target.parentElement);
        }
    })
}