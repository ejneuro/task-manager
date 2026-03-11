/* JAVASCRIPT STRUCTURE */

let tasks = [];

// Load tasks when page starts
window.onload = function(){

const saved = localStorage.getItem("tasks");
 
 
if(saved){
tasks = JSON.parse(saved);

const now = new Date().toISOString().split('.')[0].slice(0, 16);

document.getElementById("taskDeadline").setAttribute('min', now);
};

displayTasks();

setInterval(updateCountdowns,1000);

const themebtn = document.getElementById('theme-toggle');

const theme = localStorage.getItem('theme');

if(theme==='dark'){
  themebtn.innerHTML="☀️";
}
else{
  themebtn.innerHTML="🌙";
  return;
};
};

// Add new task
function addTask(){

const title = document.getElementById("taskTitle").value;
const deadline = document.getElementById("taskDeadline").value;

if(title === "" || deadline === ""){
alert("Please fill all fields")
return
}

const task = {
id: Date.now(),
title: title,
deadline: deadline,
completed:false
};

tasks.push(task);

localStorage.setItem("tasks",JSON.stringify(tasks));

displayTasks();

};

// Display tasks
function displayTasks(){

const container = document.getElementById("taskContainer")
container.innerHTML="";

tasks.forEach(task =>{

const card = document.createElement("div");
card.className="taskCard";

card.innerHTML = `
  <h3>${task.title}</h3>
  <p id="time-${task.id}">Loading...</p>
  <button id="complete"onclick="completeTask(${task.id})">Complete</button>
  <button id="delete" onclick="deleteTask(${task.id})">Delete</button>
`;

container.appendChild(card);

});

};

function updateCountdowns(){

const now = new Date().getTime()

tasks.forEach(task =>{

const deadline = new Date(task.deadline).getTime();

const diff = deadline - now;

const element = document.getElementById(`time-${task.id}`);

if(!element) return

if(deadline <= now){
  element.innerText="Time expired !";
  return;
};

const days = Math.floor(diff / (1000*60*60*24));
const hours = Math.floor((diff/(1000*60*60) %24));
const minutes = Math.floor((diff/(1000*60) % 60));
const seconds = Math.floor((diff/(1000)% 60));

const complete = task.completed == true;
if(complete){
  element.innerText = "Task completed ✅";
}
else{
Days = days.toString().padStart(2,'0');
Hours = hours.toString().padStart(2,'0');
Minutes = minutes.toString().padStart(2,'0');
Seconds = seconds.toString().padStart(2,'0');

element.innerText = `${Days}d ${Hours}h ${Minutes}m ${Seconds}s`;}

});

};

// Delete task
function deleteTask(id){

tasks = tasks.filter(task => task.id !== id);

localStorage.setItem("tasks",JSON.stringify(tasks));

displayTasks();

};

// Complete task
function completeTask(id){

tasks = tasks.map(task =>{
if(task.id === id){
task.completed = true;
}
return task;
})

localStorage.setItem("tasks",JSON.stringify(tasks));
};


const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// 1. Initial Load: Check localStorage or System Preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
htmlElement.setAttribute('data-theme', initialTheme);

// 2. Toggle Functionality
themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  if(currentTheme==='dark'){
  themeToggle.innerHTML="🌙";
    
  }
  else{
    themeToggle.innerHTML="☀️";
  }
  
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
