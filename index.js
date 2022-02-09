const formView = document.getElementById("formview")
let forms = []

function generateInputError(name) {
    return `[🛑] You must enter an input ${name}. Aborted process.`
}

// inputs
function addInputs(form) {
    while (true) {
        const input = newInputModal( /* form.id, form.inputs.length */ ) // get input data from user
        if (input.id === null) { break } // user cancelled input creation
        form.inputs.push(input) // add input to form
    }

    return form.inputs
}

function renderInputs(form) {
     // render the inputs for the form
     for (let input of form.inputs) {
        formView.insertAdjacentHTML("beforeend", `<div class="card w-full">
        <div class="header flex gap-2 w-full" style="justify-content: space-between;">
            <div class="grid place-items-center">
                <h4 style="margin: 0;" class="font-normal" id="${input.id}__name">${input.name}</h4>
            </div>

            <button class="btn__open w-60" id="form:${form.id},input:${input.id}">Open Options</button>
        </div>
    </div>`)

        // link button
        document.getElementById(`form:${form.id},input:${input.id}`).addEventListener("click", () => {
            const newInfo = editInputModal()
            let oldInput = input

            // check if empty strings
            if (newInfo.name === "") { input.name = newInfo.name }
            if (newInfo.type === "") { input.type = newInfo.type }
            // if (newInfo.id === "") { input.id = newInfo.id }
            if (newInfo.placeholder === "") { input.placeholder = newInfo.placeholder }

            // rerender
            document.getElementById(`${input.id}__name`).innerText = newInfo.name
            // document.getElementById(`${input.id}__name`).id = `${newInput.id}__name`

            // change json values for input
            forms.inputs[forms.inputs.indexOf(oldInput)] = newInfo
        })
   }
}

// handle modals

function editInputModal() {
    let input = {
        name: "",
        type: "",
        id: "",
        placeholder: ""
    }

    // edit each piece of input information, leave blank to not edit the information
    const pgs = 4

    alert(`[🛑] Welcome to the edit input modal! \n\n This modal will guide you through the process of editting an existing input. \n\n You will be asked to fill out a few questions to get started. \n\n Press OK to continue.`)

    // input name
    const inputName = prompt(`[1/${pgs}] What is the name of the input?`)
    if (inputName === null || inputName === "") { return input.name = "" }
    else { input.name = inputName }
    
    // input type
    const inputType = prompt(`[2/${pgs}] What is the type of the input?`)
    if (inputType === null || inputType === "") { return input.type = "" }
    else { input.type = inputType }

    // input id
    /* const inputid = prompt(`[3/${pgs}] What is the ID of the input?`)
    if (inputid === null || inputid === "") { return input.id = "" }
    else { input.id = inputid } */

    // input placeholder
    const inputPlaceholder = prompt(`[4/${pgs}] what is the placeholder if the input`)
    if (inputPlaceholder === null || inputPlaceholder === "") { return input.placeholder = "" }
    else { input.placeholder = inputPlaceholder }

    // return
    return input
}

function newFormModal() {
    // using native browser js to create a generic modal (alert, confirm, prompt)

    const pgs = 2

    alert(`[🛑] Welcome to the new form modal! \n\n This modal will guide you through the process of creating a new form. \n\n You will be asked to fill out a few questions to get started. \n\n Press OK to continue.`)

    const formName = prompt(`[1/${pgs}] What is the name of your form?`)
    if (formName === null || formName === "") { return null, alert(`[🛑] You must enter a form name. Aborted process.`) }
    const formId = prompt(`[2/${pgs}] What is the ID of your form?`)
    if (formId === null || formId === "") { return null, alert(`[🛑] You must enter a form ID. Aborted process.`) }

    alert(`[✅] Your form has been created! \n\n You can now add questions to your form. \n\n Press OK to continue.`)

    const form = {
        title: formName,
        id: formId,
    }

    return form
}

