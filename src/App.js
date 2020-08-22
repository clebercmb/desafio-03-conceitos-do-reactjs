import React, {useState, useEffect} from "react";
import axio from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])
  const [title, setTitle] = useState("")


  useEffect(()=> {
    axio.get('repositories').then(response => {
      console.log(response)
      setRepositories(response.data)
    })

  }, [])

  async function handleAddRepository() {
    // TODO
    let id = document.querySelector('#id').value;
    let title = document.querySelector('#title').value;
    let url = document.querySelector('#url').value;
    let techs = document.querySelector('#techs').value;

    console.log('title=', title);
    const response = await axio.post('repositories', {
      url: url,
      title: title,
      techs: techs.split(',')    
    });

    console.log('response:', response);
    setRepositories([...repositories, response.data]);
    
  }

  async function handleRemoveRepository(id) {
    // TODO
    console.log('ID=',id)
    
    const response = await axio.delete(`repositories/${id}`);
    console.log('response=', response);

    setRepositories(repositories.filter(repositorie=>repositorie.id !=id ))

  /*   console.log('INITIAL: repositories=', [...repositories]);
    let newRepositories = repositories;

    let repositoryIndex = newRepositories.findIndex(repository=>repository.id === id );

    console.log('repositoryIndex=', repositoryIndex.toString())

    console.log('BEFORE: newRepositories=', [...newRepositories]);
    newRepositories.splice(repositoryIndex, 1);
    console.log('AFTER: newRepositories=', [...newRepositories]);

    console.log('BEFORE II: repositories=', [...repositories]);
    setRepositories([...newRepositories])
     console.log('AFTER II: repositories=', [...repositories]); */
  
  }


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map (repositorie=> (
            <li key={repositorie.id}>
              <label className='repository-list-title'>{repositorie.title}</label>
              <button className='repoitory-list-button' onClick={() => handleRemoveRepository(repositorie.id)}>
                Remover
              </button>            
            </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
      <div className='new-repositories'>
        <div className='new-repositories-item'>
          <label htmlFor='id'>id:</label>
          <input id='id' name='title' type="text"/> 
        </div>


        <div className='new-repositories-item'>
          <label htmlFor='title'>title:</label>
          <input id='title' name='title' type="text"/> 
        </div>
        
        <div className='new-repositories-item'>
          <label htmlFor='url'>url:</label>
          <input id='url' name='url' type="text"/>
        </div>

        <div className='new-repositories-item'>
          <label htmlFor='techs'>techs:</label>
          <input id='techs' name='techs' type="text"/>
        </div>
      </div>

    </div>
  );
}

export default App;
