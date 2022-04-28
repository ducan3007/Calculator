import "expo-dev-client";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "./components/Button";
import theme from "./theme";

const WIDTH = Dimensions.get("screen").width;

const buttons = [
  ["AC", "( )", "%", "÷"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "+"],
  ["1", "2", "3", "-"],
  ["0", ".", "DEL", "="],
];

export default function App() {
  const [mode, setMode] = useState(false);
  const [expression, setExpression] = useState("");
  const [isOpenParenthesis, setOpen] = useState(true);
  const [result, setResult] = useState("");
  const [index, setIndex] = useState({ end: 0, start: 0 });
  const [error, setError] = useState(false);

  const onSelectionChange = (position) => {
    setIndex(position);
  };
  const changeMode = () => {
    setMode(!mode);
  };

  return (
    <View style={styles(mode).container}>
      <View>
        <View style={styles(mode).display}>
          <View style={styles(mode).header}>
            <View style={styles(mode).changeMode}>
              <TouchableOpacity onPress={changeMode}>
                <Ionicons name={mode ? "moon-outline" : "moon"} size={40} />
              </TouchableOpacity>
            </View>
            <View style={styles(mode).headerInput}>
              <TextInput
                showSoftInputOnFocus={false}
                onSelectionChange={(event) => onSelectionChange(event.nativeEvent.selection)}
                autoFocus
                style={styles(mode, error).ExpressionTextInput}
              >
                {expression}
              </TextInput>
            </View>
          </View>
          <View style={styles(mode).resultScreen}>
            <Text style={styles(mode, error).resultText}>{result}</Text>
          </View>
        </View>
        <View style={styles(mode).button}>
          {buttons.map((button) => {
            return (
              <View style={styles(mode).row} key={button}>
                {button.map((button) => {
                  return (
                    <Button
                      key={button}
                      content={button}
                      mode={mode}
                      isOpenParenthesis={isOpenParenthesis}
                      expression={expression}
                      setIndex={setIndex}
                      index={index}
                      setExpression={setExpression}
                      setResult={setResult}
                      setOpen={setOpen}
                      setError={setError}
                    />
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = (mode, error) =>
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
      borderBottomRightRadius: 23,
      borderBottomLeftRadius: 23,
      backgroundColor: mode ? "rgba(233,239,251,0.9)" : "rgba(53,56,63,0.9)",
    },
    changeMode: {
      flex: 1,
      top: 48,
      left: 17,
    },
    headerInput: {
      flex: 3,
      justifyContent: "center",
      paddingRight: 10,
      paddingLeft: 5,
    },
    ExpressionTextInput: {
      textAlign: "right",
      fontSize: 60,
      color: error ? theme.error : mode ? theme.lightModeText : theme.darkModeText,
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
      paddingRight: 15,
      fontSize: 25,
      color: error ? theme.error : mode ? theme.lightModeText : theme.darkModeText,
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
