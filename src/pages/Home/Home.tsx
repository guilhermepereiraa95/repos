import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IPage from '../../interfaces/page';
import { FiSearch } from 'react-icons/fi';

import './style.css';

import api from '../../services/api';

const Home: React.FunctionComponent<IPage> = props => {

    let loading = false;
    const [busca, setBusca] = useState('');
    const navigate = useNavigate();

    async function handleSearch(e: any) {
        loading = true;        
        console.log(loading)
        e.preventDefault();
        
        setTimeout(() => {
            try {
                if(busca){
                    api.get(`${busca}`)
                    .then(response => {
                        if(response.data && response.status === 200){
                            navigate(`${busca}/repos`, {replace: true, state: { user: response.data}})
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
        }, 1000)
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