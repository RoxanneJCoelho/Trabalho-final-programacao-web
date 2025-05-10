  // Pegar o formulário
const form = document.querySelector('form');

// Quando o formulário for enviado
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que recarregue a página
  Swal.fire({ // sweetalert2 para mostrar a mensagem
    title: 'Mensagem enviada com sucesso!',
    icon: 'success',
    confirmButtonColor: 'rgb(132, 151, 97)',
    confirmButtonText: 'Ok',
    customClass: {
      popup: 'rounded-4'
    }
  });

  // limpar o formulário depois do envio
  form.reset();
});