let data;

// Get data and update DOM initially
updateDataAndDOM();

function updateDataAndDOM() {
  fetch('https://siddht1.github.io/train_view/1077011.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(fetchedData => {
      if (!data || JSON.stringify(data.status) !== JSON.stringify(fetchedData.status)) {
        data = fetchedData;
        updateDOM(data);
      }
      setTimeout(updateDataAndDOM, 5000);
    })
    .catch(error => {
      console.error(error);
      setTimeout(updateDataAndDOM, 5000);
    });
}

function updateDOM(data) {
  document.title = 'TRAIN STATUS|| 1077012 || 1077011';
  const container = document.querySelector('.status');

  let elementsString = '';
  data.status.forEach(status => {
    elementsString += `
      <div class="status-${status.color}">
        <span class="server-status" type="${status.status}"></span>
        <span> ${status.name} | ${status.time}</span>
      </div>
    `;
  });
  container.innerHTML = elementsString;
}
