//------------------------------------open
const card = document.querySelectorAll(".card")
const titleCard = document.querySelectorAll(".title-card")
const main = document.querySelector("main")
const wrapper = document.querySelectorAll(".wrapper")
const cardDown = [] 
cardDown.push(...titleCard)
cardDown.forEach(element =>{
    element.addEventListener("click", (event)=>{
        let cardOpen = document.querySelector(".card-opened")
        if (cardOpen != null) cardOpen.classList.remove("card-opened")
        event.currentTarget.parentElement.classList.toggle("card-opened")
    })
})
/*
main.addEventListener("click", (e)=>{
    let isCompleted = "";
    if (e.target.type==="checkbox") {

        const element = tasks.find(element => element.id = e.target.id)
        if (element.completed ==="true") isCompleted = "false"
        else {element.completed === "true"}  isCompleted = "true"
        console.log(tasks.find(element => element.id = e.target.id))
    }
})
*/


//------------------------------------------------------------GET PRODUCT
const render = (container, array) =>{
    

    

    array.map( element => {
        const task = document.createElement("div")
        const taskP = document.createElement("p")
        const taskInput = document.createElement("input")
        taskP.innerText =`${element.title}`
        taskInput.setAttribute("type", "checkbox")
        taskInput.setAttribute("id", element.id)
        if (element.completed === true) taskInput.setAttribute("checked",``)
        task.classList= "task"
        task.appendChild(taskP)
        task.appendChild(taskInput)        
        container.appendChild(task)
    })


}
const filterData = (data) => {
    let notCompletedTasks = data.filter(element => element.completed === false)
    let completedTasks = data.filter(element => element.completed === true)
    render(wrapper[0], notCompletedTasks)
    render(wrapper[1], completedTasks)
    return notCompletedTasks , completedTasks
}
let tasks = []
export let API = "https://jsonplaceholder.typicode.com/todos"
const getList = async () => {
    const res = await fetch(API)
    const data = await res.json();
    filterData(data) 
    console.log(data)
    tasks = data
}
//console.log(data)
getList()

//---------form add

const form = document.querySelector(".add-form")

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    const newTask = 
        {
            "id": `${tasks.length + 1}`,
            "title": `${form.firstElementChild.value}`,
            "completed": false
            }
            console.log(newTask)
        
    const addTask = () => {
    const task = document.querySelectorAll(".task")
    const allTask = [...task]
    allTask.forEach(element => element.remove())   
    console.log(allTask)
     tasks.push(newTask)
     filterData(tasks)
     console.log(task)
     form.firstElementChild.value="";
    }    
    
    addTask()
    
});


