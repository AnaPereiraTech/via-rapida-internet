const cadastroForm = document.getElementById("cadastroForm");

/*

* NÚMERO DO WHATSAPP DA VIA RÁPIDA
*
* Coloque aqui o número da empresa
* com código do país + DDD + número.
*
* Exemplo:
* 5514999999999
  */

const whatsappEmpresa = "5514999999999";

if (cadastroForm) {
  cadastroForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const cpf = document.getElementById("cpf").value.trim();

    const nascimento = document.getElementById("nascimento").value;

    const telefone = document.getElementById("telefone").value.trim();

    const email = document.getElementById("email").value.trim();

    const cep = document.getElementById("cep").value.trim();

    const cidade = document.getElementById("cidade").value.trim();

    const endereco = document.getElementById("endereco").value.trim();

    const numero = document.getElementById("numero").value.trim();

    const complemento = document.getElementById("complemento").value.trim();

    const bairro = document.getElementById("bairro").value.trim();

    const plano = document.getElementById("plano").value;

    const aceite = document.getElementById("aceite").checked;

    if (!aceite) {
      alert("É necessário aceitar os termos para continuar.");

      return;
    }

    /*
     * Converte a data para formato brasileiro
     */

    let nascimentoFormatado = nascimento;

    if (nascimento) {
      const partes = nascimento.split("-");

      nascimentoFormatado = `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    /*
     * Monta a mensagem que será enviada
     * para o WhatsApp da empresa.
     */

    const mensagem = `


*NOVA SOLICITAÇÃO DE CONTRATAÇÃO*

━━━━━━━━━━━━━━━━━━

*DADOS DO CLIENTE*

Nome: ${nome}

CPF: ${cpf}

Data de nascimento: ${nascimentoFormatado}

Telefone: ${telefone}

E-mail: ${email}

*ENDEREÇO DE INSTALAÇÃO*

CEP: ${cep}

Cidade: ${cidade}

Endereço: ${endereco}

Número: ${numero}

Complemento: ${complemento || "Não informado"}

Bairro: ${bairro}

*PLANO ESCOLHIDO*

${plano}

━━━━━━━━━━━━━━━━━━

O cliente declarou que as informações fornecidas são verdadeiras e deseja prosseguir com a contratação.

Cadastro enviado através do site Via Rápida Internet.
`;

    /*
     * Codifica a mensagem para URL
     */

    const mensagemCodificada = encodeURIComponent(mensagem);

    /*
     * Cria o link do WhatsApp
     */

    const whatsappURL = `https://wa.me/${whatsappEmpresa}?text=${mensagemCodificada}`;

    /*
     * Abre o WhatsApp
     */

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
}
