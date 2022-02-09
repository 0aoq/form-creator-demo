let forms = []

// handle modals

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

newFormButton.addEventListener("click", (e) => {
    e.preventDefault()

    let form = {
        title: "",
        id: "",
        inputs: []
    }

    form = newFormModal() // get form data from user
    form.inputs = [] // initialize inputs array

    // keep prompting the user to add inputs until they cancel the prompt, and add each input to form.inputs
    const doAddInputs = confirm(`[🛑] You have created a new form! \n\n Do you want to add inputs to your form? \n\n Press OK to continue. \n\n Press Cancel to finish adding at any time.`)

    if (doAddInputs) {
        while (true) {
            const input = newInputModal( /* form.id, form.inputs.length */ ) // get input data from user
            if (input.id === null) { break } // user cancelled input creation
            form.inputs.push(input) // add input to form
        }
    }

    // add form to forms array
    forms.push(form)
})