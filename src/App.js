import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Switch,Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

class App extends React.Component {
  
  constructor(){

    super();

    this.state ={

      currentuser : null


    }

    

  }

  unsubscribeFromAuth = null;
  componentDidMount(){

    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth =>{

      if(userAuth){

        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot =>{

          
          this.setState({

            currentuser :{
              id : snapshot.id,
                   ...snapshot.data() 
            }


          }, () => console.log(this.state) )
        })

      }
      


      this.setState({currentuser:userAuth});

    });
  }

  componentWillUnmount(){

    this.unsubscribeFromAuth();
  }


  createUserProfileDocument(){


  }
  

  render(){
    return (
    
      <div>
  
          <Header currentUser = {this.state.currentuser}/>
          <Switch>
         
            <Route exact={true} path='/' component ={HomePage}/>
            <Route  exact={true} path='/shop' component ={ShopPage}/>
            <Route  exact={true} path='/signin' component ={SignInAndSignUp}/>
          
          </Switch>  
      </div>
    
    );


  }
  
 
}

export default App;
