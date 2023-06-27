import "./App.css";
import { TaskList } from "./components/TaskList";
/* [x] - apresenta os elementos numa lista não ordenada
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

function App() {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
}

export default App;
