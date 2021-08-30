import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import {
    Image,
    StyleSheet,
    Text,
    Pressable,
    View
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';


const Detail = ({ route, navigation }) => {
    const blankdata = {
        manufacture: '',
        type: '',
        chassis_no: '',
        engine_no: '',
        color: '',
        trim_no: '',
        displacement: ''
    }
    const [time,setTime] = React.useState(0)
    const [uri, setUri] = React.useState(route.params.uri.path);
    const [data, setData] = React.useState(blankdata);
    const [isLoading, setIsLoading] = React.useState(true);


    const createFormData = () => {
        const data = new FormData();
        data.append('file', {
            name: route.params.uri.modificationDate + '.jpeg',
            type: route.params.uri.mime,
            uri:
                Platform.OS === 'android' ? uri : uri.replace('file://', ''),
        });
        return data;
    };

    callRequest = async () => {
        let start = Date.now();
        fetch('http://carframe.demo2.aimenext.com:9966/api/process', {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + ('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6InNvbm5oOTk2NkBnbWFpbC5jb20iLCJleHAiOjE2Mjk5NjQ2NDQsImlhdCI6MTYyOTEwMDY0NH0.YEPT3LNkGoUj-5m8uBbhf5mA64pdijii_nlYIpuJ631KanVc5v_mInr-DERHwlu00vOir4Y5RpWYUDxBrBCDEaT_39c9iZd0jfabCU2bLhys8qVBth_tlboMmF7OgRMlFaIN64QbnplK1bIcaLFFYp2roeepsQG_RmnYjOBySkn_5PajmYEFhcsEXsFknRZDckvwU2gU466Q89od63grWBLHEqSedy2ohljXhPsaI0dJ7DZ2oAAJ6GGv-KZnuo6FLfCNuh4plxKVJPG7F3lKabh5u1dwM_jDYj0qv-uG2e5Zsqn-9RYZqyhGpl_IidiO4J6CEfOlSlerFMr278ed5A'),
                'Content-Type': 'multipart/form-data',
                'Accept': '*/*'
            }),
            body: createFormData()
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('getting data from fetch', responseJson.dict)
                setData(responseJson.dict)
                setIsLoading(false)
                let end = Date.now();
                console.log('done')
                setTime((end - start)/1000);
            })
            .catch(error => console.log(error));
    }

    function openEdit() {
        ImagePicker.openCropper({
            freeStyleCropEnabled: true,
            cropping: true,
            path: route.params.uri.path,
            waitAnimationEnd: true,
        }).then(image => {
            console.log(image);
            setUri(image.path)
        }).catch(e => {
            alert(e);
        })
    }


    function renderRequirements() {

        return (
            <View style={{ flex: 2.5, marginTop: 24, paddingHorizontal: 24, justifyContent: 'space-around'}}>
                <RequirementDetail
                    label="Manufacture"
                    detail={data.manufacture}
                    color="#E2F0FF"
                />
                <RequirementDetail
                    label="Type"
                    detail={data.type}
                    color="#FFFFFF"
                />
                <RequirementDetail
                    label="Chassis_no"
                    detail={data.chassis_no}
                    color="#E2F0FF"
                />
                <RequirementDetail
                    label="Engine_no"
                    detail={data.engine_no}
                    color="#FFFFFF"
                />
                <RequirementDetail
                    label="Color"
                    detail={data.color}
                    color="#E2F0FF"
                />
                <RequirementDetail
                    label="Trim_no"
                    detail={data.trim_no}
                    color="#FFFFFF"
                />
                <RequirementDetail
                    label="Displacement"
                    detail={data.displacement}
                    color="#E2F0FF"
                />
                <RequirementDetail
                    label="Time"
                    detail={time+'s'}
                    color="#FFFFFF"
                />
            </View>
        )
    }


    const RequirementDetail = ({ color, label, detail }) => {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: color }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 8, color: '#606d87', fontSize:14 }}>{label}</Text>
                </View>
                <View style={{ flex: 2, alignItems: 'flex-end' }}>
                    <Text style={{ marginLeft: 8, color: '#BEC1D2', fontSize:14 }}>{detail}</Text>
                </View>
            </View>
        )
    }

    function renderFooter() {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <Pressable
                    onPress={() => {
                        openEdit()
                    }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#086799' : '#46C0D2'
                        },
                        styles.wrapperCustom
                    ]}>
                    {({ pressed }) => (
                        <Text style={styles.text}>
                            Edit
                        </Text>
                    )}
                </Pressable>
                <Pressable
                    onPress={() => {
                        { callRequest() }
                    }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#086799' : '#46C0D2'
                        },
                        styles.wrapperCustom
                    ]}>
                    {({ pressed }) => (
                        <Text style={styles.text}>
                            Check
                        </Text>
                    )}
                </Pressable>
            </View>
        )
    }

    function renderBlank() {
        return (
            <View style={{ flex: 2.5, marginTop: 24, paddingHorizontal: 24, justifyContent: 'space-around' }}>

            </View>
        )
    }
    return (
        <View style={styles.container}>
            {/* Banner Photo */}
            <View style={{ height: "40%", backgroundColor: '#ffffff', paddingTop: 15 }}>
                <Image
                    source={{ uri: uri }}
                    resizeMode="contain"
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                />
            </View>

            {/* Requirements */}
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ffffff',
                    paddingVertical: 24
                }}
            >
                {isLoading ? (renderBlank()) : (renderRequirements())}
            </View>
            {renderFooter()}
        </View>
    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapperCustom: {
        width: 150,
        height: 50,
        borderRadius: 10,
        padding: 6,
        margin: 20,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        color: '#FFFFFF'
    }
})
export default Detail;