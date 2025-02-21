import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback, ImageBackground } from "react-native";

export default function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState(1.2);
  const [bmr, setBmr] = useState(null);
  const [calories, setCalories] = useState(null);

  const calculateBMR = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const ageNum = parseInt(age);

    if (isNaN(weightNum) || isNaN(heightNum) || isNaN(ageNum)) {
      alert("Lütfen tüm alanları doğru şekilde doldurun.");
      return;
    }

    let result =
      gender === "male"
        ? 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
        : 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;

    setBmr(result.toFixed(2));

    const dailyCalories = result * activityLevel;
    setCalories(dailyCalories.toFixed(2));

    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.label}>Kilonuz (kg):</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={weight} onChangeText={setWeight} />

        <Text style={styles.label}>Boyunuz (cm):</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={height} onChangeText={setHeight} />

        <Text style={styles.label}>Yaşınız:</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={age} onChangeText={setAge} />

        <Text style={styles.label}>Cinsiyet:</Text>
        <View style={styles.buttonContainer}>
          <Button title="Erkek" onPress={() => setGender("male")} color={gender === "male" ? "#3B82F6" : "#A0A0A0"} />
          <Button title="Kadın" onPress={() => setGender("female")} color={gender === "female" ? "#A855F7" : "#A0A0A0"} />
        </View>

        <Text style={styles.label}>Aktivite Seviyeniz:</Text>
        <View style={styles.buttonContainer}>
          <Button title="Sedanter" onPress={() => setActivityLevel(1.2)} color={activityLevel === 1.2 ? "#10B981" : "#A0A0A0"} />
          <Button title="Hafif Aktif" onPress={() => setActivityLevel(1.375)} color={activityLevel === 1.375 ? "#14B8A6" : "#A0A0A0"} />
          <Button title="Orta Aktif" onPress={() => setActivityLevel(1.55)} color={activityLevel === 1.55 ? "#22C55E" : "#A0A0A0"} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Çok Aktif" onPress={() => setActivityLevel(1.725)} color={activityLevel === 1.725 ? "#F97316" : "#A0A0A0"} />
          <Button title="Aşırı Aktif" onPress={() => setActivityLevel(1.9)} color={activityLevel === 1.9 ? "#DC2626" : "#A0A0A0"} />
        </View>

        <Button title="BMR Hesapla" onPress={calculateBMR} color="#2563EB" />

        {bmr && <Text style={styles.result}>BMR: {bmr} kcal</Text>}
        {calories && <Text style={styles.result}>Günlük Kalori İhtiyacı: {calories} kcal</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#E0F2FE", // Açık mavi arka plan
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: "#1E3A8A", // Koyu mavi yazılar
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#93C5FD", // Açık mavi border
    backgroundColor: "white",
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    borderRadius: 10, // Köşeleri yuvarlatılmış giriş kutuları
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  result: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#1E40AF", // Lacivert sonuç yazıları
  },
});
