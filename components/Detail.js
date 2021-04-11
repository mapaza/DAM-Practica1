import React, { useState, useEffect } from 'react';
import { View, Text, Image, SafeAreaView,StyleSheet,TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
// import Sound Component
import Sound from 'react-native-sound';

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor:'#BC7CB1',
        paddingVertical: 10,
        marginHorizontal:10,
        width: '100%',
        backgroundColor:'#F8E9F2'
    },
    imagen: {
        padding: 5
    },
    boton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },contain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }
})


function Detail({ route }) {
    const { imagen,titulo, artist, album, duracion, preview} = route.params;
    const [letra, setLetra] = useState([])
    const [reproducir, setReproducir] = useState(false)

    useEffect(() => {
        fetch(
            `https://api.lyrics.ovh/v1/${artist}/${titulo}`
        )
        .then(res => res.json())
        .then(
            result => {
                setLetra(result.lyrics)
            },
        )
    }
    )
    const PlaySound = () =>{
        setReproducir(!reproducir)
        Sound.setCategory('Playback');
        var myRemoteSound = new Sound(preview,null,(error)=>{
        if(error){
        console.log(error);
        return;
        }else{
        myRemoteSound.play((success)=>{
        if(success){
        console.log('Sound playing')
        }else{
        console.log('Issue playing file');
        }
        })
        }
        });
        myRemoteSound.setVolume(0.9);
        myRemoteSound.release();
        }
    return (
        <SafeAreaView>
            <ScrollView>
            <LinearGradient
            colors={['#D9ADD1', 'white']}
            style={styles.contain}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            >
            <View style={{backgroundColor:'#F3EDF4',margin:20, borderRadius:40}}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 30,marginTop:30}}>{titulo}</Text>
                    <Image source={{uri: imagen}} style={{width: 300, height: 300, borderRadius: 50, marginHorizontal: 30, marginVertical:40}}/>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom:20 }}>
                    {reproducir ?
                        <TouchableOpacity disabled='true'
                        onPress={()=>PlaySound()}
                        style={{justifyContent:'center'}}>
                            <Text style={{ backgroundColor: '#EA4852', color:'white', borderRadius:30, padding:20}}>♫  Playing  ♫</Text>
                        </TouchableOpacity>
                        :  <TouchableOpacity 
                        onPress={()=>PlaySound()}
                        style={{justifyContent:'center'}}>
                        <Text style={{ backgroundColor: '#BC7CB1', color:'white', borderRadius:30, padding:20}}>PLAY  ➤</Text>
                        </TouchableOpacity>
                        }
                     </View>
                    <Text style={{textAlign: 'justify', width: '80%', fontSize: 18}}>Artista: {artist}</Text>
                    <Text style={{textAlign: 'justify', width: '80%', fontSize: 18}}>Album: {album}</Text>
                    <Text style={{textAlign: 'justify', width: '80%', fontSize: 18}}>Duración: {duracion} seg.</Text>
                </View>
                
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 30,marginVertical:10}}>Lyrics</Text>
                    {letra  ? <Text style={{textAlign: 'center',fontSize: 18, padding:20}}>{letra}</Text>
                    : <Text style={{textAlign: 'center',fontSize: 18, padding:20}}>No hay Letras disponibles para esta canción :( {"\n"} Busque otra! </Text>}
                        
                </View>
            </View>
            </LinearGradient>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Detail