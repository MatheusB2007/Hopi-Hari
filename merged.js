// ====================================================================
// ARQUIVO JAVASCRIPT CONSOLIDADO
// Contém a lógica de: hari.js, login.js, Pagamento.js, Cadastro.js e carrinho.js
// ====================================================================


// ====================================================================
// 1. LÓGICA DE HARI.JS (Efeitos Interativos, Contagem Regressiva e Modo Escuro)
// ====================================================================

// 😱 EFEITO ASSUSTADOR NO BOTÃO
const botao = document.getElementById("sustoBtn");
const msgHari = document.getElementById("mensagem"); // Renomeado para evitar conflito com 'msg' de login/cadastro

// Mensagens aleatórias de susto
const mensagens = [
  "🩸 Você não devia ter clicado aqui...",
  "☠️ Algo está atrás de você...",
  "👻 Um grito ecoa ao longe...",
  "🕷️ As sombras estão se movendo...",
  "🎃 O medo está apenas começando...",
  "😱 BOO! Você sobreviveu... por enquanto."
];

// Sons aleatórios de susto (opcional)
const sons = ["grito1.mp3", "grito2.mp3", "risada.mp3", "susto.mp3"];

if (botao && msgHari) {
  botao.addEventListener("click", () => {
    // Escolhe mensagem e som aleatórios
    const aleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];
    const somAleatorio = sons[Math.floor(Math.random() * sons.length)];

    // Exibe mensagem
    msgHari.textContent = aleatoria;
    msgHari.style.color = "#ff0000";

    // Toca som (se existir)
    const som = new Audio(somAleatorio);
    som.play().catch(() => {}); // evita erro se o arquivo não for encontrado

    // Efeito visual rápido (tela escurecendo)
    document.body.style.transition = "background 0.5s";
    document.body.style.backgroundColor = "#300";
    setTimeout(() => {
      document.body.style.background = "radial-gradient(circle at top, #111, #000)";
    }, 600);
  });
}


// ⏳ CONTAGEM REGRESSIVA PARA O EVENTO
const evento = new Date("2025-10-31T18:00:00").getTime();
const contador = document.getElementById("countdown");

if (contador) {
  setInterval(() => {
    const agora = new Date().getTime();
    const dif = evento - agora;

    if (dif <= 0) {
      contador.textContent = "👻 O terror começou! Bem-vindo à Hora do Horror!";
      return;
    }

    const dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    const horas = Math.floor((dif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));

    contador.textContent = `⏳ Faltam ${dias} dias, ${horas} horas e ${minutos} minutos para a Hora do Horror!`;
  }, 1000);
}


// 🌑 MODO ESCURO AUTOMÁTICO
if (document.body) {
  if (new Date().getHours() > 18 || new Date().getHours() < 6) {
    document.body.classList.add("dark-mode");
  }
}


// ====================================================================
// 2. LÓGICA DE LOGIN.JS (Versão mais robusta com validação específica)
// ====================================================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const msg = document.querySelector(".msg");

    if (email === "" || senha === "") {
      msg.textContent = "⚠️ Preencha todos os campos!";
      msg.style.color = "#ff8800";
      return;
    }

    // Validação específica (mantida para simulação)
    if (email === "usuario@hopihari.com" && senha === "terror123") {
      msg.textContent = "🎃 Bem-vindo ao Hopi Hari do Horror!";
      msg.style.color = "#0f0";
      setTimeout(() => {
        window.location.href = "index.html"; // Redireciona
      }, 1500);
    } else {
      msg.textContent = "☠️ Credenciais incorretas! Tente novamente...";
      msg.style.color = "#ff4c4c";
    }
  });
}


// ====================================================================
// 3. LÓGICA DE CADASTRO.JS
// ====================================================================

