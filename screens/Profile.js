import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Switch } from 'react-native';
import { MainLayout } from '.';
import HeaderBar from '../components/HeaderBar';
import { FONTS, COLORS, SIZES, dummyData, icons } from '../constants';

const SectionTitle = ({ title }) => {
    return (
        <View style={{ marginTop: SIZES.padding }}>
            <Text style={{ color: COLORS.lightGray3, ...FONTS.h4 }}>{title}</Text>
        </View>
    )
}

const Setting = ({ title, value, type, onPress }) => {
    if (type === "button") {
        return (
            <TouchableOpacity
                style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}
                onPress={onPress}
            >
                <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>
                    {title}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text style={{ marginRight: SIZES.radius, color: COLORS.lightGray3, ...FONTS.h3 }}>
                        {value}
                    </Text>

                    <Image style={{ height: 15, width: 15, tintColor: COLORS.white }}
                        source={icons.rightArrow}
                    />

                </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>{title}</Text>
                <Switch value={value} onValueChange={(value) => onPress(value)} />
            </View>
        )
    }
}

const Profile = () => {

    const [faceId, setFaceId] = useState(true)

    return (
        <MainLayout>
            <View style={{ flex: 1, paddingHorizontal: SIZES.padding, backgroundColor: COLORS.black }}>

                <HeaderBar title="Perfil" />

                <ScrollView>

                    <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>

                        <View style={{ flex: 1 }}>
                            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                                {dummyData.profile.email}
                            </Text>
                            <Text style={{ color: COLORS.lightGray3, ...FONTS.h4 }}>
                                ID: {dummyData.profile.id}
                            </Text>
                            <Text style={{ color: COLORS.lightGray3, ...FONTS.h4 }}>
                                {dummyData.profile.school}
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 25, width: 25 }} source={icons.verified} />
                            <Text style={{ marginLeft: SIZES.base, color: COLORS.lightGreen, ...FONTS.body4 }}>
                                Verificado
                            </Text>
                        </View>

                    </View>

                    <SectionTitle title="APP" />

                    <Setting title="Tela Principal" value="Home" type="button"
                        onPress={() => console.warn("teste")}
                    />

                    <Setting title="Tema" value="Dark" type="button"
                        onPress={() => console.warn("teste")}
                    />

                    <SectionTitle title="Conta" />

                    <Setting title="Moeda" value="USD" type="button"
                        onPress={() => console.warn("teste")}
                    />

                    <Setting title="Linguagem" value="Português" type="button"
                        onPress={() => console.warn("teste")}
                    />

                    <SectionTitle title="Segurança" />

                    <Setting title="FaceID" value={faceId} type="switch"
                        onPress={(value) => setFaceId(value)}
                    />

                    <Setting title="Configuração de Senha" value="" type="button"
                        onPress={() => console.warn("teste")}
                    />

                    <Setting title="Autenticação em 2 Fatores" value="" type="button"
                        onPress={() => console.warn("teste")}
                    />

                    <SectionTitle title="Desconectar" />

                    <Setting title="Sair da conta" value="" type="button"
                        onPress={() => console.warn("teste")}
                    />

                </ScrollView>
            </View>
        </MainLayout>
    )
}

export default Profile;