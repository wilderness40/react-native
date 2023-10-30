import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';

function TodoInsert({
  onInsertTodo,
  todoText,
  setTodoText,
  warning,
  setWarning,
  setCategoryText,
  incorrect,
  setIncorrect,
  disabled,
}) {
  const onPress = () => {
    const trimedText = todoText.trim();
    onInsertTodo(trimedText);
  };
  const handleChange = text => {
    if (/\n/.test(text)) {
      onPress();
      console.log(warning);
      if (!warning) {
        setCategoryText('카테고리');
      }
    } else {
      setTodoText(text);
      setWarning(false);
    }
  };
  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        // placeholder={incorrect ? incorrect : '할일을 작성하세요'}
        onFocus={() => {
          setWarning(false);
          setIncorrect('할일을 작성하세요');
        }}
        // placeholderTextColor={warning ? 'red' : '#a8c8ffff'} // 안내문구 색상
        editable={!disabled} // disabled 값에 따른 입력창 비활성화
        selectTextOnFocus={!disabled} // disabled 값에 따른 입력창 비활성화
        placeholder={
          (incorrect ? incorrect : '할일을 작성하세요') ||
          (disabled ? 'X 할일을 작성할 수 없습니다 X' : '할일을 작성해주세요!')
        } // disabled 값에 따른 안내문구 변경
        placeholderTextColor={warning || disabled ? 'red' : '#a8c8ffff'} // disabled 값에 따른 안내문구 색상 변경
        selectionColor={'#d6e3ffff'} // 커서색상
        style={[styles.input, {color: warning ? 'red' : '#a8c8ffff'}]}
        value={disabled ? '' : todoText} // disabled 값이 true 인 경우 입력창 초기화
        blurOnSubmit={false} // 탭키 누를 때 키보드 사라지지 않게 하기
        onChangeText={handleChange} // 입력창에 글자를 입력할 때
        returnKeyType="done" // 엔터키 아이콘 변경
        maxLength={50} // 최대 글자수 제한
        autoCorret={false} // 자동완성 기능 끄기
        onSubmitEditing={hideKeyboard} // 엔터키를 눌렀을 때 onChange와 같이 있을 경우 Enter를 두번 눌러야 추가됨 => 아무것도 입력안되어 있을 때 키보드 닫히는 걸로 수정
      />
      <TouchableOpacity
        disabled={disabled} // disabled 값에 따른 버튼 비활성화
        activeOpacity={0.7} // 버튼 클릭시 투명도 변경
        onPress={onPress} // 버튼 클릭시 실행
      >
        <View
          style={[
            styles.button,
            {backgroundColor: disabled ? 'red' : '#a8c8ffff'},
          ]}>
          <Text style={styles.buttonText}>추가</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingLeft: 20,
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderTopColor: '#fff5f5',
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 20,
    color: '#a8c8ffff',
    paddingVertical: 10,
    flex: 1, // 설정하지 않으면 입력창에 입력한 글자가 길어지면 추가 버튼이 밀려남
  },
  button: {
    // backgroundColor: '#a8c8ffff',
    width: 80,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#fff',
    letterSpacing: 3,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default TodoInsert;
