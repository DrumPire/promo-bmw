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

  const formElems = document.querySelectorAll('.form');

  const dataTest = {};

  const formHandler = (form) => {
    const smallElem = document.createElement('small');
    form.append(smallElem);

    form.addEventListener('submit', e => {
        e.preventDefault();
        const data = {};
        let flag = true;

        const buttonSubmit = form.querySelector('.button[type="submit"]');
        
        for(const elem of form.elements) {
          const {name, value} = elem;
          if(name) {
            if(value.trim()) {
              data[name] = value.trim();
              smallElem.textContent = '';
            } else {
              elem.style.border = '1px solid red';
              flag = false;
              elem.value = '';
            }
          }
        }
  
        if(!flag) {
          smallElem.style.color = 'red';
          return smallElem.textContent = 'заполните все поля';
        }
  
        sendData(JSON.stringify(dataTest), 
        (id) => {
          smallElem.textContent = 'Ваша заявка №' + id + ' отправлена! \nВ ближайшое время с вами свяжутся!';
          smallElem.style.color = 'green';
          buttonSubmit.disabled = true;

          setTimeout(() => {
            smallElem.textContent = '';
            buttonSubmit.disabled = false;
          }, 3000);
        }, 
        (err) => {
          smallElem.textContent = 'К сожалению произошла ошибка, попробуйте позже';
          smallElem.style.color = 'red';
        });
        form.reset();
      
      });
  };

  formElems.forEach(formHandler);


};