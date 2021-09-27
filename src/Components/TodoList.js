import axios from "axios";
const apiUrl = "http://localhost:8080/";

export function getTasks() {
    const data= axios.get(apiUrl + "getTasks");
    console.log(typeof(data))
    return data
}

export function addTask(task) {
    return axios.post(apiUrl+"addTasks", task);
}
export function updateTask(id, task) {
    return axios.put(apiUrl+"updateTask" + "/" + id, task);
}

export function deleteTask(id) {
    return axios.delete(apiUrl + "deleteTasks"+ "/"+ id);
}