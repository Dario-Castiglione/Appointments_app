//------------------------------------open
const card = document.querySelectorAll(".card")
const titleCard = document.querySelectorAll(".title-card")
const main = document.querySelector("main")

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
    render(card[0], notCompletedTasks)
    render(card[1], completedTasks)
    return notCompletedTasks , completedTasks
}
let tasks = []
export let API = "https://jsonplaceholder.typicode.com/todos"
const getProductList = async () => {
    const res = await fetch(API)
    const data = await res.json();
    filterData(data) 
    tasks = data
}
//console.log(data)
getProductList()





