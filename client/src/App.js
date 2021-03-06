import './App.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Landing from './components/layouts/Landing'
import Navbar from './components/layouts/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layouts/Alert'
import Dashboard from './components/dashboard'
import CreateProfile from './components/profile-forms/CreateProfile'
import EditProfile from './components/profile-forms/EditProfile'
import AddExperience from './components/profile-forms/AddExperience'
import Profiles from './components/profiles/Profiles'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import Profile from './components/profile'
import AddEducation from './components/profile-forms/AddEducation'
// redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './components/routing/PrivateRoute'


if (localStorage.token) {
   setAuthToken(localStorage.token)
}

function App() {
   useEffect(() => {
      store.dispatch(loadUser())
   }, [])
   return (
      <Provider store={store}>
         <Router>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <section className="container">
               <Alert />
               <Switch>
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/profiles' component={Profiles} />
                  <Route exact path='/profile/:id' component={Profile} />
                  <PrivateRoute exact path='/posts' component={Posts} />
                  <PrivateRoute exact path='/posts/:id' component={Post} />
                  <PrivateRoute exact path='/dashboard' component={Dashboard} />
                  <PrivateRoute exact path='/create-profile' component={CreateProfile} />
                  <PrivateRoute exact path='/edit-profile' component={EditProfile} />
                  <PrivateRoute exact path='/add-experience' component={AddExperience} />
                  <PrivateRoute exact path='/add-education' component={AddEducation} />
               </Switch>
            </section>
         </Router>
      </Provider>
   )
}

export default App
