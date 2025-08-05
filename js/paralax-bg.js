window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  document.getElementById('bg').style.transform = `translateY(${scrolled * 0.75}px)`;
});