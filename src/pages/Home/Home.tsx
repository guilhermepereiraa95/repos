import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IPage from '../../interfaces/page';
import { FiSearch } from 'react-icons/fi';

import api from '../../services/api';

const Home: React.FunctionComponent<IPage> = (props) => {

    const [busca, setBusca] = useState('');
    const navigate = useNavigate();
    
    // AO SUBMETER O FORMULARIO, FAZ A BUSCA NA API E CHAMA A ROTA DOS REPOSITORIOS JA PASSANDO O OBJ DO USER
    async function handleSearch(e: any) {
        e.preventDefault();
            try {
                if(busca){
                    api.get(`${busca}`)
                    .then(response => {
                        if(response.data && response.status === 200){
                            navigate(`${busca}/repos`, {state: { user: response.data}})
                        } else {
                            alert('Usuário não encontrado no github. Verifique se você digitou o nome corretamente.');
                        }
                    }).catch((err) => {
                        alert('Ocorreu um erro na sua requisição: ' + err);
                    });
                } else {
                    alert('Informe um nome de usuário válido do github');
                }
            } catch (error){
                alert(error);
            }
    }

    return (
        <div className="container">
            <section>
                <h3 className='text-center'>Buscar repositório no Github</h3>
                <form onSubmit={handleSearch}> 
                <div id="input">
                    <input
                        placeholder="Digite o usuário do desenvolvedor"
                        value={busca}
                        className="form-control"
                        onChange={e => setBusca(e.target.value)}
                    />              
                </div>
                <div>
                    <button className="btn btn-secondary" type="submit">                
                    Buscar <FiSearch></FiSearch>               
                    </button>  
                </div>             
                </form>
            </section>
        </div>
    )
}

export default Home;