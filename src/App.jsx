import { useState } from 'react';
import './App.css';
import { Botao } from "./components/botao/Botao"
import { BotaoZero } from './components/botaoZero/botaoZero';

function App() {
  const [numeroUm, setNumeroUm] = useState("");
  const [simbolo, setSimbolo] = useState("");
  const [numeroDois, setNumeroDois] = useState("");
  const [usarPorcentagem, setUsarPorcentagem] = useState(false);
  const [usarResultado, setUsarResultado] = useState(false); // NOVO ESTADO

  function adicionarNumero(n) {
    if (usarResultado) {
      setNumeroUm(n.toString());
      setUsarResultado(false);
    } else {
      setNumeroUm(numeroUm + n);
    }
  }

  function conta(sinal) {
    if (numeroUm !== "" || numeroDois !== "") {
      if (numeroUm === "" && numeroDois !== "") {
        setSimbolo(sinal); // Permite trocar de operador
      } else {
        let novoNumeroDois = usarResultado ? numeroDois : numeroUm;
        setNumeroDois(novoNumeroDois);
        setNumeroUm("");
        setSimbolo(sinal);
        setUsarPorcentagem(false);
        setUsarResultado(false);
      }
    }
  }

  function resultado() {
    if (numeroUm !== "" && numeroDois !== "" && simbolo !== "=") {
      let num1 = parseFloat(numeroDois);
      let num2 = parseFloat(numeroUm);

      if (usarPorcentagem) {
        num2 = (num1 * num2) / 100;
      }

      let resultadoFinal;
      if (simbolo === "/") {
        resultadoFinal = num1 / num2;
      } else if (simbolo === "*") {
        resultadoFinal = num1 * num2;
      } else if (simbolo === "-") {
        resultadoFinal = num1 - num2;
      } else if (simbolo === "+") {
        resultadoFinal = num1 + num2;
      }

      setNumeroDois(resultadoFinal.toString());
      setNumeroUm("");
      setSimbolo("=");
      setUsarPorcentagem(false);
      setUsarResultado(true); // Permite continuar a conta com o resultado
    }
  }

  function limpar() {
    setNumeroUm("");
  }

  function limparTudo() {
    setNumeroUm("");
    setNumeroDois("");
    setSimbolo("");
    setUsarPorcentagem(false);
    setUsarResultado(false);
  }

  function porcentagem() {
    if (numeroUm !== "") {
      setUsarPorcentagem(true);
    }
  }

  function adicionarPonto() {
    if (numeroUm === "") {
      setNumeroUm("0.");
    } else if (!numeroUm.includes(".")) {
      setNumeroUm(numeroUm + ".");
    }
  }

  return (
    <div className="content">
      <div className="calculadora">
        <div className="calculadoraHeader">
          <p className="equacao">{numeroDois}</p>
          <p className="solucao">
            {simbolo} {numeroUm} {usarPorcentagem ? "%" : ""}
          </p>
        </div>
        <div className="botoes">
          <div className="linhas">
            <Botao text={"CE"} background={"#616161"} color={"#A5A5A5"} onClick={() => limpar()} />
            <Botao text={"C"} background={"#616161"} color={"#A5A5A5"} onClick={() => limparTudo()} />
            <Botao text={"%"} background={"#616161"} color={"#A5A5A5"} onClick={() => porcentagem()} />
            <Botao text={"/"} background={"#005DB2"} color={"#339DFF"} onClick={() => conta("/")} />
          </div>
          <div className="linhas">
            <Botao text={"7"} background={"#616161"} color={"#29A8FF"} onClick={() => adicionarNumero(7)} />
            <Botao text={"8"} background={"#616161"} color={"#29A8FF"} onClick={() => adicionarNumero(8)} />
            <Botao text={"9"} background={"#616161"} color={"#29A8FF"} onClick={() => adicionarNumero(9)} />
            <Botao text={"*"} background={"#005DB2"} color={"#339DFF"} onClick={() => conta("*")} />
          </div>
          <div className="linhas">
            <Botao text={"4"} background={"#616161"} color={"#29A8FF"} onClick={() => adicionarNumero(4)} />
            <Botao text={"5"} background={"#616161"} color={"#29A8FF"} onClick={() => adicionarNumero(5)} />
            <Botao text={"6"} background={"#616161"} color={"#29A8FF"} onClick={() => adicionarNumero(6)} />
            <Botao text={"-"} background={"#005DB2"} color={"#339DFF"} onClick={() => conta("-")} />
          </div>
          <div className="linhas">
            <Botao text={"1"} background={"#616161"} color={"#29A8FF"} onClick={() => adicionarNumero(1)} />
            <Botao text={"2"} background={"#616161"} color={"#29A8FF"} onClick={() => adicionarNumero(2)} />
            <Botao text={"3"} background={"#616161"} color={"#29A8FF"} onClick={() => adicionarNumero(3)} />
            <Botao text={"+"} background={"#005DB2"} color={"#339DFF"} onClick={() => conta("+")} />
          </div>
          <div className="linhas">
            <BotaoZero text={"0"} background={"#616161"} color={"#29A8FF"} onClick={() => adicionarNumero("0")} />
            <Botao text={"."} background={"#005DB2"} color={"#339DFF"} onClick={() => adicionarPonto()} />
            <Botao text={"="} background={"#005DB2"} color={"#339DFF"} onClick={() => resultado()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
