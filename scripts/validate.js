/**
 * @author Susan Kronberg
 * @version 1
 *
 * This file is for the assignment "Validation av formulär" for the course
 * Webbdesign med JavaScript och Document Object Model, 7.5 hp
 * at Umeå University
 *
 */

/**
 * Alla fält i avdelningen ”Kontaktuppgifter” måste fyllas i av användaren.
  E-postadressen måste vara korrekt formaterad. 
  Att skicka ett meddelande ska vara frivilligt. 
  Om ett meddelande emellertid skickas ska innehållet kontrolleras så att det innehåller maximalt 200 tecken.
  Om användaren har valt ”Föreläsning” eller ”Seminarium” som presentationstyp 
  måste även fältet ”Titel på föreläsning/seminarium” vara ifyllt. 
 */

// get dom objects for the form and its input
const form = document.getElementById("registration_form");
const firstname = document.getElementById("field_firstname");
const lastname = document.getElementById("field_lastname");
const email = document.getElementById("field_email");
const org = document.getElementById("field_organisation");
const lecture = document.getElementById("pres_type_1");
const seminar = document.getElementById("pres_type_2");
const discussion = document.getElementById("pres_type_3");
const presTitle = document.getElementById("field_pres_title");
const textMsg = document.getElementById("field_message");

const inputs = [
	firstname,
	lastname,
	email,
	org,
	lecture,
	seminar,
	discussion,
	presTitle,
	textMsg,
];

// regex for email validation
var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;

/**
 * Appends a sibling element to parameter p meant for displaying error messages
 * @param {*} p - parameter to append error message object to
 * @returns created error message object
 */
const createErrorMsgElem = (p) => {
	console.log(p);
	let errormessage = document.createElement("p");
	errormessage.style.color = "red";
	p.parentElement.appendChild(errormessage);
	return errormessage;
};

/**
 * show the correspondning error mesage to given element
 * @param {*} elem - element to show error message to
 */
const showErrorMsg = (elem) => {
	let errorMsg = elem.nextElementSibling;
	errorMsg.style.visibility = "visible";
};

/**
 * Hide the correspondning error mesage to given element
 * @param {*} elem - element to hide error message to
 */
const hideErrorMsg = (elem) => {
	let errorMsg = elem.nextElementSibling;
	errorMsg.style.visibility = "hidden";
};

/**
 * Boolean operation to know if an elements error message is visible or not.
 * @param {} elem - Elements error messge to check
 * @returns true if error message is visible, else false.
 */
const errorMsgIsVisible = (elem) => {
	let errorMsg = elem.nextElementSibling;
	if (errorMsg.style.visibility === "visible") {
		return true;
	}
	return false;
};

// inputs 0-3 are the required contact information. Add p tag for each to write out error mesages.
for (let i = 0; i < 4; i++) {
	let errormessage = createErrorMsgElem(inputs[i]);
	var text;

	// firstname field
	if (i === 0) {
		text = document.createTextNode("Vänligen fyll i ditt förnamn");
	}

	// lastname field
	if (i === 1) {
		text = document.createTextNode("Vänligen fyll i ditt efternamn");
	}

	// email field
	if (i === 2) {
		text = document.createTextNode("Vänligen fyll i en giltig email adress");
	}

	// organisation field
	if (i === 3) {
		text = document.createTextNode("Vänligen fyll i din organisation");
	}

	errormessage.appendChild(text);
	// hide error message on start
	errormessage.style.visibility = "hidden";
}

// inputs 7-8 are the event titles and optional text message. Add p tag for each to write out error mesages.
for (let i = 7; i <= 8; i++) {
	let errormessage = createErrorMsgElem(inputs[i]);
	let text;
	if (i === 7) {
		text = document.createTextNode("Vänligen fyll i ett namn för eventet.");
	}
	if (i === 8) {
		text = document.createTextNode("Meddelandet är över 200 tecken");
	}

	errormessage.appendChild(text);
	// hide error message on start
	errormessage.style.visibility = "hidden";
}

/**
 * Performs validation on submit:
 * 	All contact info must be filled in, and email adress must have the correct format.
 * 	If a seminar or lecture was chosen, it must have a title.
 * 	Optional text message must be below 200 chars long.
 *
 * On invalid inputs, an error message is displayed.
 * When all input fields are valid, submit form.
 */
form.addEventListener("submit", (e) => {
	let errors = 0;

	// contact info validation
	if (firstname.value === "") {
		showErrorMsg(firstname);
		errors++;
	} else {
		hideErrorMsg(firstname);
		errors--;
	}

	if (lastname.value === "") {
		showErrorMsg(lastname);
		errors++;
	} else {
		hideErrorMsg(lastname);
		errors--;
	}

	if (pattern.test(email.value)) {
		showErrorMsg(email);
		errors++;
	} else {
		hideErrorMsg(email);
		errors--;
	}

	if (org.value === "") {
		showErrorMsg(org);
		errors++;
	} else {
		hideErrorMsg(org);
		errors--;
	}

	//event type validation
	if (lecture.checked || seminar.checked) {
		if (presTitle.value === "") {
			showErrorMsg(presTitle);
			errors++;
		} else {
			hideErrorMsg(presTitle);
			errors--;
		}
	} else {
		hideErrorMsg(presTitle);
		errors--;
	}

	// text message validation
	if (textMsg.value.length > 200) {
		showErrorMsg(textMsg);
		errors++;
	} else {
		hideErrorMsg(textMsg);
		errors--;
	}

	console.log(errors);
	// om errors är -6 så är alla fält korrekt ifyllda.
	if (errors !== -6) {
		e.preventDefault();
	}
});

/**
 * For better UX:
 * 	If an error message has been displayed, remove said error message when validation criteria is met
 *  so the user knows the input is valid.
 */

firstname.addEventListener("keypress", (e) => {
	//check that error message is visible
	let text = firstname.value + e.key;
	if (errorMsgIsVisible(firstname)) {
		if (text.length > 0) {
			hideErrorMsg(firstname);
		}
	}
});

lastname.addEventListener("keypress", (e) => {
	//check that error message is visible
	let text = lastname.value + e.key;
	if (errorMsgIsVisible(lastname)) {
		if (text.length > 0) {
			hideErrorMsg(lastname);
		}
	}
});

email.addEventListener("keypress", (e) => {
	//check that error message is visible
	let text = email.value + e.key;
	if (errorMsgIsVisible(email)) {
		if (pattern.test(text)) {
			hideErrorMsg(email);
		}
	}
});

org.addEventListener("keypress", (e) => {
	//check that error message is visible
	let text = org.value + e.key;
	if (errorMsgIsVisible(org)) {
		if (text.length > 0) {
			hideErrorMsg(org);
		}
	}
});

presTitle.addEventListener("keypress", (e) => {
	let text = presTitle.value + e.key;
	if (errorMsgIsVisible(presTitle)) {
		if (text.length > 0) {
			hideErrorMsg(presTitle);
		}
	}
});

textMsg.addEventListener("keydown", (e) => {
	let text;
	if (e.key !== "Backspace") {
		text = textMsg.value + e.key;
	} else {
		text = textMsg.value;
	}

	// dynamic validation for text messages length
	if (text.length > 200) {
		showErrorMsg(textMsg);
	}

	if (errorMsgIsVisible(textMsg)) {
		if (text.length <= 200) {
			hideErrorMsg(textMsg);
		}
	}
});
