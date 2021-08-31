import './App.css';
import {BrowserRouter, BrowserRouter as Router, Route} from 'react-router-dom'
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/authhook';
import { useRoutes } from './routes';
import './common/scss/index.scss'

import createHistory from 'history/createBrowserHistory'
const history = createHistory();


function App() {
  const {login,logout, token, userId, isReady, rolek} = useAuth()
  const isLogin = !!token
  const isInAdmin = rolek === 1
  const routes = useRoutes(isLogin, isInAdmin)
  
  return (
    <AuthContext.Provider value = {{login,logout, token, userId, isReady, isLogin, rolek}}>
      <BrowserRouter history={history}>
        {routes}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
