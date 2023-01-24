const container = document.querySelector('.status');

fetch('1077011.json')
  .then(response => response.json())
  .then(data => {
    data.status.forEach(status => {
      const div = document.createElement('div');
      div.classList.add(`status-${status.status}`);
      div.innerHTML = `
        <span class="server-status" type="${status.status}"></span>
        <span> ${status.name} | ${status.time}</span>
      `;
      container.appendChild(div);
    });
  });
