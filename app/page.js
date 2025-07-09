"use client";

import { useState } from 'react';

const perguntas = [
  "Tenho dificuldade em controlar ou interromper hábitos ou comportamentos que percebo serem prejudiciais à minha vida.",
  "Quando tento parar ou reduzir determinados comportamentos, sinto ansiedade, irritação ou um desconforto emocional significativo.",
  "Já tive problemas familiares, sociais ou profissionais diretamente relacionados a comportamentos repetitivos ou dependências.",
  "Dedico muito tempo do meu dia pensando ou planejando realizar certos comportamentos, mesmo sabendo que não são saudáveis.",
  "Já tentei parar um determinado comportamento diversas vezes, mas sempre acabo retornando ao mesmo hábito compulsivamente.",
  "Recentemente, meus comportamentos compulsivos ou vícios me levaram a pensar seriamente em tirar minha própria vida ou me machucar.",
  "Sinto vergonha ou culpa significativa por causa dos meus comportamentos compulsivos ou de dependência.",
  "Tenho percebido prejuízos físicos ou financeiros devido a comportamentos repetitivos ou à dependência.",
  "Costumo mentir ou esconder das pessoas próximas os meus hábitos ou vícios por medo de julgamento ou repreensão.",
  "Mesmo sabendo que preciso de ajuda, tenho muita dificuldade em pedir auxílio ou em admitir meu problema para alguém."
];

export default function TesteVicio() {
  const [respostas, setRespostas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);

  const registrarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[indiceAtual] = valor;
    setRespostas(novasRespostas);

    if (indiceAtual < perguntas.length - 1) {
      setIndiceAtual(indiceAtual + 1);
    } else {
      calcularResultado(novasRespostas);
    }
  };

  const calcularResultado = (respostas) => {
    if (respostas[5] >= 3) {
      setResultado("VERMELHO");
    } else {
      const soma = respostas.reduce((a, b) => a + b, 0);
      if (soma <= 20) setResultado("VERDE");
      else if (soma <= 35) setResultado("AMARELO");
      else setResultado("VERMELHO");
    }
  };

  const reiniciarTeste = () => {
    setRespostas(Array(10).fill(0));
    setResultado(null);
    setIndiceAtual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Teste de Vício</h2>
          <div className="mb-6 text-sm text-gray-700 dark:text-gray-300 text-center">
            <p className="mb-4">
              Indique com que frequência cada situação acontece com você atualmente:<br />
              <strong>(1) Nunca | (2) Raramente | (3) Às vezes | (4) Frequentemente | (5) Sempre</strong>
            </p>
          </div>

          <p className="mb-4 text-gray-800 dark:text-gray-200">{perguntas[indiceAtual]}</p>

          <div className="flex justify-between items-end mb-4">
            {[1, 2, 3, 4, 5].map((num) => {
              const corGradiente = {
                1: "from-gray-300 to-gray-400",
                2: "from-blue-200 to-blue-300",
                3: "from-blue-300 to-blue-400",
                4: "from-blue-500 to-blue-600",
                5: "from-blue-700 to-blue-800",
              };

              return (
                <button
                  key={num}
                  onClick={() => registrarResposta(num)}
                  className={\`flex items-center justify-center rounded-full text-white font-bold hover:scale-110 transition transform bg-gradient-to-br \${corGradiente[num]}\`}
                  style={{
                    width: \`\${30 + num * 5}px\`,
                    height: \`\${30 + num * 5}px\`,
                    fontSize: \`\${12 + num}px\`
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            Pergunta {indiceAtual + 1} de {perguntas.length}
          </p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4 text-center">Resultado: {resultado}</h2>
          <img
            src={
              resultado === "VERDE"
                ? "/images/semaforo-verde.png"
                : resultado === "AMARELO"
                ? "/images/semaforo-amarelo.png"
                : "/images/semaforo-vermelho.png"
            }
            alt={\`Indicador \${resultado}\`}
            className="w-40 h-auto mx-auto mb-4"
          />
          {resultado === "VERDE" && (
            <p className="text-center text-gray-800 dark:text-gray-200">
              Você lida muito bem com esse tema e está emocionalmente bem resolvido. Poderá auxiliar grandemente outras pessoas que precisam de ajuda.
            </p>
          )}
          {resultado === "AMARELO" && (
            <p className="text-center text-gray-800 dark:text-gray-200">
              Há sinais evidentes de dificuldades emocionais que precisam ser trabalhadas e que, com determinação e ajuda, poderão ser superadas.
            </p>
          )}
          {resultado === "VERMELHO" && (
            <p className="text-center text-gray-800 dark:text-gray-200">
              Seus problemas emocionais com este tema precisam necessariamente de ajuda profissional. Procure com brevidade a ajuda de um médico ou psicólogo.
            </p>
          )}
          <button
            className="mt-6 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700 block mx-auto"
            onClick={reiniciarTeste}
          >
            Refazer teste
          </button>
        </>
      )}
    </div>
  );
}