function newInputModal(formid, id) {
    // return HTML for a new input field with id of "form:{formid},input:{id}"
    // using native browser js to create a generic modal (alert, confirm, prompt)

    const pgs = 4
    let cancelled = false

    let inputType = null
    let inputId = null
    let inputPlaceholder = null

    alert(`[🛑] Welcome to the new input modal! \n\n This modal will guide you through the process of creating a new input. \n\n You will be asked to fill out a few questions to get started. \n\n Press OK to continue.`)

    const inputName = prompt(`[1/${pgs}] What is the name of your input? Use "CANCEL" to exit process.`)
    if (inputName === null || inputName === "") { return null, alert(`[🛑] You must enter an input name. Aborted process.`) }
    if (inputName === "CANCEL") { cancelled = true } // set cancelled to true if user cancelled process
    if (!cancelled) {
        inputType = prompt(`[2/${pgs}] What is the type of your input?`)
        if (inputType === null || inputType === "") { return null, alert(`[🛑] You must enter an input type. Aborted process.`) }

        inputId = prompt(`[3/${pgs}] What is the ID of your input?`)
        if (inputId === null || inputId === "") { return null, alert(`[🛑] You must enter an input ID. Aborted process.`) }

        inputPlaceholder = prompt(`[3/${pgs}] What is the placeholder value of your input?`)
        if (inputPlaceholder === null || inputPlaceholder === "") { return null, alert(`[🛑] You must enter an input placeholder. Aborted process.`) }

        alert(`[✅] Your input has been created! \n\n You can now add options to your input. \n\n Press OK to continue.`)
    }

    const input = {
        name: inputName,
        type: inputType,
        id: inputId,
        placeholder: inputPlaceholder,
    }

    // `<input type="${input.type}" id="form:${formid},input:${input.id}" name="${input.name}" placeholder="${input.placeholder}">`
    return input
}

// handle new form creation
const newFormButton = document.getElementById("newform")
const newInputButton = document.getElementById("addinput")

newFormButton.addEventListener("click", (e) => {
    e.preventDefault()

    let form = {
        title: "",
        id: "",
        inputs: []
    }

    form = newFormModal() // get form data from user
    form.inputs = [] // initialize inputs array

    window._form = form // if there is only one form we'll just do this, multiple forms coming soon

    /* // keep prompting the user to add inputs until they cancel the prompt, and add each input to form.inputs
    const doAddInputs = confirm(`[🛑] You have created a new form! \n\n Do you want to add inputs to your form? \n\n Press OK to continue. \n\n Press Cancel to finish adding at any time.`)

    if (doAddInputs) {
        form.inputs = addInputs(form)
    } */

    // add form to forms array
    forms.push(form)
})

newInputButton.addEventListener("click", () => {
    let form = window._form
    let oldForm = form

    const inputs = addInputs(form)
    /* for (let newInput of inputs) {
        // if (inputs.indexOf(newInput) === inputs[inputs.length - 1]) { break } // if it is the final object
        form.inputs.push(newInput)
    } */

    form.inputs = inputs

    renderInputs(form)
    forms[forms.indexOf(oldForm)] = form
    window._form = form // to be removed
})

// interval
setInterval(() => {
    if (!window.localStorage.getItem("currentFormI")) {
        window.localStorage.setItem("currentFormI", 0)
    }

    if (window.localStorage.getItem("forms")) {
        if (JSON.parse((window.localStorage.getItem('forms'))).length >= 20) {
            window.localStorage.removeItem("forms")
        }

        forms = window.localStorage.getItem("forms")
    }

    window.localStorage.setItem("forms", JSON.stringify(forms))
    window._form = forms[window.localStorage.getItem("currentFormI")]
}, 100)

// load forms
for (let form in JSON.parse(window.localStorage.getItem("forms"))) {
    const formNumber = form
    form = JSON.parse(window.localStorage.getItem("forms"))[form]
    document.getElementById('forms').insertAdjacentHTML("beforeend", `<div class="card w-full">
    <div class="header flex gap-2 w-full" style="justify-content: space-between;">
        <div class="grid place-items-center">
            <h4 style="margin: 0;" class="font-normal" id="${form.id}__name">${form.title}</h4>
        </div>

        <button class="btn__open w-60" id="form:${form.id}" onclick="setForm(${formNumber})">Edit Form</button>
    </div>
</div>`)
}

function setForm(number) {
    // set the current form number and refresh the page
    window.localStorage.setItem('currentFormI', number)
    window.location.reload()
}