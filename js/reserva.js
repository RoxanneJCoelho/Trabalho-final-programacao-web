// Seleciona os elementos do DOM que serão manipulados
const calendarBody = document.getElementById("calendarBody"); // Corpo da tabela do calendário
const monthYear = document.getElementById("monthYear"); // Elemento que exibe o mês e o ano atual
const prevMonth = document.getElementById("prevMonth"); 
const nextMonth = document.getElementById("nextMonth");

// Variáveis para marcar o mês e ano atuais
let today = new Date(); // Data atual
let currentMonth = today.getMonth(); // Mês atual (serão tratados os meses de 0 a 11)
let currentYear = today.getFullYear();
let selectedCell = null; // marcador da data selecionada (inicialmente nulo)

// Função que renderiza o calendário
const renderCalendar = (month, year) => {
  // aqui pegamos o primeiro dia do mês e o número de dias no mês
  const firstDay = new Date(year, month).getDay(); // Dia da semana do primeiro dia do mês (aqui 0 = domingo, 1 = segunda-feira... de 0 a 6)
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Número de dias no mês
  const startDay = (firstDay === 0) ? 6 : firstDay - 1; // Ajusta o início da semana para segunda-feira

  // Limpa o corpo do calendário antes de renderizar um novo mês
  calendarBody.innerHTML = "";

  // Atualiza o título do mês e ano no cabeçalho
  monthYear.textContent = new Date(year, month).toLocaleString('pt-BR', {
    month: 'long', // para mostrar o nome completo do mês
    year: 'numeric' // para mostrar o ano com 4 dígitos
  });

  let date = 1; // Contador para os dias do mês

  // Cria as linhas do calendário (máximo de 6 semanas)
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr"); // Cria uma nova linha na tabela

    // Cria as células para cada dia da semana (7 colunas)
    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td"); // Cria uma nova célula

      if (i === 0 && j < startDay) {
        // Preenche as células antes do primeiro dia do mês com vazio
        cell.textContent = "";
      } else if (date > daysInMonth) { // se caso passar o número de dias do mês, paramos de adicionar células
        break;
      } else {
        // Preenche as células com os dias do mês
        const cellDate = new Date(year, month, date);
        const cellTimestamp = cellDate.setHours(0, 0, 0, 0); 
        const todayTimestamp = new Date().setHours(0, 0, 0, 0); // Timestamp para comparar com a data atual

        cell.textContent = date; // Insere o número do dia na célula

        if (cellTimestamp < todayTimestamp) {
          // Adiciona a classe "disabled" para dias passados
          cell.classList.add("disabled");
        } else {
          // Adiciona um evento de clique para selecionar dias futuros
          cell.addEventListener("click", () => {
            if (selectedCell) selectedCell.classList.remove("selected-day"); // Remove a seleção anterior
            cell.classList.add("selected-day"); // Adiciona a classe "selected-day" à célula clicada
            selectedCell = cell; // Atualiza a célula selecionada
          });
        }

        date++; // incrementa o contador de dias
      }

      row.appendChild(cell); // Adiciona a célula à linha
    }

    calendarBody.appendChild(row); // Adiciona a linha ao corpo do calendário
  }
};

// Evento para navegar para o mês anterior
prevMonth.addEventListener("click", () => {
  currentMonth--; // Decrementa o mês atual
  if (currentMonth < 0) {
    // Se o mês for menor que 0 (janeiro), volta para dezembro do ano anterior
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear); // Re-renderiza o calendário com o novo mês e ano
});

// Evento para navegar para o próximo mês
nextMonth.addEventListener("click", () => {
  currentMonth++; // Incrementa o mês atual
  if (currentMonth > 11) {
    // Se o mês for maior que 11 (dezembro), avança para janeiro do próximo ano
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear); // Re-renderiza o calendário com o novo mês e ano
});

// Renderiza o calendário inicial com o mês e ano atuais
renderCalendar(currentMonth, currentYear);