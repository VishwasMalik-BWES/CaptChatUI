document.addEventListener('DOMContentLoaded', (event) => {
    // Get references to the chat icon and the chat box
    const chatIcon = document.getElementById('chaticon');
    const chatBox = document.getElementById('chatbox');
    const closeButton = document.getElementById('closeButton');

    // Toggle the display of the chat box when the chat icon is clicked
    chatIcon.addEventListener('click', () => {
        chatBox.style.display = chatBox.style.display === 'none' ? 'block' : 'none';
    });

    // Close the chat box when the close button is clicked
    closeButton.addEventListener('click', () => {
        chatBox.style.display = 'none';
    });

    // On click delete delete the chat section
    const deleteButton = document.getElementById('deleteButton');
    const chatSection = document.getElementById('chat_section');

    deleteButton.addEventListener('click', () => {
        chatSection.innerHTML = '<div id="emptyChatDiv" class="w-full h-full flex justify-center items-center text-gray-500"><p>No messages yet...</p></div>';
    });

    // On send click append the html to the chat section
    const sendButton = document.getElementById('sendButton');

    sendButton.addEventListener('click', () => {
        const input = document.getElementById('chatInput');
        const message = input.value;
        if (message === '') {
            // Display an error message in the snackbar if the input is empty
            const snackbar = document.getElementById('snackbar');
            const snackbarText = document.getElementById('snackbarText');
            snackbarText.textContent = 'Please enter a message !!!';
            snackbar.style.display = 'flex';
            setTimeout(() => {
                snackbar.style.display = 'none';
            }, 3000);
            return;
        }
        
        const html = `
        <div class="rounded-xl w-4/5 p-4 bg-gray-100 dark:bg-gray-800 self-end">
        <p class="text-sm leading-none">${message}</p>
        <time class="mt-2 block text-xs text-gray-500 dark:text-gray-400 float-end">Just now</time>
        </div>
        `;
        // Remove the empty chat div if it exists
        const emptyChatDiv = document.getElementById('emptyChatDiv');
        if (emptyChatDiv) {
            chatSection.removeChild(emptyChatDiv);
        }
        chatSection.innerHTML += html;
        input.value = '';
        
        // Scroll to the bottom of the chat section
        chatSection.scrollTop = chatSection.scrollHeight;
        
        // Fetch the api for the requestText
        const requestText = message;
        // fetchApi(requestText)
        //     .then((data) => {
        //         const response = data['message'];
        //         const reponseTime = 'Just now';
        //         addResponseText(response, reponseTime);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
        setTimeout(() => {
            const response = 'Hello, how can I help you?';
            const reponseTime = 'Just now';
            addResponseText(response, reponseTime);
        },3000);
    }); 

    // Close the chat box when the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target !== chatIcon && event.target !== chatBox && !chatBox.contains(event.target)) {
            chatBox.style.display = 'none';
        }
    });

    // Add response in the chatbox
    const addResponseText = (response, reponseTime) => {
        const html = `
            <div class="rounded-xl w-4/5 p-4 bg-gray-100 dark:bg-gray-800 self-start">
                <p class="text-sm leading-none">${response}</p>
                <time class="mt-2 block text-xs text-gray-500 dark:text-gray-400 float-end">${reponseTime}</time>
            </div>
        `;
        // Remove the empty chat div if it exists
        const emptyChatDiv = document.getElementById('emptyChatDiv');
        if (emptyChatDiv) {
            chatSection.removeChild(emptyChatDiv);
        }

        chatSection.innerHTML += html;

        // Scroll to the bottom of the chat section
        chatSection.scrollTop = chatSection.scrollHeight;
    };

    // fetch the api for the requestText
    const fetchApi = async (requestText) => {
        const response = await fetch('http://url', {        // Modify the url to the api endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: requestText }),
        });
        const data = await response.json();
        return data;
    }

    document.getElementById('chatInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            // Replace 'sendButton' with the actual ID or class of your send button
            document.getElementById('sendButton').click();
        }
    });
});
