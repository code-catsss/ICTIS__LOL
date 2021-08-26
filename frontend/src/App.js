import './App.css';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import {BrowserRouter, BrowserRouter as Router, Route} from 'react-router-dom'
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/authhook';
import { useRoutes } from './routes';
import './common/scss/index.scss'


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      'Raleway',
    ].join(','),
    h1: {
      fontFamily: 'Raleway',
      fontSize: 100,
    },
    h2:{
      fontFamily: 'Raleway',
      fontSize: '100%',
    },
    button:{
      fontFamily: 'Raleway'
    }
  },
});


function App() {
  const {login,logout, token, userId, isReady, rolek} = useAuth()
  const isLogin = !!token
  const isInAdmin = rolek === 1
  const routes = useRoutes(isLogin, isInAdmin)
  
  
  return (
    <AuthContext.Provider value = {{login,logout, token, userId, isReady, isLogin, rolek}}>
    <ThemeProvider theme = {theme}>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