const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {
  cadastroForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmSenha = document.getElementById("confirmSenha").value.trim();
    const msg = document.querySelector(".msg");

    if (!nome || !email || !senha || !confirmSenha) {
      msg.textContent = "⚠️ Preencha todos os campos!";
      msg.style.color = "#ff8800";
      return;
    }

    if (senha !== confirmSenha) {
      msg.textContent = "☠️ Senhas não coincidem!";
      msg.style.color = "#ff4c4c";
      return;
    }

    msg.textContent = "🎃 Cadastro realizado com sucesso!";
    msg.style.color = "#0f0";

    setTimeout(() => {
      window.location.href = "login.html"; // Redireciona para login
    }, 1500);
  });
}


// ====================================================================
// 4. LÓGICA DE PAGAMENTO.JS (Versão corrigida e consolidada)
// ====================================================================

document.addEventListener("DOMContentLoaded", () => {
  const pagamentoItens = document.querySelector(".pagamento-itens");
  const totalPagamento = document.getElementById("total-pagamento");
  const formPagamento = document.getElementById("form-pagamento");

  if (pagamentoItens && totalPagamento) {
    // Recuperar carrinho do localStorage
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let total = 0;

    carrinho.forEach(item => {
      // Garantir que item.subtotal ou item.preco e item.quantidade existam
      const subtotal = item.subtotal ? item.subtotal : (item.quantidade * item.preco);
      total += subtotal;

      const div = document.createElement("div");
      div.classList.add("pagamento-item");
      div.innerHTML = `
        <p><strong>${item.nome}</strong></p>
        <p>Dia: ${item.dia}</p>
        <p>Tipo: ${item.tipo}</p>
        <p>Quantidade: ${item.quantidade}</p>
        <p>Subtotal: R$ ${subtotal.toFixed(2)}</p>
        <hr>
      `;
      pagamentoItens.appendChild(div);
    });

    totalPagamento.textContent = total.toFixed(2);
    
    // Formulário de pagamento
    if (formPagamento) {
      formPagamento.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Pagamento realizado com sucesso! 🎉");
        localStorage.removeItem("carrinho");
        // Não remove 'total' pois a lógica de carrinho.js não o armazena separadamente
        window.location.href = "index.html";
      });
    }
  }
});


