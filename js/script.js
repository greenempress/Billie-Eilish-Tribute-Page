  const img = document.querySelector('.hero img');
  let angle = 0;
  function floatImage() {
    angle += 0.01;
    img.style.transform = `translateY(${Math.sin(angle)*10}px) rotate(${Math.sin(angle)*2}deg) scale(1.05)`;
    requestAnimationFrame(floatImage);
  }
  floatImage();

  function toggleTracklist(card) {
    const list = card.querySelector('.tracklist');
    list.style.display = list.style.display === 'block' ? 'none' : 'block';
  }

  const allMessages = [
  { text: "Your voice saved me during my darkest times. Thank you.", author: "Ava J." },
  { text: "Billie, you showed me that it's okay to be different.", author: "Noah M." },
  { text: "You helped me feel seen when no one else did.", author: "Liam S." },
  { text: "Her music got me through high school and heartbreak.", author: "Emma R." },
  { text: "I owe my strength to your honesty in every lyric.", author: "Sophia K." },
  { text: "Billie, thank you for being unapologetically real.", author: "Lucas T." },
  { text: "I cry, laugh, and feel alive through your songs.", author: "Isabella G." },
  { text: "You turned my pain into poetry.", author: "Elijah D." },
  { text: "Forever grateful for your art and spirit.", author: "Mia L." },
];

const container = document.getElementById("messages-container");

function shuffleAndDisplayMessages() {
  // Shuffle and select 3 to 7 messages
  const shuffled = [...allMessages].sort(() => Math.random() - 0.5);
  const numberToShow = Math.floor(Math.random() * 5) + 3;
  const selectedMessages = shuffled.slice(0, numberToShow);

  // Fade out container first
  container.style.opacity = 0;

  setTimeout(() => {
    // Build message bubbles with animation class
    container.innerHTML = selectedMessages.map(({ text, author }, index) => `
      <div class="message-bubble animate-in" data-author="- ${author}" style="animation-delay: ${index * 0.1}s;">
        ${text}
      </div>
    `).join('');

    // Fade in container
    container.style.opacity = 1;

    // Add click handlers for expand/collapse
    const bubbles = container.querySelectorAll('.message-bubble');
    bubbles.forEach(bubble => {
      bubble.addEventListener('click', () => {
        bubble.classList.toggle('expanded');
      });
    });

  }, 400);
}

// Initial display
shuffleAndDisplayMessages();

// Shuffle every 5 seconds
setInterval(shuffleAndDisplayMessages, 5000);

const fanForm = document.getElementById("fan-form");
const fanInput = document.getElementById("fan-input");
const fanName = document.getElementById("fan-name");

fanForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const messageText = fanInput.value.trim();
  const authorName = fanName.value.trim();

  if (messageText && authorName) {
    // Add new message to the array
    allMessages.push({ text: messageText, author: authorName });

    // Clear inputs
    fanInput.value = "";
    fanName.value = "";

    // Immediately refresh the wall with new message
    shuffleAndDisplayMessages();
  } else {
    alert("Please enter both your message and your name.");
  }
});