import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration';
import UserDetails from './components/UserDetails';

function App() {
  return (
   <Router>
    <Switch>
      <Route path = '/' exact component = {Registration} />
      <Route path = '/show-information' exact component = {UserDetails} />
    </Switch>
   </Router>
    // <Registration/>
    
  );
}

export default App;
