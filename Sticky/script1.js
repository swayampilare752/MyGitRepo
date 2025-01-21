// Selectors
const textarea = document.getElementById("textarea");
const noteColor = document.getElementById("noteColor");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesSection = document.getElementById("notesSection");
const noNotesMessage = document.getElementById("noNotesMessage");

// Event Listener: Add Note
addNoteBtn.addEventListener("click", () => {
    const text = textarea.value.trim();
    const color = noteColor.value;

    if (text === "") {
        alert("Note cannot be empty!");
        return;
    }

    // Create Note Element
    const note = document.createElement("div");
    note.className = "note animate__animated animate__fadeIn";
    note.style.backgroundColor = color;

    // Editable Text Area
    const noteText = document.createElement("textarea");
    noteText.value = text;
    noteText.readOnly = false;

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "&#x2716;";
    deleteBtn.addEventListener("click", () => {
        notesSection.removeChild(note);
        if (notesSection.children.length === 0) {
            noNotesMessage.style.display = "block";
        }
    });

    // Append Elements to Note
    note.appendChild(noteText);
    note.appendChild(deleteBtn);

    // Add Note to Notes Section
    notesSection.appendChild(note);

    // Reset Input and Show Notes Section
    textarea.value = "";
    noNotesMessage.style.display = "none";
});
