import * as React from "react"
import {Button, Image, View, Platform, StyleSheet, } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"

export default class PickImage extends React.Component{
    state={
        image:null
    }
    getPermissions = async()=>{
        if(Platform.OS !== "web"){
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (status !== "granted"){
                alert("not working lol");
            }
        
        }
    };
componentDidMount(){
    this.getPermissions()
}
pickImage = async()=>{
    try{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        if(!result.cancelled){
            this.aetState({image: result.data})
            console.log(result.uri)
            this.uploadImage(result,uri)
        }
    }
    catch(E){
        console.warn(E)
    }

}

uploadImage=async(uri)=>{
    const data = new FormData()
    let fileName = uri.split("/")[uri.split("/").length-1]
    let type = `image/${uri.split(".")[uri.split(".").length-1]}`
    const fileToUpload = {
        uri:uri,
        name:fileName,
        type:type
    }
    data.append("digit",fileToUpload)
    fetch("         /predict-digit",{
        method:"POST",
        body:data,
        headers:{
            "contrnt-type": "multipart/form-data"
        }
    })
    .then((response)=>response.jason())
    .then((result)=>{
        console.log("succefdwsgsdgdsgs", result)
    })
    .catch((error)=>{
        console.error("Errr",error)
    })
}
    render(){
        let {image} = this.state
        return(
            <View style = {styles.container}>
                <Button title="Pick an from cam" onPress={this.PickImage}></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:"center",
        justifyContent:"center"
    }
    
})