import { useState } from "react";
import styles from "../styles/TaskList.module.css";

/*

#########################
##################TAREFAS
#########################

[x] - apresenta os elementos numa lista não ordenada
        ul -> a lista
        map -> mapear os itens
                li -> os itens

[x] - quando clicas numa checkbox de um item, deves marcá-lo como concluído
        <input > checkbox ->    a checkbox
        onChange ->              detetar o clique na checkbox e em qual
            setState -> alterar o item clicado para concluido

[x] - apresenta os itens concluídos como rasurados
        Renderização condicional
            Se concluido
                adicionar uma classname que rasure

[x] - todos os itens não concluídos devem ser editáveis
        botao editar ->
            onClick -> 
                Se o item não estiver concluído
                    transformar o texto num <input />
                se tiver concluido
                    botão está disabled


[x] - deve ser possível adicionar elementos à lista
        setState()
            do state anterior + elementoASerAdicionado

[ ] - deve ser possível remover elementos da lista
         setState()
            do state anterior - elementoASerRemovido

#########################
####################DADOS
#########################

editar -> idx ? elementoDaLista (o elemento que está a ser editado)
lista -> Array(elementoDaLista)
    
    elementoDaLista -> {texto: string, concluido: boolean}


*/

const listaInicial = [
  { texto: "Jantar sushi", concluido: false },
  { texto: "Estudar", concluido: false },
  { texto: "Treinar", concluido: false },
  { texto: "Compras do mês", concluido: false },
  {
    texto: "Gastar horas e horas a ver séries sem necessidade",
    concluido: false,
  },
];

/*
[
    <li>Comprar leite</li>,
    <li>Acordar</li>,
    <li>Comprar Leitão</li>,
    <li>etc</li>,
]
*/

function TaskList(props) {
  const [lista, setLista] = useState(listaInicial);
  const [editingIdx, setEditIdx] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  // const [state, setState] = useState({
  //     lista: listaInicial,
  //     editing: {
  //         idx: null,
  //         value: ""
  //     }
  // })

  //const tudo = useState(listaInicial)
  //tudo[0] //O State
  //tudo[1]() //O SetState

  const handleCheck = (indice) => {
    setLista((listaAnterior) =>
      listaAnterior.map((item, idx) =>
        idx === indice
          ? { texto: item.texto, concluido: !item.concluido }
          : item
      )
    );
  };

  const handleEdit = (indice) => {
    setEditIdx((previousIdx) => {
      //Esta a confirmar
      if (previousIdx === indice) {
        setLista((listaAnterior) =>
          listaAnterior.map((item, idx) =>
            previousIdx === idx
              ? { texto: editingValue, concluido: item.concluido }
              : item
          )
        );
        setEditingValue("");
        return null;
      }

      return indice;
    });
    setEditingValue(lista[indice].texto);
  };
  const handleChange = (evento) => {
    setEditingValue(evento.target.value);
  };

  const addElement = () => {
    setEditingValue("");
    setLista((listaAnterior) => [
      ...listaAnterior,
      { texto: "", concluido: false },
    ]);
    setEditIdx(lista.length);
  };

  const removeElement = (indice) => {
    setLista((listaAnterior) =>
      listaAnterior.filter((item, idx) => idx !== indice)
    );
    setEditIdx(null);
  };

  const clearList = () => {
    setLista([]);
    setEditIdx(null);
    setEditingValue("");
  };

  return (
    <div className={styles.all}>
      <ul className={styles.list}>
        {lista.map((item, idx) => (
          <li
            className={styles.listItem}
            key={`${item.texto} ${item.concluido} ${idx}`}
          >
            <input
              onChange={() => handleCheck(idx)}
              checked={item.concluido}
              type="checkbox"
            />

            {idx === editingIdx ? (
              <input
                autoFocus={true}
                value={editingValue}
                onChange={(e) => handleChange(e)}
              />
            ) : (
              <span className={item.concluido ? styles.concluido : ""}>
                {item.texto}
              </span>
            )}

            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => handleEdit(idx)} disabled={item.concluido}>
                {editingIdx === idx ? "Confirmar" : "Editar"}
              </button>
              <button onClick={() => removeElement(idx)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => addElement()}>Adicionar</button>
        <button onClick={() => clearList()}>Limpar</button>
      </div>
    </div>
  );
}

export { TaskList };
