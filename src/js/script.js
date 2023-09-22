document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu'),
    hamburger = document.querySelector('.hamburger-active'),
    close = document.querySelector('.close'),
    menuItems = document.querySelector('.menu-item'),
    buttons = document.querySelector('.contact');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger-active');
    close.classList.toggle('close-active');
    menu.classList.toggle('menu-active');
    buttons.classList.toggle('btn-active');
  });

  close.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger-active');
    close.classList.toggle('close-active');
    menu.classList.toggle('menu-active');
    buttons.classList.toggle('btn-active');
  });

  menuItems.forEach((item) => {
    item.addEventListener('click', () => {
      hamburger.classList.toggle('hamburger-active');
      close.classList.toggle('close-active');
      menu.classList.toggle('menu-active');
      buttons.classList.toggle('btn-active');
    });
  });
});
