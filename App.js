import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./components/Button";
import theme from "./theme";

const WIDTH = Dimensions.get("screen").width;

export default function App() {
  const [theme, setTheme] = useState(true);
  const [expression, setExpression] = useState("");
  const [isOpenParenthesis, setOpen] = useState(true);
  const [result, setResult] = useState("");
  const [index, setIndex] = useState({ end: 0, start: 0 });

  const onSelectionChange = (position) => {
    setIndex(position);
  };
  const changeMode = () => {
    setTheme(!theme);
  };

  return (
    <View style={styles(theme).container}>
      <SafeAreaView>
        <View style={styles(theme).display}>
          <View style={styles(theme).header}>
            <View style={styles(theme).changeMode}>
              <TouchableOpacity onPress={changeMode}>
                <Ionicons name={theme ? "moon-outline" : "moon"} size={32} />
              </TouchableOpacity>
            </View>
            <View style={styles(theme).headerInput}>
              <TextInput
                showSoftInputOnFocus={false}
                onSelectionChange={(event) =>
                  onSelectionChange(event.nativeEvent.selection)
                }
                autoFocus
                style={styles(theme).equationTextInput}
              >
                {expression}
              </TextInput>
            </View>
          </View>
          <View style={styles(theme).resultScreen}>
            <Text style={styles(theme).resultText}>{result}</Text>
          </View>
        </View>
        <View style={styles(theme).button}>
          <View style={styles(theme).row}>
            <Button
              setExpression={setExpression}
              setResult={setResult}
              expression={expression}
              setIndex={setIndex}
              setOpen={setOpen}
              type="func"
              mode={theme}
              content={"AC"}
              colorTheme="secondary"
            />
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              isOpenParenthesis={isOpenParenthesis}
              setOpen={setOpen}
              mode={theme}
              content={"()"}
              colorTheme="secondary"
            />
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              type="operator"
              mode={theme}
              content={"%"}
              colorTheme="secondary"
            />
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              type="operator"
              mode={theme}
              content={"÷"}
              colorTheme="primary"
            />
          </View>
          <View style={styles(theme).row}>
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              mode={theme}
              content={"7"}
            />
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              mode={theme}
              content={"8"}
            />
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              mode={theme}
              content={"9"}
            />
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              type="operator"
              mode={theme}
              content={"x"}
              colorTheme="primary"
            />
          </View>

          <View style={styles(theme).row}>
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              mode={theme}
              content={"4"}
            />
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              mode={theme}
              content={"5"}
            />
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              mode={theme}
              content={"6"}
            />
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              ype="operator"
              mode={theme}
              content={"-"}
              colorTheme="primary"
            />
          </View>

          <View style={styles(theme).row}>
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              mode={theme}
              content={"1"}
            />
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              mode={theme}
              content={"2"}
            />
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              mode={theme}
              content={"3"}
            />
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              type="operator"
              mode={theme}
              content={"+"}
              colorTheme="primary"
            />
          </View>
          <View style={styles(theme).row}>
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              mode={theme}
              content={"0"}
            />
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              mode={theme}
              content={"."}
            />
            <Button
              index={index}
              setIndex={setIndex}
              setExpression={setExpression}
              expression={expression}
              type="func"
              mode={theme}
              content={"DEL"}
            />
            <Button
              setExpression={setExpression}
              expression={expression}
              type="operator"
              mode={theme}
              content={"="}
              setResult={setResult}
              colorTheme="primary"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = (mode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: mode ? theme.light : theme.dark,
    },
    display: {
      flex: 2,
      borderWidth: 1,
      borderRadius: 25,
      borderColor: mode ? theme.dark : theme.light,
      margin: 5,
    },
    changeMode: {
      flex: 1,
      top: 10,
      left: 10,
    },
    headerInput: {
      flex: 3,
      justifyContent: "center",
      paddingRight: 5,
      paddingLeft: 5,
    },
    equationTextInput: {
      textAlign: "right",
      fontSize: 45,
      color: mode ? theme.lightModeText : theme.darkModeText,
    },
    header: {
      flex: 2,
    },
    resultScreen: {
      flex: 1,
      justifyContent: "center",
      textAlign: "right",
    },
    resultText: {
      textAlign: "right",
      paddingRight: 10,
      fontSize: 30,
      color: mode ? theme.lightModeText : theme.darkModeText,
    },
    button: {
      flex: 3,
      backgroundColor: mode ? theme.light : theme.dark,
      justifyContent: "center",
      width: WIDTH,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
    },
  });
