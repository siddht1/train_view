let data;

// Get data and update DOM initially
_url='https://train-api-git-main-siddht1.vercel.app/api/v1/trains';
//'https://siddht1.github.io/train_view/1077011.json'
updateDataAndDOM(_url);

function updateDataAndDOM(url) {
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
      setTimeout(updateDataAndDOM, 5000);
    })
    .catch(error => {
      console.error(error);
      setTimeout(updateDataAndDOM, 5000);
    });
}

function updateDOM(data) {
  //data.data[0].route.status
  document.title = 'TRAIN STATUS || '+data.data[0].id;
  const container = document.querySelector('.status');
  //header add
  const header = document.createElement('header');
header.textContent = 'RNC to VASHI | train '+data.data[0].id;


  let elementsString = '';
  data.data[0].route.status.forEach(status => {
    elementsString += `
      <div class="status-${status.color}">
        <span class="server-status" type="${status.status}"></span>
        <span> ${status.name} | ${status.time}</span>
      </div>
    `;
  });
  container.innerHTML = elementsString;
}
