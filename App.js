import {
  StatusBar
} from 'expo-status-bar';
import React, {
  Component
} from 'react';
import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  BackHandler
} from 'react-native';
import {
  WebView
} from 'react-native-webview';
import Icon from 'react-native-ico-material-design';


var iconWidth = 24;
var iconHeight = 24;

export default class App extends Component {
  state = {
    targetUrl: 'https://secretnight.ru'

  }

  webView = {
    canGoBack: false,
    ref: null,
  }


  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  }

  UNSAFE_componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onAndroidBackPress);
    }
  }

  UNSAFE_componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }


  changeUrl = (url) => {
    console.log(url + " is changed");
    this.setState({
      targetUrl: url
    })

  }



  render() {
    const runFirst = `
      window.isNativeApp = true;
      window.isNative = true;
      
      true; // note: this is required, or you'll sometimes get silent failures
    `;

    const run = `
      
      document.querySelector('.nav').style.display = "none";
      true;
    `;


    setTimeout(() => {
      this.webView.ref.injectJavaScript(run);
    }, 1000);



    return ( <SafeAreaView style = {styles.container} >
      <StatusBar backgroundColor = "#007BFF"  />
      < WebView style = {{marginTop: 25}}

      ref = {
        (webView) => {
          this.webView.ref = webView;
        }
      }

      source = {
        {
          uri: this.state.targetUrl,
        }
      }

      userAgent = "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"
      originWhitelist = {
        ["https://*", "http://*", "file://*", "sms://*"]
      }

      injectedJavaScriptBeforeContentLoaded = {
        runFirst
      }

      onNavigationStateChange = {
        this.handleWebViewNavigationStateChange
      }


      />



      <View style = {[styles.NavContainer, styles.elevation]} >

      <View style = {[styles.NavBar]}>

      <Pressable onPress = {
        () => {
          this.changeUrl('https://secretnight.ru/dashboard')
        }
      }
      style = {
        [styles.IconBehave]
      }
      android_ripple = {
        {
          borderless: true,
          radius: 50
        }
      } >


      <Icon name = "home-button"
      height = {
        iconHeight
      }
      width = {
        iconWidth
      }
      color = "#007bff" / >

      </Pressable>

      <Pressable onPress = {
        () => {
          this.changeUrl('https://secretnight.ru/participated')
        }
      }
      style = {
        [styles.IconBehave]
      }
      android_ripple = {
        {
          borderless: true,
          radius: 50
        }
      } >

      <Icon name = "favorite-heart-button"
      height = {
        iconHeight
      }
      width = {
        iconWidth
      }
      color = "#007bff" / >


      </Pressable>

      <Pressable onPress = {
        () => {
          this.changeUrl('https://secretnight.ru/profile')
        }
      }
      style = {
        [styles.IconBehave]
      }
      android_ripple = {
        {
          borderless: true,
          radius: 50
        }
      } >

      <Icon name = "user-shape"
      height = {
        iconHeight
      }
      width = {
        iconWidth
      }
      color = "#007bff" / >

      </Pressable> 
      </View> 
      </View>



      </SafeAreaView>
    );
  }


  
  handleWebViewNavigationStateChange = (newNavState) => {

    const {
      url
    } = newNavState;

    this.webView.canGoBack = newNavState.canGoBack;

    if (!url) return;

    if (url.includes('https://secretnight.ru')) {

      const hideBlocks = `
      //document.body.style.backgroundColor = 'blue';
      document.querySelector('.nav[data-v-65e1c47c]').style.display = "none";
      true;
    `;

      this.webView.ref.injectJavaScript(hideBlocks);
    }




  };



}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  NavContainer: {
    //flex: 0.08,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: "rgba(52,58,64,.1)",
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,


  },


  elevation: {
    elevation: 20,
    shadowColor: '#000',

  },
  NavBar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#f8f9fa'
  },


  IconBehave: {

    padding: 20,


  }

});