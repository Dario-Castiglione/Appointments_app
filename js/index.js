const titleCard = document.querySelectorAll(".title-card")
const main = document.querySelector("main")
const wrapper = document.querySelectorAll(".wrapper")

export let API = "https://jsonplaceholder.typicode.com/todos"

//------------------------------------open card
const cardDown = []
cardDown.push(...titleCard)
cardDown.forEach(element => {
    element.addEventListener("click", (event) => {
        let cardOpen = document.querySelector(".card-opened")
        if (cardOpen != null) cardOpen.classList.remove("card-opened")
        event.currentTarget.parentElement.classList.toggle("card-opened")
    })
})

//------------------------------------------check product
import { checker } from "./checker.js" 
checker()
//------------------------------------------------------------RENDER
const render = (container, array) => {
    localStorage.setItem("data",JSON.stringify(tasks))
    function display() {
        container.innerHTML = newArray
    }

    const newArray = array
        .map(
            (element) => `<div class="task">
      <p>${element.title}</p>
      <input type="checkbox" ${element.completed ? "checked" : ""} id="${element.id}">
      </div>`
        ).join("")
    display(newArray)

}

//--------------------------------------------------filter
let notCompletedTasks  = [];
let completedTasks = [];
const filterData = (data) => {
    notCompletedTasks = data.filter(element => element.completed === false)
    completedTasks = data.filter(element => element.completed === true)
    render(wrapper[0], notCompletedTasks)
    render(wrapper[1], completedTasks)
    return notCompletedTasks, completedTasks
}

//---------form add

const form = document.querySelector(".add-form")

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newTask = {
        "id": `${tasks.length + 1}`,
        "title": `${form.firstElementChild.value}`,
        "completed": false
    }
    const addTask = () => {
        tasks.push(newTask)
        sorting(orderElement[0], tasks)
        form.firstElementChild.value = "";
    }
    form.firstElementChild.setAttribute("placeholder",`Hai aggiunto: ${form.firstElementChild.value }`)
    addTask()
});
//--------------------------------------order

import { sorting } from "./sorting.js";

const orderElement = document.querySelectorAll("select")

function order(array) {
    orderElement[0].value = orderElement[1].value = "dataD"
    orderElement.forEach(select => select.addEventListener('change', (e) => {
        let x = 0;
        let y = 1;
        if (e.target.parentElement.parentElement.classList.contains("completed")) x = 1, y = 0; 
        orderElement[y].value = orderElement[x].value

        sorting(select, array)
    }))
}

//--------------------------------------resize

let height = window.innerHeight / 100 * 90;
main.style.height = `${height}px`
window.addEventListener('resize', () => {
    height = window.innerHeight / 100 * 90;
    main.style.height = `${height}px`
});

//-------------------------------------init
let tasks = JSON.parse(localStorage.getItem("data")) || [];

const getList = async () => {
    const res = await fetch(API)
    const data = await res.json();
    tasks = data
    filterData(tasks)
    order(tasks)
    localStorage.setItem("data",JSON.stringify(tasks))
}
if (tasks.length < 1) getList()
else{filterData(tasks)
    order(tasks)}
    
    
    
export { filterData, tasks, main}