import logo from './logo.svg';
import styles from './App.module.scss';

function App() {
  return (
    <div className='App'>
      <header className={styles.App}>
        <img src={logo} className='App-logo' alt='logo' />
        <p className={styles.App}>
          Edit <code>src/App.js</code> and save to reload yoyoyoyoyoy.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
