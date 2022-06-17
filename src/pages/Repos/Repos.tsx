import React, { useRef, useState } from 'react';
import IPage from '../../interfaces/page';
import { useLocation, useParams } from 'react-router-dom';
import api from '../../services/api';
import { FiStar, FiUsers, FiMail, FiShare2, FiCircle, FiBook} from 'react-icons/fi';
import './style.css';

const Repo: React.FunctionComponent<IPage> = props => {
    
    const {state} = useLocation();
    const data: any = state;
    const user: any = data.user;
    const [repos, setRepos] = useState([]);
    const params = useParams();
    
    useState(() => {
        let userName = params.busca;
        api.get(`${userName}/repos`)
          .then((response) => {
              response.data.map((r: any) => {
              let index = r['updated_at'].indexOf("T");
              let first = r['updated_at'].substr(0, index); // Gets the first part
              r['updated_at'] = first;
                })
              setRepos(response.data)
        }).catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
    });
    

    return (
        <div className="container">
            <h4 className='text-center pt-3'><FiBook></FiBook> Repositórios <span className="border rounded-circle px-1 bg-light">{user.public_repos}</span> </h4>
            <section className="d-flex justify-content-center mt-5">
                <div className="col-5">
                   <img className="img-thumbnail rounded-circle" src={user.avatar_url} ></img>
                   <h3>{user.name}  </h3>
                   <p className="text-muted">{user.login}</p>
                   <a className="button btn btn-success">Follow</a>
                   <p><strong>@{user.login}</strong></p>
                   <p><FiUsers></FiUsers> {user.followers} <span className='text-muted'>followers </span>- {user.following} <span className='text-muted'>following</span> - <FiStar></FiStar> {user.public_gists}</p>
                   <p><FiMail></FiMail> {user.email ? user.email : 'E-mail não informado'}</p>
                   <hr />
                </div>
                <div className="col-1"></div>
                <div className="col-6">
                    <ul className='list-group list-group-flush'>
                        {repos.map(items => (
                        <li className="list-group-item" key={items['id']}>
                            <h4 className='text-primary'>{items['name']}</h4>
                            <p>{items['forked']}</p>
                            <p>{items['description']}</p>
                            <p>
                                <span className="spacing"><FiCircle></FiCircle> {items['language'] ? items['language'] : 'Não informado'}</span>
                                <span className="spacing"><FiShare2></FiShare2> {items['forks_count']}</span>
                                <span className="spacing">Atualizada em {items['updated_at']}</span>
                            </p>   
                            {/* <p>{Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(items['updated_at'])}</p>   */}
                            
                            
                                               
                        </li>
                        ))}
                    </ul>
                </div>
                
            </section>
        </div>
    )
}

export default Repo;