// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const tweetFeed = document.getElementById('tweet-feed');

    // Function to load tweets
    async function loadTweets() {
        try {
            const response = await fetch('/api/tweet/tweets');
            const tweets = await response.json();
            tweetFeed.innerHTML = '';
            tweets.reverse().forEach(tweet => {
                const tweetElement = document.createElement('div');
                tweetElement.className = 'tweet';
                tweetElement.innerHTML = `
                    <p><img src="${tweet.avatar}" alt="Avatar" class="avatar"> <strong>${tweet.username}</strong>: ${tweet.content}</p>
                    ${tweet.media ? `<img src="${tweet.media}" alt="Media">` : ''}
                `;
                tweetFeed.prepend(tweetElement);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Load tweets on page load
    loadTweets();
});
