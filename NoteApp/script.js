const deleteButon = document.querySelector('#btnDelete')
const saveButon = document.querySelector('#btnSave');
let titleInput = document.querySelector('#title');
let descriptionInput = document.querySelector('#description');
const notesContainer = document.querySelector('#notes__container');

function clearForm() {
    titleInput.value = '';
    descriptionInput.value = '';
    deleteButon.classList.add('hidden');
}
function populateForm(id) {
    getNoteById(id);
}
function displayNoteInForm(note) {
    titleInput.value = note.title;
    descriptionInput.value = note.description;
    deleteButon.classList.remove("hidden")
    deleteButon.setAttribute('data-id', note.id)
    saveButon.setAttribute('data-id', note.id)
}
function getNoteById(id) {
    fetch(`https://localhost:7068/api/Notes/${id}`)
        .then(data => data.json())
        .then(response => displayNoteInForm(response));
}
function addNote(title, description) {
    const body = {
        title: title,
        description: description,
        isVisible: true
    };

    fetch("https://localhost:7068/api/notes", {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(data => data.json())
        .then(response => {
            clearForm();
            getAllNotes();
        })
}
function updateNote(id,title,description){
    const body = {
        title: title,
        description: description,
        isVisible: true
    };
    fetch( `https://localhost:7068/api/notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
        .then(data => data.json())
        .then(response => {
            clearForm();
            getAllNotes();
        })

}
function deleteNote(id) {

    fetch(`https://localhost:7068/api/notes/${id}`,{
        method: 'DELETE',
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => {
            console.log(response);
            getAllNotes();
            clearForm();
        })

}
function showNotes(notes) {

    let allNotes = '';

    notes.forEach(note => {
        const noteElement = `   <div class="note" data-id="${note.id}" >
                                <h3>${note.title}</h3>
                                <p>${note.description}</p>
                                </div>
                                `;
        allNotes += noteElement;

    });
    notesContainer.innerHTML = allNotes;

    document.querySelectorAll(".note").forEach(note => {
        note.addEventListener('click', function () {
            populateForm(note.dataset.id);
        }
        );

    });
}
function getAllNotes() {
    fetch('https://localhost:7068/api/Notes')
        .then(data => data.json())
        .then(response => showNotes(response));
}

getAllNotes();
saveButon.addEventListener('click', function () {
    const id = saveButon.dataset.id;
    if (id) {
        updateNote(id, titleInput.value, descriptionInput.value);

    } else {
        addNote(titleInput.value, descriptionInput.value);  
    }
});

deleteButon.addEventListener('click', function () {
    const id = deleteButon.dataset.id;
    deleteNote(id);
})
