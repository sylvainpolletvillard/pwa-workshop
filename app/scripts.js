const API_ROOT = "https://reqres.in/api/";
const api = name => API_ROOT + name;
let nbAttendees = 10, nbMaxAttendees = 30;

function fetchAttendees(){
	return fetch(api(`users?per_page=${nbAttendees}`))
		.then(res => res.json())
		.then(res => res.data || [])
}

function refreshAttendees(){
	const section = document.getElementById("attendees");
	section.innerHTML = `<h1>Attendees</h1><p>Loading the attendees list...</p>`
	return fetchAttendees().then(users => {
		section.innerHTML = `
		<h1>Attendees: ${nbAttendees} / ${nbMaxAttendees}</h1>
		${users.map(user =>  `
		<li class='card'>
			<img src="${user.avatar}" alt="Avatar" class="avatar">
			<p>
				<span class="firstname">${user.first_name}</span>
				<br>
				<span class="lastname">${user.last_name}</span>
			</p>
		</li>
		`).join('')}`
		updateRegisterForm();
	})
}

function updateRegisterForm(){
	const section = document.getElementById("register");
	const isFull = (nbAttendees >= nbMaxAttendees);
	section.querySelectorAll("input, button").forEach(elm => { elm.disabled = isFull });
	section.querySelector(".status").innerHTML = isFull
		? `Sorry, this event is full.`
		: `Some places are still available for you to register for this event.`
}

document.addEventListener("DOMContentLoaded", () => {
	refreshAttendees();
});