document.addEventListener('DOMContentLoaded', () => {
    const myInfo = document.getElementById('my-info');
    const myTweets = document.getElementById('my-tweets');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    const parsedUser = JSON.parse(loggedInUser);
    const userId = parsedUser.userId;

    if (!userId) {
        window.location.href = 'login.html';
        return;
    }

    // Function to load user information
    async function loadInformation() {
        try {
            const response = await fetch(`/api/user/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const info = await response.json();
            myInfo.innerHTML = `
                <div class="info">
                    <img src="${info.avatar}" alt="Avatar" class="avatar">
                    <p>Name: ${info.name}</p>
                    <p>Username: ${info.username}</p>
                </div>
            `;
        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    }

    // Function to load user's tweets
    async function loadTweets() {
        try {
            const response = await fetch('/api/tweet/tweets');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const tweets = await response.json();
            myTweets.innerHTML = '';

            // Parse loggedInUser to get the username
            const user = JSON.parse(loggedInUser);

            tweets.reverse().forEach(tweet => {
                if (tweet.username === user.username) {
                    const tweetElement = document.createElement('div');
                    tweetElement.className = 'tweet';
                    tweetElement.innerHTML = `
                        <p><img src="${tweet.avatar}" alt="Avatar" class="avatar"> <strong>${tweet.username}</strong>: ${tweet.content}</p>
                        ${tweet.media ? `<img src="${tweet.media}" alt="Media">` : ''}
                    `;
                    myTweets.prepend(tweetElement);
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    loadInformation();
    loadTweets();
});
