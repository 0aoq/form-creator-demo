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
    formView.innerHTML = "" // clear form view

    // render the inputs for the form
    for (let input of form.inputs) {
        formView.insertAdjacentHTML("beforeend", `<div class="card w-full">
        <div class="header flex gap-2 w-full" style="justify-content: space-between;">
            <div class="grid place-items-center">
                <h4 style="margin: 0;" class="font-normal" id="${input.id}__name">${input.name}</h4>
            </div>

            <div class="flex gap-2">
                <!-- form options -->
                <button class="btn__open" id="form:${form.id},input:${input.id}" style="width: 10rem;">Edit</button>
                <button class="btn__open w-16" onclick="">Delete</button>
            </div>
        </div>
    </div>`)

        // link button
        document.getElementById(`form:${form.id},input:${input.id}`).addEventListener("click", () => {
            const newInfo = editInputModal()
            let oldInput = input

            // check if empty strings
            if (newInfo.name === "" || newInfo.name === null) { newInfo.name = input.name }
            if (newInfo.type === "" || newInfo.type === null) { newInfo.type = input.type }
            if (newInfo.placeholder === "" || newInfo.placeholder === null) { input.placeholder = newInfo.placeholder }

            // rerender
            document.getElementById(`${input.id}__name`).innerText = newInfo.name

            // change json values for input
            newInfo.id = input.id // id is not changed
            form.inputs[form.inputs.indexOf(oldInput)] = newInfo
            forms[forms.indexOf(form)] = form // update form

            setTimeout(() => {
                // wait 100ms to reload the page because we need to wait for the local storage to update
                window.location.reload()
            }, 100);
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
    const pgs = 3

    alert(`[🛑] Welcome to the edit input modal! \n\n This modal will guide you through the process of editting an existing input. \n\n You will be asked to fill out a few questions to get started. \n\n Press OK to continue.`)

    // input name
    const inputName = prompt(`[1/${pgs}] What is the name of the input?`)
    input.name = inputName

    // input type
    const inputType = prompt(`[2/${pgs}] What is the type of the input?`)
    input.type = inputType

    // input placeholder
    const inputPlaceholder = prompt(`[3/${pgs}] what is the placeholder if the input`)
    input.placeholder = inputPlaceholder

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
newInputButton.style.display = "none" // hide new input button until form is created

newFormButton.addEventListener("click", (e) => {
    e.preventDefault()

    let form = {
        title: "",
        id: "",
        inputs: []
    }

    form = newFormModal() // get form data from user
    form.inputs = [] // initialize inputs array

    // add form to forms array
    forms.push(form)
    window.location.reload()
})

newInputButton.addEventListener("click", () => {
    let form = window._form
    const inputs = addInputs(form)
    form.inputs = inputs
    renderInputs(form)
})

// interval
setTimeout(() => {
    if (window.localStorage.getItem("forms") !== "null" || window.localStorage.getItem("forms") !== null) {
        forms = JSON.parse(window.localStorage.getItem("forms")) || [] // set forms to the saved variable
    }
}, 100)

setInterval(() => {
    // update the localStorage to make sure the forms variable is correct
    if (!window.localStorage.getItem("currentFormI")) {
        window.localStorage.setItem("currentFormI", 0)
    }

    window.localStorage.setItem("forms", JSON.stringify(forms))
    window._form = forms[window.localStorage.getItem("currentFormI")]
}, 100)

// load forms
setTimeout(() => {
    // on first load of page
    forms.forEach((form) => {
        const formNumber = forms.indexOf(form)
        document.getElementById('forms').insertAdjacentHTML("beforeend", `<div class="card w-full">
        <div class="header flex gap-2 w-full" style="justify-content: space-between;">
            <div class="grid place-items-center">
                <h4 style="margin: 0;" class="font-normal" id="${form.id}__name">${form.title}</h4>
            </div>

            <div class="flex gap-2">
                <!-- form options -->
                <button class="btn__open" onclick="setForm(${formNumber})" style="width: 10rem;">Edit</button>
                <button class="btn__open w-16" onclick="deleteForm(${formNumber})">Delete</button>
                <button class="btn__open w-16" onclick="copyForm(${formNumber})">Copy</button>
            </div>
        </div>
    </div>`)

        if (formNumber === parseFloat(window.localStorage.getItem("currentFormI"))) { // get the number of the current form
            newInputButton.style.display = "block" // show new input button because a form is open
            renderInputs(form) // this is the current form, so load its inputs onto the page
        }
    })
}, 100);

function setForm(number) {
    // set the current form number and refresh the page
    window.localStorage.setItem('currentFormI', number)
    window.location.reload()
}

function deleteForm(number) {
    // delete the form from the forms array and refresh the page
    forms.splice(number, 1)

    setTimeout(() => {
        window.location.reload()
    }, 100);
}

function copyForm(number) {
    // blur the body to show that the form is being copied
    document.body.style.filter = "blur(5px)"

    // get the form and generate an html form from it
    const form = forms[number]
    let html = `<form id="${form.id}">\n`
    let js = `<script>\ndocument.querySelector("form#${form.id}").addEventListener("submit", (e) => {
    e.preventDefault()
    
    `

    form.inputs.forEach((input) => {
        html += `   <input type="${input.type}" id="form:${form.id},input:${input.id}" name="${input.name}" placeholder="${input.placeholder}">\n`
        js += `    const ${input.name} = e.target.${input.name}\n   ${input.name}.value\n\n`
    })

    setTimeout(() => {
        html += `   <button>Submit</button>
</form>\n\n`
        js += ` })\n</script>`

        // copy the html to the clipboard using navigator.clipboard
        navigator.clipboard.writeText(html + js) // write the html and js to the clipboard
        alert(`[✅] The form has been copied to your clipboard!`)

        // remove the blur
        document.body.style.filter = ""
    }, 10);
}

function deleteInput(formid, inputid) {
    // delete input based on formid and inputid
    let _form = forms[formid]

    if (_form) {
        _form.inputs.splice(inputid, 1)
        forms[formid] = _form
    }
}