// ====================================================================
// 5. LÓGICA DE CARRINHO.JS
// ====================================================================

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart-items");
  const totalDisplay = document.querySelector("#total");
  const btnAdicionar = document.querySelector("#btn-adicionar");
  const selectAtracao = document.querySelector("#select-atracao");
  const btnFinalizar = document.querySelector("#btn-finalizar");

  if (cartContainer && totalDisplay && btnAdicionar && selectAtracao && btnFinalizar) {
    
    function atualizarTotal() {
      let total = 0;
      document.querySelectorAll(".cart-item").forEach(item => {
        const quantidadeInput = item.querySelector(".quantidade-input");
        const tipoSelect = item.querySelector(".tipo-ingresso");
        
        // Verifica se os elementos existem antes de tentar acessar suas propriedades
        if (quantidadeInput && tipoSelect && tipoSelect.selectedOptions.length > 0) {
          const quantidade = parseInt(quantidadeInput.value);
          const preco = parseFloat(tipoSelect.selectedOptions[0].dataset.preco);
          const subtotalElement = item.querySelector(".subtotal");
          
          if (subtotalElement) {
            subtotalElement.textContent = (quantidade * preco).toFixed(2);
          }
          total += quantidade * preco;
        }
      });
      totalDisplay.textContent = total.toFixed(2);
    }

    function adicionarEventos(item) {
      const quantidadeInput = item.querySelector(".quantidade-input");
      const tipoSelect = item.querySelector(".tipo-ingresso");
      const diaSelect = item.querySelector(".dia-select");
      const btnRemover = item.querySelector(".btn-remover");

      function atualizarSubtotal() {
        const quantidade = parseInt(quantidadeInput.value);
        const preco = parseFloat(tipoSelect.selectedOptions[0].dataset.preco);
        item.querySelector(".subtotal").textContent = (quantidade * preco).toFixed(2);
        atualizarTotal();
      }
      
      if (quantidadeInput) {
        quantidadeInput.addEventListener("change", () => {
          if (quantidadeInput.value < 1) quantidadeInput.value = 1;
          atualizarSubtotal();
        });
      }
      
      if (tipoSelect) {
        tipoSelect.addEventListener("change", atualizarSubtotal);
      }
      
      if (diaSelect) {
        diaSelect.addEventListener("change", atualizarSubtotal);
      }

      if (btnRemover) {
        btnRemover.addEventListener("click", () => {
          item.remove();
          atualizarTotal();
        });
      }
    }

    btnAdicionar.addEventListener("click", () => {
      const selecionado = selectAtracao.selectedOptions[0];
      if (!selecionado) return alert("Selecione uma atração.");

      const nome = selecionado.value;
      const img = selecionado.dataset.img || ''; // Adicionado fallback
      const precos = JSON.parse(selecionado.dataset.precos || '{}'); // Adicionado fallback

      // Criar item no carrinho
      const novoItem = document.createElement("div");
      novoItem.classList.add("cart-item");
      
      // Assume-se que 'comum' é o preço inicial padrão
      const precoComum = precos.comum !== undefined ? precos.comum : 0; 
      
      novoItem.innerHTML = `
        <input type="checkbox" class="item-selecionado" checked>
        <img src="${img}" alt="${nome}">
        <div class="item-info">
          <h3>${nome}</h3>
          <p>Dia:
            <select class="dia-select">
              <option value="2025-10-31">31/10/2025</option>
              <option value="2025-11-01">01/11/2025</option>
              <option value="2025-11-02">02/11/2025</option>
            </select>
          </p>
          <p>Tipo de ingresso:
            <select class="tipo-ingresso">
              <option value="comum" data-preco="${precoComum}">Comum - R$ ${precoComum}</option>
              <option value="raro" data-preco="${precos.raro || 0}">Raro - R$ ${precos.raro || 0}</option>
              <option value="epico" data-preco="${precos.epico || 0}">Épico - R$ ${precos.epico || 0}</option>
              <option value="lendario" data-preco="${precos.lendario || 0}">Lendário - R$ ${precos.lendario || 0}</option>
            </select>
          </p>
          <p>Quantidade: <input type="number" class="quantidade-input" min="1" value="1"></p>
          <p>Subtotal: R$ <span class="subtotal">${precoComum}</span></p>
          <button class="btn-remover">🗑️ Remover</button>
        </div>
      `;
      cartContainer.appendChild(novoItem);
      adicionarEventos(novoItem);
      atualizarTotal();
    });

    btnFinalizar.addEventListener("click", () => {
      const carrinhoArray = [];
      document.querySelectorAll(".cart-item").forEach(item => {
        
        // Verifica se o item está selecionado (checkbox)
        const isSelected = item.querySelector(".item-selecionado")?.checked;
        if (!isSelected) return; 
        
        const nome = item.querySelector("h3")?.textContent;
        const dia = item.querySelector(".dia-select")?.value;
        const tipoSelect = item.querySelector(".tipo-ingresso");
        const quantidadeInput = item.querySelector(".quantidade-input");
        
        if (nome && dia && tipoSelect && quantidadeInput && tipoSelect.selectedOptions.length > 0) {
          const tipo = tipoSelect.value;
          const quantidade = parseInt(quantidadeInput.value);
          const preco = parseFloat(tipoSelect.selectedOptions[0].dataset.preco);
          const subtotal = quantidade * preco;
          
          carrinhoArray.push({ nome, dia, tipo, quantidade, preco, subtotal });
        }
      });
      
      if (carrinhoArray.length > 0) {
        localStorage.setItem("carrinho", JSON.stringify(carrinhoArray));
        window.location.href = "finalizar.html";
      } else {
        alert("Seu carrinho está vazio!");
      }
    });

    // Chamada inicial para garantir que o total seja calculado se houver itens pré-existentes
    // (Embora o carrinho.js original não carregasse itens, esta é uma boa prática)
    // Se a página for o carrinho, é útil.
    // atualizarTotal(); // Removido para evitar erro se não houver elementos na carga inicial
  }
});

  const btn = document.getElementById("sustoBtn");
  const msg = document.getElementById("mensagem");
  let cliqueCount = 0;

  btn.addEventListener("click", function() {
    cliqueCount++;

    // 💀 Tremor e som de susto
    document.body.style.animation = "tremor 0.5s linear";
    setTimeout(() => document.body.style.animation = "", 500);

    const somSusto = new Audio("susto.mp3");
    somSusto.volume = 0.5;
    somSusto.play().catch(() => {});

    if (cliqueCount < 3) {
      msg.textContent = `😱 Você clicou ${cliqueCount} vez${cliqueCount > 1 ? 'es' : ''}... Continue se tiver coragem!`;
      msg.style.color = "crimson";
      msg.style.textShadow = "0 0 10px red";
    } else {
      msg.textContent = "💀 Preparando o susto final...";
      setTimeout(() => {
        window.location.href = "Susto.html";
      }, 800); // leve delay antes do redirecionamento
    }
  });
