import React, { Component, useState } from 'react';
import { ActivityIndicator,FlatList, SafeAreaView, StatusBar,StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Animated, Platform, } from 'react-native';
import { color } from 'react-native-reanimated';
 
export default class MyApp extends Component<{}>
{
 
    constructor()
    {
        super();
        this.state = {  
          Songlist: [],
          loading : false,
        }
 
    }
    componentDidMount() {
      this.CallApiForRestaurantList();
    }
    
// Animation State For Show Activity Indicator
    showLoading() {
        this.setState({loading: true})
     }
 // Animation State For Hide Activity Indicator
     hideLoading() {
        this.setState({loading: false})
     }

//Render
     
    render()
    {
        return(
            <View style = { styles.MainContainer }> 
                <View style = {styles.headerStyle}>
                    <Text style = {styles.headerTextStyle}>SONGS</Text>
                <View style={[styles.container, styles.horizontal]}>
      
        <ActivityIndicator animating={false} size="large" color="#00ff00" />
      </View>
                </View>

                <FlatList
              data={this.state.Songlist}
                renderItem={({ item, index}) => 
                (
                  <View style={styles.FlatListMainViewStyle}>
                    <View style = {{flexDirection:'row',justifyContent:'flex-start'}}>
                   <View style = {styles.ViewImageStyle}>
                       {item.artworkUrl100 != ''?
                   <Image source={{uri: item.artworkUrl100}} style={{width: 100, height: 100,borderRadius:8}} /> :
                     <Image source = {require('../assets/Image/dummy.png')} style = {{width: 20, height: 20 }}/> 
                }
                    </View>
                    <View style = {{justifyContent:'center'}}>
                    <Text style={styles.TrackNameStyleText}>{item.trackName}</Text>
                    <Text style={styles.ArtistNameTextStyle}>{item.artistName}</Text>
 
                    </View>
                    </View>
                    
                    </View>
                )}
                />
                {this.state.loading &&
                  <View style={styles.loading}>
                      <ActivityIndicator size={'large'} color={'#297fca'}/>
                  </View>
                  }
                </View>
                );
    }

    // API Called

    CallApiForRestaurantList(accessToken) {
        this.showLoading()
      fetch('https://itunes.apple.com/search?term=Michael+jackson', 
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        
        .then(res => {
            this.hideLoading()
            this.setState({Songlist: res.results});
        //   }
        })
        .catch(error => {
            this.hideLoading()
          alert('No Data Found');
        });
    }
  }

// Style sheet
const styles = StyleSheet.create(
{
    MainContainer:
    {
        flex: 1,
        backgroundColor: '#e4f1fd',
        // paddingTop: (Platform.OS == 'ios') ? 40 : 0,
    },
    container: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      },
      headerStyle: {
        backgroundColor:'#297fca',
        height:80,
        justifyContent:'center',
        alignItems:'center'
      },
      headerTextStyle: {
        color: 'white',
        fontWeight:'600',
        fontSize:17,
        top:'55%'
      },
      loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    FlatListMainViewStyle:{
      flex:1,
      backgroundColor:'#fffcf6',
      marginTop:0,
      marginBottom:1
    },
    ViewImageStyle:{
      width:100,
      height:100, 
      backgroundColor:'#e4f1fd',
      borderRadius:8,
      justifyContent:'center',
      alignItems:'center',
      marginTop:20,
      marginLeft:10,
      marginBottom:20
    },
    TrackNameStyleText:{
      marginTop:5,
      marginLeft:30,
      fontSize:15,
      fontWeight:'600',
      color:'#297fca'
    },
    ArtistNameTextStyle:{
      marginTop:5,
      marginBottom:5,
      marginLeft:30,
      fontSize:15,
      fontWeight:'300',
      color:'#297fca'
    }

    
});