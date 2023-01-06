// Add proper HTML and CSS classes, ID's to match 
// querySelectors specified in main.js

function onSubmit(e) {
    e.preventDefault();

    // Upon submitting, clear the message and the image
    document.querySelector('#message').textContext = '';
    document.querySelector('#image').src = '';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    // If user doesn't enter anything, alert the user
    if (prompt === '') {
        alert('Please add some text to the prompt input!');
        return;
    }

    console.log(prompt, size);
    
    generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
    try {
        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size
            })
        });

        // If bad prompt request, remove loading spinner and alert user
        if (!response.ok) {
            removeSpinner();
            throw new Error('Hmm... That image could not be generated! Try again!');
        }

        // Otherwise, await response, generate image, and remove loading spinner
        const data = await response.json();
        console.log(data);

        const imageUrl = data.data;

        document.querySelector('#image').src = imageUrl;

        removeSpinner();

    } catch (error) {
        document.querySelector('#message').textContext = error;
    }
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);