document.addEventListener('DOMContentLoaded', () => {
    const tweetBtn = document.getElementById('tweet-btn');
    const tweetInput = document.getElementById('tweet-input');
    const tweetFeed = document.getElementById('tweet-feed');
    const logoutLink = document.getElementById('logout-link');
    const logoutConfirmation = document.getElementById('logout-confirm');
    const logoutYes = document.getElementById('logout-yes');
    const logoutNo = document.getElementById('logout-no');

    // Function to check if the user is logged in
    function getLoggedInUser() {
        return JSON.parse(localStorage.getItem('loggedInUser'));
    }

    // Function to handle tweeting
    async function handleTweet() {
        const user = getLoggedInUser();
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        const tweetContent = tweetInput.value.trim();
        if (tweetContent === '') {
            alert('Please enter some content to tweet.');
            return;
        }

        const tweet = {
            userId: user.userId, // Corrected from user.id to user.userId
            content: tweetContent,
            media: '' // Handle media content if necessary
        };

        try {
            const response = await fetch('/api/tweet/tweet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tweet)
            });

            const result = await response.json();
            if (result.success) {
                loadTweets();
            } else {
                alert('Failed to post tweet.');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        tweetInput.value = ''; // Clear the input
    }

    // Function to load tweets
    async function loadTweets() {
        try {
            const response = await fetch('/api/tweet/tweets');
            const tweets = await response.json();
            tweetFeed.innerHTML = '';
            tweets.reverse().forEach(tweet => { // Reversed to ensure newest are on top
                const tweetElement = document.createElement('div');
                tweetElement.className = 'tweet';
                tweetElement.innerHTML = `
                    <p><img src="${tweet.avatar}" alt="Avatar" class="avatar"> <strong>${tweet.username}</strong>: ${tweet.content}</p>
                    ${tweet.media ? `<img src="${tweet.media}" alt="Media">` : ''}
                `;
                tweetFeed.prepend(tweetElement); // Prepend to keep newest at the top
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        logoutConfirmation.style.display = 'block';
    });
    logoutYes.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });
    logoutNo.addEventListener('click', () => {
        logoutConfirmation.style.display = 'none';
    });

    // Event listener for tweet button
    tweetBtn.addEventListener('click', handleTweet);

    // Load tweets on page load
    loadTweets();
});
