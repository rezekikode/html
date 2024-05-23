function updateDateTime() {
    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    document.getElementById('datetime').textContent = formattedDateTime;
}

function getIpAddress() {
    // Dummy IP address for example purposes
    const ip = '192.168.1.1';
    document.getElementById('ip-address').textContent = 'IP: ' + ip;
}

function handleMarqueeHover() {
    const marquee = document.getElementById('marquee');
    marquee.addEventListener('mouseover', () => {
        marquee.stop();
    });
    marquee.addEventListener('mouseout', () => {
        marquee.start();
    });
}

function validateEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

setInterval(updateDateTime, 1000);
updateDateTime();
getIpAddress();
handleMarqueeHover();
