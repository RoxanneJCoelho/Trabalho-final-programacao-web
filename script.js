// confirmação de envio de formulário
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    this.reset(); // Limpa o formulário
  });