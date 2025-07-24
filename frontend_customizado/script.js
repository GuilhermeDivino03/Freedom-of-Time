
const API_URL = "http://localhost:8080/tarefas";
let tarefas = [];

async function carregarTarefas() {
  const resp = await fetch(API_URL);
  tarefas = await resp.json();
  renderizarLista();
}

function renderizarLista() {
  const ul = document.getElementById("listaTarefas");
  ul.innerHTML = "";

  tarefas.forEach(tarefa => {
    const li = document.createElement("li");
    li.style.listStyle = "none";
    li.style.border = "1px solid #ccc";
    li.style.borderRadius = "10px";
    li.style.padding = "15px";
    li.style.margin = "10px 0";
    li.style.backgroundColor = "#fff";
    li.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    li.style.position = "relative";

    let statusCor = "";
    let statusIcon = "";
    switch (tarefa.status) {
      case "PENDENTE":
        statusCor = "#f1c40f";
        statusIcon = "⏳";
        break;
      case "EM_ANDAMENTO":
        statusCor = "#3498db";
        statusIcon = "🔄";
        break;
      case "CONCLUIDO":
        statusCor = "#2ecc71";
        statusIcon = "✅";
        break;
      case "CANCELADO":
        statusCor = "#e74c3c";
        statusIcon = "❌";
        break;
      default:
        statusCor = "#95a5a6";
        statusIcon = "❔";
    }

    const conteudo = document.createElement("div");
    conteudo.innerHTML = `
      <h3 style="margin:0 0 10px 0;">${tarefa.nome}</h3>
      <p><strong>Status:</strong> <span style="color:${statusCor}; font-weight: bold;">${statusIcon} ${tarefa.status}</span></p>
      <p><strong>Data:</strong> ${tarefa.data || "Sem data"}</p>
      <p><strong>Observação:</strong> ${tarefa.observacao || "-"}</p>
    `;

    const dropdownWrapper = document.createElement("div");
    dropdownWrapper.style.position = "absolute";
    dropdownWrapper.style.top = "15px";
    dropdownWrapper.style.right = "15px";

    const dropdownBtn = document.createElement("button");
    dropdownBtn.textContent = "⋮";
    dropdownBtn.style.border = "none";
    dropdownBtn.style.background = "transparent";
    dropdownBtn.style.fontSize = "20px";
    dropdownBtn.style.cursor = "pointer";

    const dropdownMenu = document.createElement("div");
    dropdownMenu.style.display = "none";
    dropdownMenu.style.position = "absolute";
    dropdownMenu.style.top = "30px";
    dropdownMenu.style.right = "0";
    dropdownMenu.style.background = "#fff";
    dropdownMenu.style.border = "1px solid #ccc";
    dropdownMenu.style.borderRadius = "5px";
    dropdownMenu.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    dropdownMenu.innerHTML = `
      <button style="width: 100%; padding: 8px; border: none; background: none; cursor: pointer;">✏️ Editar</button>
      <button style="width: 100%; padding: 8px; border: none; background: none; cursor: pointer;">🗑️ Excluir</button>
    `;

    const [btnEditar, btnExcluir] = dropdownMenu.querySelectorAll("button");
    btnEditar.onclick = () => editarTarefa(tarefa);
    btnExcluir.onclick = () => excluirTarefa(tarefa.id);

    dropdownBtn.onclick = () => {
      dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    };

    dropdownWrapper.appendChild(dropdownBtn);
    dropdownWrapper.appendChild(dropdownMenu);

    li.appendChild(conteudo);
    li.appendChild(dropdownWrapper);
    ul.appendChild(li);
  });
}

async function adicionarTarefa() {
  const nome = document.getElementById("nome").value.trim();
  const data = document.getElementById("data").value.trim();
  const status = document.getElementById("status").value.trim();
  const observacao = document.getElementById("observacao").value.trim();

  if (!nome || !status) {
    alert("Preencha pelo menos o nome e o status.");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome, data, status, observacao })
  });

  document.getElementById("nome").value = "";
  document.getElementById("data").value = "";
  document.getElementById("status").value = "";
  document.getElementById("observacao").value = "";

  carregarTarefas();
}

async function editarTarefa(tarefa) {
  const novoNome = prompt("Novo nome:", tarefa.nome);
  const novaData = prompt("Nova data:", tarefa.data);
  const novoStatus = prompt("Novo status:", tarefa.status);
  const novaObs = prompt("Nova observação:", tarefa.observacao);

  if (novoNome && novoStatus) {
    await fetch(`${API_URL}/${tarefa.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: novoNome,
        data: novaData,
        status: novoStatus,
        observacao: novaObs
      })
    });
    carregarTarefas();
  }
}

async function excluirTarefa(id) {
  if (confirm("Deseja excluir esta tarefa?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarTarefas();
  }
}

carregarTarefas();
