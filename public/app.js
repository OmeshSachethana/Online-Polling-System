document.getElementById('createPollForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const question = document.getElementById('question').value;
    const options = [...document.getElementsByClassName('option')].map(input => input.value);
  
    const response = await fetch('/api/polls/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, options }),
    });
  
    const poll = await response.json();
    loadPolls();
  });
  
  async function loadPolls() {
    const response = await fetch('/api/polls');
    const polls = await response.json();
  
    const pollsList = document.getElementById('pollsList');
    pollsList.innerHTML = '';
  
    polls.forEach(poll => {
      const pollElement = document.createElement('div');
      pollElement.classList.add('poll-item');
      pollElement.innerHTML = `
        <h3>${poll.question}</h3>
        <ul>
          ${poll.options.map((option, index) => `
            <li>
              <button onclick="vote(${poll._id}, ${index})">${option}</button>
            </li>
          `).join('')}
        </ul>
      `;
      pollsList.appendChild(pollElement);
    });
  }
  
  async function vote(pollId, optionIndex) {
    const response = await fetch(`/api/polls/vote/${pollId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ optionIndex }),
    });
  
    const updatedPoll = await response.json();
    loadPolls();
  }
  
  // Initial poll load
  loadPolls();
  