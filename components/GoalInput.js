// components/GoalInput.js
import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import Ripple from "react-native-material-ripple";

export default function GoalInput({ value, onChangeText, onAdd }) {
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="Ajouter un nouvel objectif"
        value={value}
        onChangeText={onChangeText}
      />
      <Ripple
        rippleColor="#FFFFFF" // Couleur de l'effet ripple (blanc)
        rippleOpacity={0.3} // Opacité de l'effet
        rippleDuration={600} // Durée de l'animation en ms
        onPress={onAdd} // fonction appele sur le mbouton
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add</Text>
      </Ripple>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#bdc3c7",
  },
  button: {
    backgroundColor: "#9B4F0F",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "34495e",
    fontWeight: "bold",
  },
});
