export const sendForm = () => {
  const server = 'https://jsonplaceholder.typicode.com/posts';

  const sendData = (data, callBack, falseCallBack) => {
    const request = new XMLHttpRequest();
    request.open('POST', server);

    request.addEventListener('readystatechange', () => {
      if(request.readyState !== 4) return;
      if(request.status === 200 || request.status === 201) {
        const response = JSON.parse(request.responseText);
        callBack(response.id);
      } else {
        falseCallBack(request.responseText);
        throw new  Error(request.statusText);
      }
    });

    request.send(data);
  };

  const dataTest = {
    name: 'alex',
    phone: '+3333333333'
  };

  const formElems = document.querySelectorAll('.form');

  const formHandler = (form) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = {};

      for(const {name, value} of form.elements) {
        if(name) {
          data[name] = value;
        }
      }

      const smallElem = document.createElement('small');

      sendData(JSON.stringify(dataTest), 
      (id) => {
        smallElem.textContent = 'Ваша заявка №' + id + ' отправлена! \nВ ближайшое время с вами свяжутся!';
        smallElem.style.color = 'green';
        form.append(smallElem);
      }, 
      (err) => {
        smallElem.textContent = 'К сожалению произошла ошибка, попробуйте позже';
        smallElem.style.color = 'red';
        form.append(smallElem);
      });
      form.reset();
      });
  };

  formElems.forEach(formHandler);


};