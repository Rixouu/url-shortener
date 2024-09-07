document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const form = document.getElementById('url-form');
    const result = document.getElementById('result');
    const shortUrl = document.getElementById('short-url');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submitted');

        const formData = new FormData(form);
        try {
            console.log('Sending POST request...');
            const response = await fetch('/', {
                method: 'POST',
                body: formData
            });
            console.log('Response received:', response);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Data received:', data);

            if (data.short_url) {
                shortUrl.textContent = data.short_url;
                shortUrl.href = data.short_url;
                result.classList.remove('hidden');
                console.log('Short URL displayed');
            } else {
                throw new Error('No short_url in response');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please check the console and try again.');
        }
    });
});

function copyToClipboard() {
    const shortUrl = document.getElementById('short-url').textContent;
    navigator.clipboard.writeText(shortUrl).then(() => {
        const copyBtn = document.getElementById('copy-btn');
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy. Please try again.');
    });
}