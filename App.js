import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  Modal,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [sampleGoals, setSampleGoals] = useState([
    { id: "1", nom: "Faire les courses" },
    { id: "2", nom: "Aller à la salle de sport 3 fois par semaine" },
    { id: "3", nom: "Monter à plus de 5000m d altitude" },
    { id: "4", nom: "Acheter mon premier appartement" },
    { id: "5", nom: "Perdre 5 kgs" },
    { id: "6", nom: "Gagner en productivité" },
    { id: "7", nom: "Apprendre un nouveau langage" },
    { id: "8", nom: "Faire une mission en freelance" },
    { id: "9", nom: "Organiser un meetup autour de la tech" },
    { id: "10", nom: "Faire un triathlon" },
  ]);

  const [nouvelObjectif, setNouvelObjectif] = useState("");
  const [objectifASupprimer, setObjectifASupprimer] = useState(null); // Nouvel état pour stocker l'ID de l'objectif à supprimer
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // Modale pour suppression
  const [editModalVisible, setEditModalVisible] = useState(false); // Modale pour édition
  const [texteEdite, setTexteEdite] = useState(""); //pour controler le texte à editer
  const [objectifAEditer, setObjectifAEditer] = useState(null); //pour manipuler l'objectif à editer

  const ajouterObjectif = () => {
    if (nouvelObjectif.trim() !== "") {
      // Récupérer l'id du dernier element
      const dernierId =
        sampleGoals.length > 0
          ? parseInt(sampleGoals[sampleGoals.length - 1].id)
          : 0;
      const newGoal = { id: (dernierId + 1).toString(), nom: nouvelObjectif };
      setSampleGoals((prev) => [...prev, newGoal]);
      setNouvelObjectif(""); //réinitialise l'input
    }
  };

  const supprimerObjectif = (id) => {
    setSampleGoals((prev) => prev.filter((item) => item.id !== id));
    setDeleteModalVisible(false); // Ferme la modale après suppression
    setObjectifASupprimer(null); // Réinitialise l'objectif à supprimer
  };

  const ouvrirModaleConfirmation = (id) => {
    setObjectifASupprimer(id);
    setDeleteModalVisible(true);
  };

  const ouvrirModaleEdition = (id, nom) => {
    setObjectifAEditer({ id, nom });
    setTexteEdite(nom);
    setEditModalVisible(true);
  };

  const sauvegarderEdition = () => {
    if (texteEdite.trim() !== "" && objectifAEditer) {
      setSampleGoals((prev) =>
        prev.map((item) =>
          item.id === objectifAEditer.id ? { ...item, nom: texteEdite } : item
        )
      );
    }
    setEditModalVisible(false);
    setObjectifAEditer(null);
    setTexteEdite("");
  };

  const annulerAction = () => {
    setDeleteModalVisible(false);
    setEditModalVisible(false);
    setObjectifASupprimer(null);
    setObjectifAEditer(null);
    setTexteEdite("");
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.containerImage}>
        <ImageBackground
          source={require("./assets/background1.jpg")}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={{ flex: 1 }}>
            <View style={styles.container}>
              <GoalInput
                value={nouvelObjectif}
                onChangeText={setNouvelObjectif}
                onAdd={ajouterObjectif}
              />

              <Text style={styles.title}>Mes objectifs ...</Text>
              <FlatList
                data={sampleGoals}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <GoalItem
                    item={item}
                    supprimerObjectif={ouvrirModaleConfirmation} // Passe la fonction ouvrirModaleConfirmation
                    modifierObjectif={ouvrirModaleEdition} // Passe la fonction ouvrirModaleConfirmation
                  />
                )}
              />
              <StatusBar style="auto" />
            </View>
          </View>
        </ImageBackground>

        {/* Modale pour la suppression */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={deleteModalVisible}
          onRequestClose={annulerAction}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Voulez-vous vraiment supprimer cet objectif ?
              </Text>
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.buttonModal, styles.buttonConfirm]}
                  onPress={() => supprimerObjectif(objectifASupprimer)}
                >
                  <Text style={styles.textStyle}>Confirmer</Text>
                </Pressable>
                <Pressable
                  style={[styles.buttonModal, styles.buttonCancel]}
                  onPress={annulerAction}
                >
                  <Text style={styles.textStyle}>Annuler</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        {/* Modale pour l'édition */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={annulerAction}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Modifier l'objectif</Text>
              <TextInput
                style={styles.inputEdit}
                value={texteEdite}
                onChangeText={setTexteEdite}
                placeholder="Entrez le nouvel objectif"
              />
              <View style={styles.modalButtons}>
                <Pressable
                  style={[styles.buttonModal, styles.buttonConfirmEdit]}
                  onPress={sauvegarderEdition}
                >
                  <Text style={styles.textStyle}>Sauvegarder</Text>
                </Pressable>
                <Pressable
                  style={[styles.buttonModal, styles.buttonCancel]}
                  onPress={annulerAction}
                >
                  <Text style={styles.textStyle}>Annuler</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    backgroundColor: "transparent",
    paddingTop: 120,
    paddingHorizontal: 20,
  },
  containerImage: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", // optionnel
  },
  title: {
    color: "#9B4F0F",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 25,
    marginVertical: 30,
    fontWeight: "bold",
    textDecorationStyle: "solid",
  },
  // itemRow: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   backgroundColor: "#f2f2f2",
  //   padding: 10,
  //   borderRadius: 5,
  //   marginBottom: 5,
  // },
  // item: {
  //   fontSize: 16,
  //   marginBottom: 5,
  //   backgroundColor: "#f2f2f2",
  //   padding: 10,
  //   borderRadius: 5,
  // },
  // row: {
  //   flexDirection: "row", // aligne horizontalement
  //   alignItems: "center", // aligne verticalement
  //   justifyContent: "space-between", // ou 'center' selon ton besoin
  //   marginVertical: 70,
  //   marginHorizontal: 50,
  // },
  // input: {
  //   borderColor: "#007BFF",
  //   borderWidth: 3,
  //   padding: 10,
  //   flex: 1,
  //   marginRight: 40,
  //   borderRadius: 5,
  // },
  // button: {
  //   backgroundColor: "#007BFF",
  //   padding: 12,
  //   borderRadius: 5,
  //   alignItems: "center",
  //   // marginBottom: 80,
  // },
  // buttonText: {
  //   color: "#fff",
  //   fontWeight: "bold",
  //   fontSize: 16,
  // },

  // Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    paddingBottom: 40,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white", // fond blanc sur la modale
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    shadowOpacity: 0.25,
    borderColor: "#007BFF",
    borderWidth: 3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "45%",
    alignItems: "center",
  },
  buttonConfirm: {
    backgroundColor: "#FF4444",
  },
  buttonConfirmEdit: {
    backgroundColor: "#34C759",
  },
  buttonCancel: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  inputEdit: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginBottom: 15,
  },
});
