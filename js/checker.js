import {
    main,
    tasks,
    filterData
} from "./index.js"

export const checker = () => {
    let isdone = 0;
    const parentEl = []

    const taskclassed = []; 
    main.addEventListener("click", (e) => {
        if (e.target.type === "checkbox") {
            isdone++;
            console.log(e.target.parentElement)
            e.target.parentElement.parentElement.style.backgroundPosition = "top left"
            const checkedEl = tasks.find(element => element.id == e.target.id)
            if (checkedEl.completed === true) checkedEl.completed = false;
            else {
                checkedEl.completed = true
            }
            parentEl.push(e.target.parentElement)
    
            setTimeout(() => {
                isdone--
                if (isdone === 0) {
                        filterData(tasks)
                        parentEl.length = 0;
                }
            }, 1000);
        }


        if (e.target.classList.contains("task")||
        e.target.parentElement.classList.contains("task")&&
        e.target.type != "checkbox"){
        
           
        function open(task){
            
            if (taskclassed.length > 0) taskclassed[0].classList.remove("opened-task"), taskclassed.length = 0;
            task.classList.add("opened-task")
            
            taskclassed.push(task)
            console.log(taskclassed)
        }


        if (e.target.classList.contains("task")) open(e.target)
        else {open(e.target.parentElement)}
        
        }

        
        
    })
}