document.addEventListener('DOMContentLoaded', () => {

  const featureLinkElems = document.querySelectorAll('.feature__link');
  const featureSubElems = document.querySelectorAll('.feature-sub');

  featureLinkElems.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      featureSubElems[index].classList.toggle('hidden');
      btn.classList.toggle('feature__link_active');
    });
  })

});