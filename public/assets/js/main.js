// Use Merriam Webster's dictionary API to populate the first definition when a word is searched
async function getData(word) {
    try {
        const response = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=27f1cf31-d14c-4e0c-86df-cd504b4e6471`);
        const data = await response.json();

        // Check if array is not empty
        // Then check if first element in array has a shortdef (definition)
        // Then check that the shortdef property is not empty
        if (data.length > 0 && data[0].shortdef && data[0].shortdef.length > 0) {
            // If there is a definition, show it
            document.getElementById("definition").innerHTML = `Definition: ${data[0].shortdef[0]}`;
        } else {
            // If there is no definition, show no definition found message
            document.getElementById("definition").innerHTML = "No definitions found for this word.";
        }
    } catch(error) {
        //If an error occurs show error message in place of definition 
        document.getElementById("definition").innerHTML = `Error: ${error.message}`;
    }
}

// Get the value from the input field, remove trailing or leading spaces, and search for it
function searchWord() {
    const word = document.getElementById("wordInput").value.trim();

    // If the searched value is not empty, get the data
    if (word) {
        getData(word);
    } else {
        // If the searched value is empty, display enter a word message
        document.getElementById("definition").innerHTML = "Please enter a word to search for.";
    }
}