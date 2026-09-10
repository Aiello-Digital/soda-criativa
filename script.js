// Ano no rodapé
document.getElementById('ano').textContent = new Date().getFullYear();

// Menu mobile
const menuToggle = document.getElementById('menuToggle');
const header = document.querySelector('.site-header');
menuToggle.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
document.querySelectorAll('.nav-mobile a').forEach(a => {
  a.addEventListener('click', () => {
    header.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

// Formulário -> abre WhatsApp com mensagem pré-preenchida
const form = document.getElementById('contatoForm');
const formNote = document.getElementById('formNote');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const telefone = form.telefone.value.trim();
  const assunto = form.assunto.value.trim();
  const mensagem = form.mensagem.value.trim();

  const partes = [
    `Olá, Soda Criativa! Meu nome é ${nome}.`,
    assunto ? `Assunto: ${assunto}` : null,
    mensagem ? `Mensagem: ${mensagem}` : null,
    email ? `Meu email: ${email}` : null,
    telefone ? `Meu telefone: ${telefone}` : null,
  ].filter(Boolean).join('\n');

  const url = `https://wa.me/5511933546648?text=${encodeURIComponent(partes)}`;
  formNote.textContent = 'Abrindo o WhatsApp...';
  window.open(url, '_blank', 'noopener');
  form.reset();
});
