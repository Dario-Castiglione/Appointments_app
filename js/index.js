//------------------------------------open
const card = document.querySelectorAll(".card")
const cardImg = document.querySelectorAll(".title-card")

const imgCard = [] 
imgCard.push(...cardImg)
imgCard.forEach(element =>{
    element.addEventListener("click", (event)=>{
        let cardOpen = document.querySelector(".card-opened")
        if (cardOpen != null) cardOpen.classList.remove("card-opened")
        event.currentTarget.parentElement.classList.toggle("card-opened")
    })
})



//------------------------------------------------------------GET PRODUCT
const render = (container, array) =>{
    array.map( element => {
        const task = document.createElement("div")
        const taskP = document.createElement("p")
        const taskInput = document.createElement("input")
        taskP.innerText =`${element.title}`
        taskInput.setAttribute("type", "checkbox")
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
const getProductList = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos")
    const data = await res.json();
    filterData(data) 
    
}
getProductList()