btnFinalizar.addEventListener("click", () => {
  // Coleta os itens do carrinho
  const items = [];
  document.querySelectorAll(".cart-item").forEach(item => {
    const nome = item.querySelector("h3").textContent;
    const tipo = item.querySelector("strong").textContent;
    const preco = item.querySelector("p:last-child").textContent.replace("Preço: R$ ", "");
    const img = item.querySelector("img").src;
    items.push({ nome, tipo, preco, img });
  });

  // Salva no localStorage
  localStorage.setItem("carrinho", JSON.stringify(items));
  localStorage.setItem("total", total);

  // Redireciona para a página de pagamento
  window.location.href = "pagamento.html";
});
btnFinalizar.addEventListener("click", () => {
  window.location.href = "pagamento.html";
});
localStorage.setItem("carrinho", JSON.stringify(carrinho));
localStorage.setItem("total", total.toFixed(2));

  const botoes = document.querySelectorAll(".metodo-pagamento button");
  const formularios = document.querySelectorAll(".pagamento-form");
  const somTerror = document.querySelector("#somTerror");
  const somBoleto = document.querySelector("#somBoleto");
  const fantasma = document.querySelector("#fantasma");
  const container = document.querySelector("#container");


  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      botoes.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const metodo = btn.dataset.metodo;
      formularios.forEach(f => f.classList.remove("active"));
      document.querySelector(`#form-${metodo}`).classList.add("active");

      // Efeitos visuais e sonoros
      if (metodo === "boleto") {
        somTerror.play().catch(()=>{});
        somBoleto.play().catch(()=>{});
        fantasma.style.opacity = 1;
        container.style.background = "radial-gradient(circle, #220000, #000)";
      } else {
        somTerror.pause();
        somTerror.currentTime = 0;
        fantasma.style.opacity = 0;
        container.style.background = "rgba(255,255,255,0.05)";
      }
    });
  });

  // Simula envio de pagamento
  formularios.forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const tipo = form.id.replace("form-", "");
      let texto = "";
      if (tipo === "cartao") texto = "💳 Pagamento com cartão aprovado!";
      if (tipo === "pix") texto = "⚡ Pagamento Pix confirmado!";
      if (tipo === "boleto") texto = "👻 O pagamento despertou algo...";

      msg.textContent = texto;
      msg.style.color = tipo === "boleto" ? "#ff3333" : "#00ff99";

      // Redireciona após 3 segundos
      setTimeout(() => {
        window.location.href = "confirmacao.html";
      }, 3000);
    });
  });

localStorage.setItem("carrinho", JSON.stringify(carrinho));
localStorage.setItem("total", total.toFixed(2));
const valor = localStorage.getItem("valorCarrinho") || "0.00";
document.querySelector("#valor-total").textContent = valor;
