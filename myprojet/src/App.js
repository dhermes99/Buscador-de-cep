import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';


function App() {
  
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});


  async function handleSearch(){
    if(input === ''){
      alert("PREENCHA ALGUM CEP!")
      return;
    }

    try{
        const response = await api.get(`${input}/json`);
        setCep(response.data)
        setInput("");
    }catch{
        alert("Erro ao buscar CEP");
        setInput("")
    }

  }
  
  
  return (
    <div className="container">
    <h1 className="title">Buscador de cep</h1>
    
      <div className="containerInput">
        <input type="text" placeholder="Digite seu CEP.."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#00"/>
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">

          <h2>CEP : {cep.cep}</h2>

          <span>RUA : {cep.logradouro}</span>
          <span>BAIRRO : {cep.bairro}</span>
          <span>{cep.localidade}-{cep.uf}</span>
          

      </main>

      )}
      

    </div>
  );
}

export default App;
