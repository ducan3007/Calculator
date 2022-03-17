import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import theme from "../theme";

const WIDTH = Dimensions.get("screen").width;

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
}) => {
  const set = (content, type) => {
    let Exp = expression;
    if (type === "DEL") {
      return Exp.slice(0, index.end - 1) + Exp.slice(index.end, Exp.length);
    } else {
      return Exp.slice(0, index.end) + content + Exp.slice(index.end, Exp.length);
    }
  };

  const handlePress = () => {
    switch (content) {
      case "AC":
        setExpression("");
        setResult("");
        setIndex({});
        setOpen(true);
        break;
      case "()":
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
      case "%":
        setExpression(set("%"));
        break;
      case "÷":
        setExpression(set("÷"));
        break;
      case "x":
        setExpression(set("x"));
        break;
      case "-":
        setExpression(set("-"));
        break;
      case "+":
        setExpression(set("+"));
        break;
      case ".":
        setExpression(set("."));
        break;
      case "1":
        setExpression(set("1"));
        break;
      case "2":
        setExpression(set("2"));
        break;
      case "3":
        setExpression(set("3"));
        break;
      case "4":
        setExpression(set("4"));
        break;
      case "5":
        setExpression(set("5"));
        break;
      case "6":
        setExpression(set("6"));
        break;
      case "7":
        setExpression(set("7"));
        break;
      case "8":
        setExpression(set("8"));
        break;
      case "9":
        setExpression(set("9"));
        break;
      case "0":
        setExpression(set("0"));
        break;
      case "=":
        try {
          let exp = expression;
          if (exp.includes("÷÷") || exp.includes("xx")) {
            throw new Error();
          }
          exp = exp
            .replace(/%/g, "*0.01")
            .replace(/÷/g, "/")
            .replace(/x/g, "*")
            .replace(/\-\-+/g, "+")
            .replace(/\+\++/g, "+");
            
            console.log(exp);
          let result = eval(exp);

          if (result === Infinity) {
            setResult("Error expression");
          } else if (expression != "") {
            setResult("= " + result);
          }
        } catch (error) {
          console.log(error);
          setResult("Error expression ");
        }
        break;
      default:
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles(mode, colorTheme).button}>
          <Text style={styles(mode).text}>{content}</Text>
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
      width: Math.floor(WIDTH / 4 - 15),
      height: Math.floor(WIDTH / 4 - 15),
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
      color: mode ? theme.lightModeText : theme.darkModeText,
    },
  });

export default Button;
