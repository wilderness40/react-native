import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import moment from 'moment';
import {updateDate} from '../apis/firebase';

let lastTap = null;

function TodoItem({id, title, category, createdAt, isDone, removeTodo}) {
  const [doubleTabbed, setDoubleTabbed] = useState(false);
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const ishandleDoubleTap = () => {
    const now = Date.now(); // 밀리세컨드초
    const delay = 300;
    if (lastTap && now - lastTap < delay) {
      return true;
    } else {
      lastTap = now;
      return false;
    }
  };

  const handleDoubleTap = e => {
    console.log(inputRef.current);
    setDoubleTabbed(!doubleTabbed);
    setText(title);
  };

  const handleTap = () => {
    updateDate('todos', id, {isDone: !isDone});
  };

  const handlePress = e => {
    if (ishandleDoubleTap()) {
      handleDoubleTap();
      console.log('더블탭');
      handleTap();
    } else {
      handleTap();
      console.log('싱글탭');
    }
  };

  const handleBlur = e => {
    e.stopPropagation();
    console.log('블러');
    setDoubleTabbed(!doubleTabbed);
    Keyboard.dismiss();
    updateDate('todos', id, {title: text.trim()});
  };

  const handleChange = text => {
    setText(text);
  };

  const hideKeyboard = e => {
    Keyboard.dismiss();
  };

  const handleRemove = e => {
    e.stopPropagation();
    removeTodo(id, title);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <TouchableWithoutFeedback onPress={handlePress} onLongPress={handleRemove}>
      <View style={styles.item}>
        <View
          style={styles.titleMargin}
          onTouchStart={e => {
            e.stopPropagation();
          }}>
          {doubleTabbed ? (
            <TouchableWithoutFeedback>
              <TextInput
                value={text}
                onBlur={handleBlur}
                ref={inputRef}
                onChangeText={handleChange}
              />
            </TouchableWithoutFeedback>
          ) : (
            <Text
              style={[
                styles.title,
                {
                  textDecorationLine:
                    isDone && !doubleTabbed ? 'line-through' : 'none',
                },
              ]}>
              {title}
            </Text>
          )}
        </View>
        <View>
          <Text>
            {category} ({isDone ? '종료' : '진행중'})
          </Text>
          {/* 시간저장이 예물레이터 내 핸드폰 시간으로 저장이 된다, firebase의 시간이 저장되어야 한다, firebase DB상 시간은 정상적으로 저장된다 .utcOffset('+09:00') 붙여서 해결함*/}
          <Text style={styles.dataText}>
            {createdAt &&
              createdAt.toDate !== undefined &&
              moment(createdAt.toDate())
                .utcOffset('+09:00')
                .format('YY-MM-DD hh:mm:ss')}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingVertical: 10,
  },
  titleMargin: {
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  dataText: {
    fontSize: 12,
  },
});
export default React.memo(TodoItem);
