let data;

const updateDataAndDOM = (url) => {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(fetchedData => {
      if (!data || JSON.stringify(data) !== JSON.stringify(fetchedData)) 
      {
        data = fetchedData;
        console.log(data);
        updateDOM(data);
      }
      setTimeout(() => updateDataAndDOM(url), 5000);
    })
    .catch(error => {
      console.error(error);
      setTimeout(() => updateDataAndDOM(url), 5000);
    });
};

const updateDOM = ({ data }) => {
  const { name, id, route } = data[0];
  document.title = `TRAIN STATUS || ${id}`;
  
  const container = document.querySelector('.status');
  const header = document.createElement('header');
  header.textContent = `${name} || train ${id}`;
  const body = document.querySelector('body');
  body.insertBefore(header, body.firstChild);

  const elementsString = route.status.map(status => {
    const { color, status: type, name, time } = status;
    return `
      <div class="status-${color}">
        <span class="server-status" type="${type}"></span>
        <span> ${name} | ${time}</span>
      </div>
    `;
  }).join('');

  container.innerHTML = elementsString;
};

const url = 'https://train-api-git-main-siddht1.vercel.app/api/v1/trains';
updateDataAndDOM(url);
