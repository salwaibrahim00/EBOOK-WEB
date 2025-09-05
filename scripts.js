// Simulated data for stories, summaries, and comments (same as your Flask app)
const ebooks = {
    "1": "The Little Star's Journey\nIn a small village in the African savannah...",
    "2": "The Rainbow Garden\nIn a colorful village nestled in the hills...",
    // Add all your stories here
};

const summaries = {
    "1": "A young boy named Kofi embarks on an adventure to return a fallen star to the sky...",
    "2": "Amara, a young girl, saves her withering garden during a drought by seeking a magical spring...",
    // Add summaries for each story
};

const comments = {
    "1": [],
    "2": [],
    // Initialize empty comment arrays for each story
};

// Function to populate the story list on page load
function populateStoryList() {
    const storyList = document.getElementById('storyList');
    Object.keys(ebooks).forEach(id => {
        const title = ebooks[id].split('\n')[0];
        const storyContainer = document.createElement('div');
        storyContainer.classList.add('story-container');
        storyContainer.innerHTML = `
            <img src="images/ebook.png" alt="eBook" style="height: 60px; width: 60px;">
            <span class="story-title">${title}</span>
        `;
        storyContainer.onclick = () => showStoryDetails(id);
        storyList.appendChild(storyContainer);
    });
}

// Function to display story details when a story is clicked
function showStoryDetails(id) {
    const storyContent = ebooks[id];
    const summary = summaries[id];
    const commentsList = comments[id];
    
    document.getElementById('storyTitle').textContent = storyContent.split('\n')[0];
    document.getElementById('storyContent').textContent = storyContent;
    document.getElementById('storySummary').textContent = summary;

    if (commentsList.length > 0) {
        const commentsListContainer = document.getElementById('commentsList');
        commentsListContainer.innerHTML = ''; // Clear existing comments

        commentsList.forEach((comment, index) => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <p>${comment}</p>
                <form class="delete-form" onsubmit="deleteComment(${id}, ${index}); return false;">
                    <button type="submit">Delete</button>
                </form>
            `;
            commentsListContainer.appendChild(commentDiv);
        });
    }

    document.getElementById('storyDetails').classList.remove('hidden');
    document.getElementById('commentsSection').classList.remove('hidden');
}

// Function to toggle the display of story summary
function toggleSummary() {
    const summary = document.getElementById('storySummary');
    const readButton = document.getElementById('readButton');
    if (summary.style.display === 'none' || !summary.style.display) {
        summary.style.display = 'block';
        readButton.textContent = 'HIDE';
    } else {
        summary.style.display = 'none';
        readButton.textContent = 'READ';
    }
}

// Function to play audio
function playAudio() {
    const audioPlayer = document.getElementById('audioPlayer');
    // Simulated audio URL for demo purposes
    const audioUrl = 'path_to_your_audio_file.mp3';
    audioPlayer.src = audioUrl;
    audioPlayer.play();
}

// Function to share on Facebook
function shareOnFacebook() {
    const storySummary = document.getElementById('storySummary').textContent;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(storySummary)}`;
    window.open(url, '_blank');
}

// Function to share on Twitter
function shareOnTwitter() {
    const storySummary = document.getElementById('storySummary').textContent;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(storySummary)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
}

// Function to add a comment
function addComment() {
    const storyId = '1'; // Replace with actual story ID logic
    const commentInput = document.getElementById('commentInput');
    const comment = commentInput.value.trim();
    if (comment !== '') {
        comments[storyId].push(comment);
        commentInput.value = ''; // Clear input
        showStoryDetails(storyId); // Refresh comments section
    }
}

// Function to delete a comment
function deleteComment(storyId, index) {
    comments[storyId].splice(index, 1);
    showStoryDetails(storyId); // Refresh comments section
}

// Function to show different content sections
function showContent(id) {
    const contentSections = document.getElementsByClassName('content-section');
    for (let i = 0; i < contentSections.length; i++) {
        contentSections[i].classList.add('hidden');
    }
    document.getElementById(id).classList.remove('hidden');
}

// Function to filter stories based on search input
function searchStories() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const storyTitles = document.getElementsByClassName('story-title');
    for (let i = 0; i < storyTitles.length; i++) {
        const title = storyTitles[i].textContent.toLowerCase();
        const storyContainer = storyTitles[i].parentNode;
        if (title.includes(searchInput)) {
            storyContainer.style.display = '';
        } else {
            storyContainer.style.display = 'none';
        }
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    populateStoryList();
});
