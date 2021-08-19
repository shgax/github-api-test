import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import { Form, Card, Image, Icon } from 'semantic-ui-react';
import { useEffect, useState } from 'react';

function App() {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://api.github.com/users/example`)
      .then(res => res.json())
      .then(data => {
        setData(data);
      });
  }, []);

  const setData = ({
    name, login, followers, following, public_repos, avatar_url
  }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value)
  }

  const handleSubmit = () => {
    fetch(`https://api.github.com/users/${userInput}`)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setError(data.message);
        }else{
          setData(data); 
          setError(null)
        }
      });
  };


  return (
    <div>
      <div className='navBar'>Github Search Project</div>
      <div className='search'>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input placeholder='Github user' name='github user' onChange={handleSearch}/>
            <Form.Button content='Search' />
          </Form.Group>
        </Form>  
      </div>
      { error ? (
        <h1>{error}</h1>
      ) : (
        <div className='card'>
          <Card>
            <Image src={avatar} wrapped ui={false} />
            <Card.Content>
              <Card.Header>{name}</Card.Header>
              <Card.Header>{username}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {followers} Followers
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {repos} Repos
              </a>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                {following} Following
              </a>
            </Card.Content>
          </Card>
        </div>)}
      
    </div>
  );
}

export default App;
