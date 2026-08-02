const faqs = [
  ['O Adorar Pro funciona no celular e no computador?', 'Sim. A plataforma é responsiva e se adapta a celulares, tablets, notebooks e desktops. Também pode ser instalada como aplicativo.'],
  ['É possível usar sem internet?', 'Sim. As músicas preparadas para o repertório podem ficar armazenadas no aparelho para uso offline.'],
  ['Posso alterar o tom das cifras?', 'Sim. O leitor permite transpor o tom para cima ou para baixo, voltar ao tom original e ajustar a visualização.'],
  ['O sistema possui perfis diferentes?', 'Sim. Há acesso para líder e músico, permitindo uma experiência adequada ao papel de cada integrante.'],
  ['Posso adicionar áudio às músicas?', 'Sim. É possível vincular arquivos MP3 locais às cifras para estudar e ensaiar com uma referência.'],
  ['Como funciona a licença vitalícia?', 'O pagamento é único e libera o uso da plataforma sem mensalidade recorrente.'],
  ['O teste de 7 dias possui limitações?', 'A proposta do teste é permitir que sua equipe conheça a experiência antes de decidir pela licença.'],
  ['O acervo pode receber novas músicas?', 'Sim. O catálogo pode ser atualizado e organizado por artistas, mantendo a biblioteca sempre útil para a equipe.']
];

const faqList = document.querySelector('#faq-list');
faqList.innerHTML = faqs.map(([question, answer]) => `<details><summary>${question}<span>+</span></summary><p>${answer}</p></details>`).join('');

document.querySelector('#year').textContent = new Date().getFullYear();

const nav = document.querySelector('.nav');
const menuButton = document.querySelector('.menu-button');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('#menu a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: .08 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');
document.querySelectorAll('[data-lightbox]').forEach(button => button.addEventListener('click', () => {
  lightboxImage.src = button.dataset.lightbox;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}));
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
lightbox.querySelector('button').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });

const interestModal = document.querySelector('#interest-modal');
function closeInterest() {
  interestModal.classList.remove('open');
  interestModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}
document.querySelectorAll('[data-interest]').forEach(button => button.addEventListener('click', () => {
  interestModal.classList.add('open');
  interestModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}));
interestModal.querySelector('.modal-close').addEventListener('click', closeInterest);
interestModal.querySelector('.modal-ok').addEventListener('click', closeInterest);
interestModal.addEventListener('click', event => { if (event.target === interestModal) closeInterest(); });

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  closeLightbox();
  closeInterest();
});

const scrollTopButton = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => scrollTopButton.classList.toggle('visible', scrollY > 700), { passive: true });
scrollTopButton.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
