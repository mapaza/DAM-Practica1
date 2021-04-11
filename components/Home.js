import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, FlatList, StyleSheet,SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        fontFamily:'Poppins',
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
        justifyContent:'center',
      }
})

function Item(props){
    return(
        <View style={styles.contenedor}>
            <View style={styles.imagen}>
                <Image source={{uri: props.image}} style={{width: 80, height: 80}}/>
            </View>
            <View style={{width: 250, height: 80, marginRight: 10, justifyContent: 'center'}}>
                <Text numberOfLines={1} style={{ fontFamily:'Poppins',fontWeight: 'bold',fontSize: 20}}>{props.titulo}</Text>
                <Text numberOfLines={2} style={{fontFamily:'Poppins', fontSize: 15}}>{props.album}</Text>
                
            </View>
            <View style={styles.boton}>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('Details',{
                    imagen: props.image,
                    titulo: props.titulo,
                    album: props.album,
                    artist: props.artist,
                    duracion: props.duracion,
                    preview: props.preview
                })}
                >
                <Text style={{ backgroundColor: '#BC7CB1', color:'white', borderRadius:30, padding:20}}>➤</Text>
            </TouchableOpacity>
            </View>
            
        </View>
    )
}

function Home({ navigation }) {
    const [lista, setLista] = useState([])
    const [artista, setArtista] = useState("")

    const handleChange = (event) => {
        const value = event.nativeEvent.text
        console.log(event.nativeEvent.text)
        setArtista(value)
    }
   
    useEffect(() => {
        fetch(
          `https://api.lyrics.ovh/suggest/${artista}`
        )
        .then(res => res.json())
        .then(
            result => {
                setLista(result.data)
            },
        )
    }
    )
    return (
        <LinearGradient
        colors={['#D9ADD1', 'white']}
        style={styles.contain}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        >
        <View style={{display: 'flex', flexDirection:'row',backgroundColor:'#F8E9F2',width:'100%',height:80}}>
            <TextInput 
            onChange={handleChange}
            style={{marginTop:15,marginLeft:25,backgroundColor:'#ffff', borderRadius:20, borderWidth: 1, borderColor:'purple',fontSize:15,height:50,width:430}}
            placeholder='  🔍 Buscar Artista ...'></TextInput>
        </View>
        <View style={{flex: 1,alignItems: 'center', justifyContent: 'center',backgroundColor:'#F8E9F2' }}>
        <FlatList
            data={lista.length > 0 ? lista : []} renderItem={({item})=>{
                return(
                <Item 
                image={item.album.cover_big} 
                titulo={item.title} 
                album={item.album.title} 
                artist={item.artist.name} 
                duracion={item.duration} 
                preview = {item.preview}
                navigation={navigation} />)
            }}
            keyExtractor = {item => item.id}
        />
        </View>
        </LinearGradient>
    );
}

export default Home