let listaDeAmigos = [];
const emojis = ["🎁", "🧸", "🍫", "🎉", "🎈", "🧃"];

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();
    limparMensagem();

    if (nome === "") {
        mostrarMensagem("Por favor, digite um nome válido.", "erro");
        return;
    }

    if (listaDeAmigos.includes(nome)) {
        mostrarMensagem("Esse nome já foi adicionado!", "erro");
        return;
    }

    listaDeAmigos.push(nome);
    atualizarLista();
    input.value = "";
    input.focus();
    mostrarMensagem("Nome adicionado com sucesso! ✅", "sucesso");
}

function atualizarLista() {
    const ul = document.getElementById("listaAmigos");
    ul.innerHTML = "";

    listaDeAmigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.textContent = amigo + " ";

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "❌";
        botaoRemover.style.marginLeft = "10px";
        botaoRemover.onclick = () => removerAmigo(index);

        li.appendChild(botaoRemover);
        ul.appendChild(li);
    });
}

function removerAmigo(index) {
    listaDeAmigos.splice(index, 1);
    atualizarLista();
    mostrarMensagem("Amigo removido!", "sucesso");
}

function sortearAmigo() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    limparMensagem();

    if (listaDeAmigos.length < 3) {
        mostrarMensagem("Adicione pelo menos 3 amigos para sortear!", "erro");
        return;
    }

    const indiceSorteado = Math.floor(Math.random() * listaDeAmigos.length);
    const nomeSorteado = listaDeAmigos[indiceSorteado];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    resultado.innerHTML = `<li>O amigo secreto sorteado foi: <strong>${nomeSorteado}</strong> ${emoji}</li>`;
    mostrarMensagem("Sorteio realizado com sucesso! 🎉", "sucesso");

    // Mostrar botão "Novo Sorteio"
    document.getElementById("novoSorteio").style.display = "inline-block";
}

function novoSorteio() {
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("novoSorteio").style.display = "none";
    limparMensagem();
}

function mostrarMensagem(texto, tipo) {
    let msg = document.getElementById("mensagem");
    if (!msg) {
        msg = document.createElement("div");
        msg.id = "mensagem";
        msg.style.marginTop = "15px";
        msg.style.padding = "10px 20px";
        msg.style.borderRadius = "20px";
        msg.style.fontWeight = "bold";
        msg.style.fontFamily = "Inter, sans-serif";
        msg.style.transition = "all 0.3s ease";
        document.querySelector(".input-section").prepend(msg);
    }

    msg.textContent = texto;

    if (tipo === "erro") {
        msg.style.backgroundColor = "#ffd6d6";
        msg.style.color = "#a10000";
        msg.style.border = "2px solid #a10000";
    } else {
        msg.style.backgroundColor = "#d4f8d4";
        msg.style.color = "#036a03";
        msg.style.border = "2px solid #036a03";
    }

    msg.style.display = "block";
}

function limparMensagem() {
    const msg = document.getElementById("mensagem");
    if (msg) msg.style.display = "none";
}
