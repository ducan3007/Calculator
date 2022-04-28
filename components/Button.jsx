import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import theme from "../theme";

const WIDTH = Dimensions.get("screen").width;

const primary = ["( )", "%", "÷", "x", "+", "-"];
const secondary = ["AC", "="];

const Button = ({
  content,
  mode,
  colorTheme,
  setExpression,
  expression,
  isOpenParenthesis,
  setOpen,
  setResult,
  index,
  setIndex,
  setError,
}) => {
  if (primary.includes(content)) {
    colorTheme = "primary";
  }
  if (secondary.includes(content)) {
    colorTheme = "secondary";
  }

  const set = (content, type) => {
    let exp = expression;
    if (type === "DEL") {
      return exp.slice(0, index.end - 1) + exp.slice(index.end, exp.length);
    } else {
      return exp.slice(0, index.end) + content + exp.slice(index.end, exp.length);
    }
  };

  const handlePress = () => {
    switch (content) {
      case "AC":
        setExpression("");
        setResult("");
        setError(false);
        setIndex({});
        setOpen(true);
        break;
      case "( )":
        if (isOpenParenthesis) {
          setExpression(set("("));
        } else {
          setExpression(set(")"));
        }
        setOpen(!isOpenParenthesis);
        break;
      case "DEL":
        setExpression(set("", "DEL"));
        break;
      case "=":
        try {
          let exp = expression;
          if (exp.includes("÷÷") || exp.includes("xx") || exp.includes("x%")) {
            throw new Error();
          }
          exp = exp
            .replace(/%/g, "*0.01")
            .replace(/÷/g, "/")
            .replace(/x/g, "*")
            .replace(/\-\-+/g, "+")
            .replace(/\+\++/g, "+");

          let result = eval(exp);
          if (result === Infinity) {
            setError(true);
            setResult("Lỗi dạng thức");
          } else if (expression != "") {
            setError(false);
            setResult("= " + result);
          }
        } catch (error) {
          setError(true);
          setResult("Lỗi dạng thức");
        }
        break;
      default:
        setExpression(set(content));
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles(mode, colorTheme).button}>
          <Text style={styles(mode, colorTheme).text}>{content}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = (mode, colorTheme) =>
  StyleSheet.create({
    container: {
      padding: 10,
    },
    button: {
      width: Math.floor(WIDTH / 4 - 18),
      height: Math.floor(WIDTH / 4 - 18),
      backgroundColor:
        colorTheme === "primary"
          ? theme.primaryButton
          : colorTheme === "secondary"
          ? theme.secondaryButton
          : mode
          ? theme.lightModeButton
          : theme.DarkModeButton,
      borderRadius: Math.floor(WIDTH),
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 23,
      color:
        colorTheme === "primary" || colorTheme === "secondary"
          ? theme.lightModeText
          : mode
          ? theme.lightModeText
          : theme.darkModeText,
    },
  });

export default Button;
