import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
export default function GoalItem({
  item,
  supprimerObjectif,
  modifierObjectif,
}) {
  return (
    <View style={styles.itemRow}>
      <Text style={styles.item}>{item.nom}</Text>
      <View style={styles.itemButtons}>
        <TouchableOpacity onPress={() => modifierObjectif(item.id, item.nom)}>
          <Text style={styles.editButton}>🖍️</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => supprimerObjectif(item.id)}>
          <Text style={styles.deleteButton}>✖</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  item: {
    fontSize: 16,
    textAlign: "left",
    // Permet au texte de s'adapter sans chevauchement
    // marginBottom: 5,
    // backgroundColor: "#f2f2f2",
    // padding: 10,
    // borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    fontSize: 18,
    color: "#007BFF",
    padding: 10,
  },
  deleteButton: {
    fontSize: 18,
    color: "#FF4444",
    padding: 10,
  },
  itemButtons: {
    flexDirection: "row",
  },
});
