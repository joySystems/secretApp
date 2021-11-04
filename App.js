import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Button, Platform, SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-ico-material-design';

export default class App extends Component {
   state = {
    targetUrl : 'https://secretnight.ru/profile'
    
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
      
      
      true; // note: this is required, or you'll sometimes get silent failures
    `;

    const run = `
      
     // document.querySelector('.nav').style.display = "none";
      true;
    `;
    setTimeout(() => {
      this.webref.injectJavaScript(run);
    }, 1000);

    return (
      <SafeAreaView style={styles.container}>
       <StatusBar
        
        backgroundColor="#007BFF"
        
        
         />
        <WebView style={{marginTop:25}}
          ref={(r) => (this.webref = r)}

          source={{
            uri: this.state.targetUrl,
          }}
          injectedJavaScriptBeforeContentLoaded={runFirst}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}

        />



<View >




</View>



      </SafeAreaView>
    );
  }
  handleWebViewNavigationStateChange = (newNavState) => {
   
    const { url } = newNavState;
    if (!url) return;

    if (url.includes('https://secretnight.ru')) {
      
      const hideBlocks = `
      //document.body.style.backgroundColor = 'blue';
      document.querySelector('.nav[data-v-65e1c47c]').style.display = "none";
      true;
    `;

      this.webref.injectJavaScript(hideBlocks);
    }

    
   
    
  };



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});