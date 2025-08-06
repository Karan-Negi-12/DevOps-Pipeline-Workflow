document.getElementById('entry-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = result.message;
});

document.getElementById('show-winner').addEventListener('click', async () => {
    const response = await fetch('/winner');
    const result = await response.json();
    const winnerDisplay = document.getElementById('winner-display');
    if (result.winner) {
        winnerDisplay.textContent = `The winner is: ${result.winner.name} from ${result.winner.city}`;
    } else {
        winnerDisplay.textContent = result.message;
    }
});