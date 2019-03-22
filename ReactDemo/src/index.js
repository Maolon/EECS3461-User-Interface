// React -> manage components
// ReactDOM -> render component
import React, {Component} from 'react'; // 'react' is literally the node_module name
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';


import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

//require API key here
const API_KEY = '';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { videos: [],
                   selectedVideo: null,
                   currentVideo: null ,
                   lanState:true,
                   needhelp:false,
                   emerge:false,
                   login:false
                   };

    this.videoSearch('health')
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({videos: videos,
                     selectedVideo: videos[0],
                     currentVideo:0
                    });
      // Some ES6 syntactic sugar = key and property
      // have the same name ---> this.setState({videos})
    });
  }

  nextVideo=()=>{
    var n = this.state.videos.length;
    var i = (this.state.currentVideo+1)%n;
    var videos = this.state.videos;
    // console.log('this is:', n);
    // console.log(i);
    // console.log(videos);
    this.setState({
      video:videos,
      selectedVideo:videos[i],
      currentVideo: i
    });
    
  }

  prevVideo=()=>{
    var n = this.state.videos.length;
    var i = ((this.state.currentVideo-1)%n+n)%n;
    var videos = this.state.videos;
    // console.log(n);
    // console.log(i);
    this.setState({
      videos:videos,
      selectedVideo:videos[i],
      currentVideo: i,
    });
    console.log('this is:', this);
  }
  
  setENG=()=>{
    this.setState({
       lanState:true
    }
    );
  }

  setFR=()=>{
    this.setState({
      lanState:false
    });
  }

  setEMRGON=()=>{
    this.setState({
      emerge:true
    });
  }

  setEMRGOFF=()=>{
    this.setState({
      emerge:false
    });
  }
  
  setNeedHelpOn=()=>{
    this.setState({
       needhelp:true
    });
  }

  setNeedHelpOFF=()=>{
    this.setState({
       needhelp:false
    });
  }

  setLogin=()=>{
    this.setState({
      login:true
    });  
  }

  onKeyDown=(e)=>{
   // console.log("in");
   //console.log(e);
   // console.log(e.key);
   switch(e.key){
      case 'n':
      case 'N':
      console.log("in");
      this.nextVideo();
      break;
      case 'p':
      case 'P':
      this.prevVideo();
      break;
      case 'H':
      case 'h':
      this.setNeedHelpOn();
      break;
      case 'F':
      case 'f':
      this.setFR();
      break;
      case 'E':
      case 'e':
      this.setENG();
      break;
   } 
  
  }

  componentDidMount(){
    document.addEventListener("keydown", this.onKeyDown)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.onKeyDown)
  }
  

  render() {
  

    // Make a new function that can only be called once every 300 miliseconds
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
   // const engState = this.state.
    return (
      
      <div>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
       
        <h1>User Version</h1>
        <div className="userroot">
        <img className="emergPic" style={{display:this.state.emerge? 'inline' : 'none'}} src="./assets/emerg1.jpg"/>
        <div className="needHelpPop" style={{display:this.state.needhelp? 'inline' : 'none'}}>
          <div className="msgpop">
            <span className="msg">
                <h3 className="ENG" style={{display:this.state.lanState?'inline' : 'none'}}>STAFF IS COMING</h3>
                <br/>
                <h3 className="ENG" style={{display:this.state.lanState?'inline' : 'none'}}>PLEASE STAY HERE</h3>
                <h3 className="FR"  style={{display:this.state.lanState?'none' : 'inline'}}>Le personnel arrive bientôt</h3>
                <br/>
                <h3 className="FR"  style={{display:this.state.lanState?'none' : 'inline'}}>SVP RESTEZ ICI</h3>
            </span>
            <br/>
            <button className = "userBnt" onClick={this.setNeedHelpOFF}>
              <span className="ENG" style={{display:this.state.lanState?'inline' : 'none'}} >Cancel</span>
              <span className="FR"  style={{display:this.state.lanState?'none' : 'inline'}}>Annuler</span>
            </button>
          </div>
          <div className="whiteback"></div>
        </div>
        <div className="buttonclosure">
         
       </div>
        <div className="widgetclosure">
        <div className="upperwidget">
        <div className="youtubeclosure">
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} /> {/* passing props */}
        </div>
        <div className="upperright">
          <div className="weather">
            <img className="imgmap" src="./assets/weather.png"/>
          </div>
          <div className="map">
            <img className="imgweather" src="./assets/map.jpg"/>
          </div>
        </div>
        </div>
        <div className="buttonclosure">
          <button className="userBnt"onClick={this.prevVideo}><i className="fas fa-step-backward"></i>
              <span className="ENG" style={{display:this.state.lanState?'inline' : 'none'}} >PREV</span>
              <span className="FR"  style={{display:this.state.lanState?'none' : 'inline'}}>Précédent</span>
          </button>
          <button className="userBnt" onClick={this.nextVideo}><i className="fas fa-step-forward"></i>
              <span className="ENG" style={{display:this.state.lanState?'inline' : 'none'}}>Next</span>
              <span className="FR"  style={{display:this.state.lanState?'none' : 'inline'}}>SUIVANT</span>
          </button>
          <button className="lanBnt"onClick={this.setENG}>
              English
          </button>
          <button className="lanBnt" onClick={this.setFR}>
              Français
          </button>
          <button className="emergBnt" onClick={this.setNeedHelpOn}><i className="fas fa-phone"></i>
              <span className="ENG"style={{display:this.state.lanState?'inline' : 'none'}}>I NEED HELP</span>
              <span className="FR"  style={{display:this.state.lanState?'none' : 'inline'}}>j'ai besoin d'aide</span>
          </button>
        </div>
        </div>
        </div>
        <br/>
        <h1>Staff Version</h1>
        <div className = "Staffroot">
        <div className="loginpage" style={{display:!this.state.login? 'inline' : 'none'}}>
          <div className="loginmain">
            <span className="login">
            <img src="./assets/pollex.png"/>
                <h3>ADMIN LOGIN</h3>
                <br/>
                <input type="text" name="username" placeholder="Username" />
                <br/>
                <br/>
                <input type="password" name="username" placeholder="Password" />
            </span>
            <br/>
            <button className = "loginBnt" onClick={this.setLogin}>
              <span >Login</span>
            </button>
          </div>
          <div className="greenback"></div>
        </div>
          <div className="bar">
           <img src="./assets/bar.jpg"/>
          </div>
          <div className="Content">
     
            <div className="sidebar">
              <img className="imgsidebar"src="./assets/sidebar.jpg"/>
            </div>
            <div className="controllers">
                <div className = "emergency">
                <h3>Emergency</h3>
                <hr/>
                <div>
                  <button className="emgOn"onClick={this.setEMRGON}>
                    EMERGENCY ON
                  </button>
                  <button className="emgOff"onClick={this.setEMRGOFF}>
                    EMERGENCY OFF
                  </button>
                </div>
                </div>
                <div className="searchCtr">
                <h3>Video Control</h3>
                <hr/>
                <h4>Set Keyword</h4>
                <SearchBar onSearchTermChange={videoSearch}/>
                <button className="submitBnt" >
                        submit
                </button>
                <div className="videolists" >
                <VideoList className="staffvideo"
                  onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                  videos={this.state.videos} /> {/* passing props */}
                </div>
                </div>
                <div className="contact">
                <h3>Contact</h3>
                <hr/>
                <span className="Help" style={{display:this.state.needhelp?'inline' : 'none'}}><i className="fas fa-circle"></i>Dinning Hall Display</span>
                </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Create a new component. This component should produce
// some HTML
// This is a factory that produceses instances (functional component, no state)
// const App = () => { // now we have fat arrows, the only difference of
  // function() {} to this new method, is the parameter "this"

  // JS that produces HTML
  //return (
  //  <div>
  //    <SearchBar />
  //  </div>
  //); // This look alike HTML inside JS is JSX (webpack and babel comes to play)

  // This gets transpiled to vanilla JS (ES5)
  // App = function App() {
  //  return React.createElement("div", null, "Hi!"); --> it creates the instance
  // }
//}

// Take this component's generated HTML and put it
// on the page (in the DOM)
// React.createElement(_temporalAssertDefined(App, ""....)
// We are making an instance of an App (self closing tag) and selecting a target
// DOM node (container - check index.html)
// ReactDOM.render(<App />, document.querySelector('.container'));
ReactDOM.render(<App />,document.querySelector('.root'));

