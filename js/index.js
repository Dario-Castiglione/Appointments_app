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


main.addEventListener("click", (e)=>{
    let isCompleted = "";
    if (e.target.type==="checkbox") {  

        
    }
})

/*
const newArray = array.map( (element) => {     
   `<div class="task">
    <p>${element.title}</p>
    <input type="checkbox" id="${element.id}">
    </div>`
 
})*/

//------------------------------------------------------------GET PRODUCT
const render = (container, array) =>{
    function display(){
        container.innerHTML= newArray
    }

    const newArray = array
    .map(
      (element) =>   `<div class="task">
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
    return notCompletedTasks , completedTasks
}

let tasks = []
export let API = "https://jsonplaceholder.typicode.com/todos"
const getList = async () => {
    const res = await fetch(API)
    const data = await res.json();
    tasks = data
    filterData(tasks) 
    order(tasks)
}
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
    const addTask = () => {
     tasks.push(newTask)
     sorting(orderElement[0],tasks)
     form.firstElementChild.value="";
    }    
    
    addTask()
    
});
//--------------------------------------order
function orderByName(a, b) {
    if (a.title < b.title) {
        return -1
    }
    if (a.title > b.title) {
        return 1;
    }
    return 0;
}
function orderById(a, b) {
    if (a.id < b.id) {
        return -1
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0;
}
function orderByIdRev(a, b) {
    if (b.id < a.id) {
        return -1
    }
    if (b.id > a.id) {
        return 1;
    }
    return 0;
}
function sorting(orderElement,array){
    switch (orderElement.value) {
        case  "alfabetico":
            array.sort(orderByName)
                break;
        case  "dataC":
            array.sort(orderById)
                break;        
        case  "dataD":
            array.sort(orderByIdRev)
                break;        
            default:
                break;
        }
        filterData(tasks)
}
const orderElement = document.querySelectorAll("select")
function order(array){
      
    orderElement.forEach(select => select.addEventListener('change', (e) => {
        console.log("ciao")
        sorting(select,array)
    }))
}

//--------------------------------------resize

let height = window.innerHeight /100 * 90;
main.style.height=`${height}px`
window.addEventListener('resize', () => {
    height = window.innerHeight /100 * 90;
    main.style.height=`${height}px`
  });


