import React, { useState } from 'react';
import { TextInput, StyleSheet, useWindowDimensions } from 'react-native';

const SearchInput = ({ onSubmit, initialValue, initialColor }) => {
  const [text, setText] = useState('');
  const { width } = useWindowDimensions();

  const handleSubmit = () => {
    if (!text.trim()) return; 
    onSubmit(text);
    setText('');
  };

  return (
    <TextInput
      style={[
        styles.textInput, 
        { width: width > 500 ? 400 : width * 0.7 }
      ]}
      placeholder={initialValue}
      placeholderTextColor={initialColor}
      onChangeText={setText}
      onSubmitEditing={handleSubmit}
      value={text}
      clearButtonMode="while-editing" 
      autoCorrect={false}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    color: '#FFF',
    alignSelf: 'center',
    height: 50, 
    marginTop: 20,
    paddingHorizontal: 15,
    borderRadius: 25, 
  },
});

export default SearchInput;