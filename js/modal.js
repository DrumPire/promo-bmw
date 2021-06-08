export const modal = () => {
  const moreElem = document.querySelectorAll('.more');
  const modalElem = document.querySelector('.modal');

  const disabledScroll = () => {
    document.body.dataset.scrollY = window.scrollY;

    const scrollWidth = window.innerWidth - document.body.offsetWidth;

    document.body.style.cssText = `
      position:fixed;
      top: -${window.scrollY}px;
      left:0;
      width:100%;
      overflow:hidden;
      height:100vh;
      padding-right: ${scrollWidth}px;
    `;
  };

  const enabledScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
      top: document.body.dataset.scrollY
    })
  };

  const openModal = () => {
    modalElem.classList.remove('hidden');
    disabledScroll();
  };

  const closeModal = () => {
    modalElem.classList.add('hidden');
    enabledScroll();
  };

  moreElem.forEach(btn => {
    btn.addEventListener('click', openModal);
  });
  modalElem.addEventListener('click', e => {
    const target = e.target;

    if(target.classList.contains('overlay') || target.classList.contains('modal__close')) {
      closeModal();
    } 
  });
};