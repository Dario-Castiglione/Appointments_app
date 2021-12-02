const titleCard = document.querySelectorAll(".title-card");
const main = document.querySelector("main");
const wrapper = document.querySelectorAll(".wrapper");

export let API = "https://jsonplaceholder.typicode.com/todos";

//------------------------------------open card

titleCard.forEach(element => {
    element.addEventListener("click", (event) => {
        let cardOpen = document.querySelector(".card-opened");
        cardOpen != null && cardOpen.classList.remove("card-opened");
        event.currentTarget.parentElement.classList.toggle("card-opened");
    })
})

//------------------------------------------check product

import { checker } from "./checker.js";
checker();

//------------------------------------------------------------RENDER

const render = (container, array) => {
    localStorage.setItem("data", JSON.stringify(tasks));
    
    const newArray = array
        .map((element) => 
            `<div class="task">
                <p>${element.title}</p>
                <div class="input">
                    <span>${element.date}</span>
                    <input type="checkbox" ${element.completed ? "checked" : ""} id="${element.id}">
                </div>
            </div>`).join("");

    container.innerHTML = newArray;
}

//--------------------------------------------------filter

const filterData = (data) => {

    let notCompletedTasks = data.filter(element => element.completed === false);
    let completedTasks = data.filter(element => element.completed === true);
    render(wrapper[0], notCompletedTasks);
    render(wrapper[1], completedTasks);
}

//---------form add

const form = document.querySelector(".add-form");
const date = document.querySelector("form input");

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (form.firstElementChild.value != false &&
        date.value != false) {

        const newTask = {
            "id": `${tasks.length + 1}`,
            "title": `${form.firstElementChild.value}`,
            "completed": false,
            "date": date.value
        }
        form.firstElementChild.setAttribute("placeholder", `Hai aggiunto: ${form.firstElementChild.value }`);
        tasks.push(newTask);
        sorting(orderElement[0], tasks);
        form.firstElementChild.value = date.value = "";
    }
});

//--------------------------------------order

import { sorting } from "./sorting.js";
const orderElement = document.querySelectorAll("select");

function order(array) {

    orderElement.forEach(select => select.addEventListener('change', (e) => {
        let x = 0;
        let y = 1;
        if (e.target.parentElement.parentElement.classList.contains("completed")) x = 1, y = 0;
        orderElement[y].value = orderElement[x].value;
        sorting(select, array);
    }))
}

//-----------------------------------SET RANDOM DATE

function setRandomDate(tasks) {

    tasks.map(element => {element.date = `2021-12-${Math.floor(Math.random() * 10) + 10}`});
    sorting(orderElement[0],tasks);
    order(tasks);
    localStorage.setItem("data", JSON.stringify(tasks));
}

//-------------------------------------init

let tasks = JSON.parse(localStorage.getItem("data")) || [];
orderElement[0].value = orderElement[1].value = "dataC";

const getList = async () => {
    const res = await fetch(API);
    const data = await res.json();
    tasks = data;
    setRandomDate(tasks);
}
if (tasks.length < 1) getList();
else {  
    sorting(orderElement[0],tasks);
    order(tasks);
}
export { filterData, tasks, main }
//--------------------------------------resize

let height = window.innerHeight / 100 * 90;
main.style.height = `${height}px`
window.addEventListener('resize', () => {
    height = window.innerHeight / 100 * 90;
    main.style.height = `${height}px`
});
