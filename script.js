// Get elements
const coin = document.getElementById('coin');
const coinImage = document.getElementById('coin-image');
const resultText = document.getElementById('result');
const flipButton = document.getElementById('flip-button');
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');

// Resize the canvas
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// Function to generate confetti
function createConfetti() {
    const confetti = [];
    const colors = ['#FF6347', '#FFD700', '#ADFF2F', '#00BFFF', '#FF69B4', '#8A2BE2'];

    for (let i = 0; i < 300; i++) {
        confetti.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            r: Math.random() * 6 + 4, // size of confetti
            d: Math.random() * 10 + 5, // descent speed
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.random() * 10 - 5,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05
        });
    }
    return confetti;
}

let confettiArray = createConfetti();
let animationFrameId;

// Animate confetti falling
function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiArray.forEach(confetto => {
        confetto.tilt += confetto.tiltAngleIncremental;
        confetto.y += confetto.d;
        confetto.x += Math.sin(confetto.tilt);

        ctx.beginPath();
        ctx.arc(confetto.x, confetto.y, confetto.r, 0, Math.PI * 2);
        ctx.fillStyle = confetto.color;
        ctx.fill();

        if (confetto.y > confettiCanvas.height) {
            confetto.y = -10;
            confetto.x = Math.random() * confettiCanvas.width;
        }
    });

    // Continue animating until stopped
    animationFrameId = requestAnimationFrame(animateConfetti);
}

// Stop confetti after 3 seconds
function stopConfetti() {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

// Function to flip the coin
function flipCoin() {
    // Disable the button during the flip
    flipButton.disabled = true;
    resultText.textContent = "Flipping...";

    // Add flip animation
    coinImage.classList.add('flip');

    // Simulate the coin flip (random number: 0 for heads, 1 for tails)
    const flipResult = Math.random() < 0.5 ? 'heads' : 'tails';

    // After animation completes (1 second), show the result
    setTimeout(() => {
        coinImage.classList.remove('flip'); // Reset flip animation
        if (flipResult === 'heads') {
            coinImage.src = 'heads.png';
            resultText.textContent = "It's Heads!";
        } else {
            coinImage.src = 'tails.png';
            resultText.textContent = "It's Tails!";
        }

        // Trigger confetti blast
        animateConfetti();

        // Stop confetti after 3 seconds
        setTimeout(stopConfetti, 3000);

        // Re-enable the button after 3 seconds
        setTimeout(() => {
            flipButton.disabled = false;
        }, 3000);
    }, 1000); // 1-second delay for animation
}

// Add event listener to the button
flipButton.addEventListener('click', flipCoin);
