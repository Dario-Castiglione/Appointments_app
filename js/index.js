//------------------------------------open
const card = document.querySelectorAll(".card")
const titleCard = document.querySelectorAll(".title-card")
const main = document.querySelector("main")
const wrapper = document.querySelectorAll(".wrapper")


const cardDown = []
cardDown.push(...titleCard)
cardDown.forEach(element => {
    element.addEventListener("click", (event) => {
        let cardOpen = document.querySelector(".card-opened")
        if (cardOpen != null) cardOpen.classList.remove("card-opened")
        event.currentTarget.parentElement.classList.toggle("card-opened")
    })
})



export let API = "https://jsonplaceholder.typicode.com/todos"


//------------------------------------------check product
let isgoing = false
main.addEventListener("click", (e) => {
    if (e.target.type === "checkbox" && isgoing === false) {
        console.log(e.target.parentElement)
        isgoing = true
        e.target.parentElement.style.backgroundPosition="top left"
        const checkedEl = tasks.find(element => element.id == e.target.id)
        if (checkedEl.completed === true) checkedEl.completed = false;
        else{ checkedEl.completed = true}
        setTimeout(() => {
            filterData(tasks)
            isgoing = false
        }, 1000);
    }
})
//------------------------------------------------------------GET PRODUCT
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
const filterData = (data) => {
    let notCompletedTasks = data.filter(element => element.completed === false)
    let completedTasks = data.filter(element => element.completed === true)
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
    addTask()
});
//--------------------------------------order

import { sorting } from "./sorting.js";
const orderElement = document.querySelectorAll("select")

function order(array) {
    orderElement.forEach(select => select.addEventListener('change', (e) => {
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

export { filterData, tasks }

//-------------------------------------init
let tasks = JSON.parse(localStorage.getItem("data")) || [];
console.log(tasks)
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