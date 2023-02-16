// Module for getting data and updating DOM
const DataAndDom = (() => {
  let data;
  const url = 'https://train-api-git-main-siddht1.vercel.app/api/v1/trains';

  const getData = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const fetchedData = await response.json();
      if (!data || JSON.stringify(data) !== JSON.stringify(fetchedData)) {
        data = fetchedData;
        console.log(data);
        Dom.update(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getData
  };
})();

//Module for updating DOM
const Dom = (() => {
  const titleElement = document.querySelector('title');
  const statusContainer = document.querySelector('.status');
  const headerElement = document.createElement('header');

  const init = () => {
    headerElement.textContent = data.data[0].name + ' || train ' + data.data[0].id;
    document.body.insertBefore(headerElement, document.body.firstChild);
  };

  const update = (data) => {
    titleElement.textContent = 'TRAIN STATUS || ' + data.data[0].id;
    let elementsString = '';
    data.data[0].route.status.forEach(status => {
      elementsString += `
        <div class="status-${status.color}">
          <span class="server-status" type="${status.status}"></span>
          <span> ${status.name} | ${status.time}</span>
        </div>
      `;
    });
    statusContainer.innerHTML = elementsString;
  };

  return {
    init,
    update
  };
})();

//Initialize applications/functions
const App = (() => {
  const init = () => {
    Dom.init();
    DataAndDom.getData();
    setInterval(DataAndDom.getData, 5000);
  };

  return {
    init
  };
})();

App.init();
