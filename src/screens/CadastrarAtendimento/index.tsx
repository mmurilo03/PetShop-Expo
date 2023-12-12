import { useContext, useEffect, useState } from "react";
import {
    Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { api } from "../../api/api";
import { styles } from "./styles";
import { ButtonIcon } from "../../components/ButtonIcon";
import { defaultTheme } from "../../global/styles/themes";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Starting } from "../Starting";
import { ButtonTextIcon } from "../../components/ButtonTextIcon";

interface Entity {
  nome: string,
  id: number
}

export const CadastrarAtendimento = () => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [open, setOpen] = useState(false);

  const [tipoAtendimento, setTipoAtendimento] = useState<string>("Banho");
  const [responsavel, setResponsavel] = useState<number>(0);
  const [responsaveis, setResponsaveis] = useState<Entity[]>(
    [] as Entity[]
  );
  const [pet, setPet] = useState<number>(0);
  const [pets, setPets] = useState<Entity[]>(
    [] as Entity[]
  );
  const [loadingResponsaveis, setLoadingResponsaveis] = useState(true);
  const [loadingPets, setLoadingPets] = useState(true);
  const [descricao, setDescricao] = useState<string>("");
  const [mode, setMode] = useState<string>("date");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hasDate, setHasDate] = useState<boolean>(false);
  const [screenDate, setScreenDate] = useState<string>("");

  const [image, setImage] = useState<string>();

  
  const getPets = async () => {
    api.defaults.headers.common.Authorization = user.token;
    const res = await api.get("/pet");
    setPets(res.data.pets);
    setLoadingPets(false)
  };
  
  const getResponsaveis = async () => {
    api.defaults.headers.common.Authorization = user.token;
    const res = await api.get("/responsavel");
    setResponsaveis(res.data.responsaveis);
    setLoadingResponsaveis(false)
  };
  
  const [userHasImage, setUserHasImage] = useState<boolean>(false);

  const setNewDate = (e: DateTimePickerEvent, newDate: Date | undefined) => {
    setDate(newDate)
    setOpen(false)
    updateScreenDate(newDate!)
    setHasDate(true)
  }

  const openCalendar = (modeToShow: string) => {
    setOpen(true)
    setMode(modeToShow)
  }

  const updateScreenDate = (newDate: Date) => {
    const date = newDate.toISOString().slice(0, 16).replace("T", "-")
    const dateTemp = date.split("-")
    setScreenDate(`${dateTemp[3]} | ${dateTemp[2]}/${dateTemp[1]}/${dateTemp[0]}`)
  }

  useEffect(() => {
    getPets()
    getResponsaveis()
  }, [])

  if (loadingPets || loadingResponsaveis) {
    return (<Starting />)
  }

  const sendForm = async () => {
    if (responsavel == 0) {
      Alert.alert("Escolha um responsavel")
      return
    } else if (pet == 0) {
      Alert.alert("Escolha um pet")
      return
    } else if (!hasDate) {
      Alert.alert("Escolha uma data")
      return
    } else if (descricao.length > 0) {
      Alert.alert("Escolha uma data")
      return
    }
    try {
        api.defaults.headers.common.Authorization = user.token;
        
        await api.post("/atendimento/create", {tipoAtendimento: tipoAtendimento, responsavel: responsavel, pet: pet, descricao: descricao, date: date});
        navigation.navigate("GerenciarAtendimento")
    } catch (e: any) {
        Alert.alert(e.response.data.error)
        
    }
  }

  return (
    <>
      <KeyboardAvoidingView behavior="height">
        <View style={styles.header}></View>
        <View style={styles.goBackButton}>
          <ButtonIcon
            iconColor={defaultTheme.COLORS.black}
            iconName="arrow-left"
            onPress={() => {              
              navigation.navigate("GerenciarAtendimento", {update: true})
            }}
            size={50}
          />
        </View>
        <View style={styles.imageContainer}>
          <View>
            <Image
              style={styles.image}
              source={
                userHasImage
                  ? { uri: image }
                  : require("../../images/abstract-user-icon-3.png")
              }
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.formPerfil}>
            <Picker style={styles.select} selectedValue={tipoAtendimento} onValueChange={(itemValue, itemIndex) => setTipoAtendimento(itemValue)}>
              <Picker.Item label={"Banho"} value={"Banho"} key={`Banho`}/>
              <Picker.Item label={"Tosa"} value={"Tosa"} key={`Tosa`}/>
              <Picker.Item label={"Veterinário"} value={"Veterinário"} key={`Veterinário`}/>
            </Picker>
            <Picker style={styles.select} selectedValue={responsavel} onValueChange={(itemValue, itemIndex) => setResponsavel(itemValue)}>
              <Picker.Item label={"Selecione Responsavel"} value={0} key={`responsavel0`}/>
            { responsaveis.length > 0 ? 
                responsaveis.map(responsavel => {
                  return (
                    <Picker.Item label={responsavel.nome} value={responsavel.id} key={`${responsavel.nome}${responsavel.id}`}/>
                  )
                })
              : <></>}
            </Picker>
            <Picker style={styles.select} selectedValue={pet} onValueChange={(itemValue, itemIndex) => setPet(itemValue)}>
              <Picker.Item label={"Selecione Pet"} value={0} key={`pet0`}/>
              { pets.length > 0 ? 
                pets.map(pet => {
                  return (
                    <Picker.Item label={pet.nome} value={pet.id} key={`${pet.nome}${pet.id}`}/>
                  )
                })
              : <></>}
            </Picker>
            <Input label="Descrição" value={descricao} onChangeText={(text) => setDescricao(text)} placeholder="Descrição" size={16}/>
            <Text>{screenDate ? screenDate : "Data e hora"}</Text>
            <View style={styles.buttonDataHora}>
              <ButtonTextIcon fontSize={16} iconName="calendar-alt" iconColor={defaultTheme.COLORS.white} color={defaultTheme.COLORS.graySecond} size={16} height={0.05} width={0.3} onPress={() => {openCalendar("date")}} text="Data" textColor={defaultTheme.COLORS.white}/>
              <ButtonTextIcon fontSize={16} iconName="clock" iconColor={defaultTheme.COLORS.white} color={defaultTheme.COLORS.graySecond} size={16} height={0.05} width={0.3} onPress={() => {openCalendar("time")}} text="Hora" textColor={defaultTheme.COLORS.white}/>
            </View>
            { open && mode === "date" ? 
              <DateTimePicker value={date as Date} mode="date" onChange={setNewDate} timeZoneOffsetInMinutes={0}/> : <></>
            }
            { open && mode === "time" ? 
              <DateTimePicker value={date as Date} mode="time" onChange={setNewDate} timeZoneOffsetInMinutes={0}/> : <></>
            }
            <Button color={defaultTheme.COLORS.blueMain} fontSize={16} height={0.06} width={0.3} onPress={async () => await sendForm()} text="Salvar" textColor={defaultTheme.COLORS.white}/>
        </ScrollView>
        </KeyboardAvoidingView>
        </>
    )
}