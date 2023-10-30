import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

const caretupComponent = props => (
  <AntIcon name="caretup" {...props} size={15} />
);
const caretdownComponent = props => (
  <AntIcon name="caretdown" {...props} size={15} />
);

function DropdownCategory({caretType, setCaretType, categoryText}) {
  const onPress = () => {
    setCaretType(!caretType);
  };
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, caretType && {alignItems: 'flex-end'}]}>
        <Text style={styles.categoryText}>{categoryText}</Text>
        {caretType ? caretupComponent() : caretdownComponent()}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  categoryText: {
    paddingRight: 5,
    fontSize: 15,
  },
});

export default DropdownCategory;
