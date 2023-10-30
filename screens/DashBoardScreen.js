import React, {useRef} from 'react';
import {SafeAreaView, View, Text, StyleSheet, StatusBar} from 'react-native';
import {max} from 'moment';
import {BarChart} from 'react-native-gifted-charts';

function DashBoardScreen({navigation, todos}) {
  const groupedByCategory = todos.reduce((groupedByCategory, todo) => {
    if (!groupedByCategory[todo.category]) groupedByCategory[todo.category] = 0;
    groupedByCategory[todo.category]++;
    return groupedByCategory;
  }, {});

  const groupedByStatus = todos.reduce((groupedByStatus, todo) => {
    const propName = `${todo.isDone ? '완료' : '진행중'}`;
    if (!groupedByStatus[propName]) groupedByStatus[propName] = 0;
    groupedByStatus[propName]++;
    return groupedByStatus;
  }, {});

  const data = [];
  let maxValue = -Infinity;
  for (let category in groupedByCategory) {
    if (maxValue < groupedByCategory[category])
      maxValue = groupedByCategory[category];
    data.push({
      value: groupedByCategory[category],
      frontColor: '#006DFF',
      gradientColor: '#009FFF',
      spacing: 6,
      label: category,
    });
  }
  const noOfSections = 10;
  const yAxisLabelTexts = Array(noOfSections)
    .fill(0)
    .map((_, id) => {
      console.log('아이디------------------', id);
      let unit = (id * maxValue) / noOfSections;
      if (unit > 1000000) unit = (unit / 1000000).toString() + 'M';
      else if (unit > 1000) unit = (unit / 1000).toString() + 'K';
      return unit;
    });
  console.log(yAxisLabelTexts);

  return (
    <SafeAreaView style={StyleSheet.block}>
      <StatusBar backgroundColor="#a8c8ffff"></StatusBar>
      <View style={styles.graphBg}>
        <View style={styles.itemBg}>
          <View>
            <Text style={styles.statusText}>진행중</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{groupedByStatus['진행중']}</Text>
          </View>
        </View>
        <View style={styles.itemBg}>
          <View>
            <Text style={styles.statusText}>완료</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{groupedByStatus['완료']}</Text>
          </View>
        </View>
      </View>
      <View style={styles.graphBg}>
        <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
          카테고리별 할일목록 수
        </Text>
        <BarChart
          isAnimated
          data={data}
          barWidth={30}
          initialSpacing={10}
          spacing={30}
          barBorderRadius={7}
          showGradient
          yAxisThickness={0}
          xAxisType={'dashed'}
          xAxisColor={'lightgray'}
          yAxisTextStyle={{color: 'lightgray'}}
          stepValue={1}
          maxValue={maxValue}
          noOfSections={noOfSections}
          yAxisLabelTexts={yAxisLabelTexts}
          labelWidth={40}
          xAxisLabelTextStyle={{color: 'lightgray', textAlign: 'center'}}
          lineConfig={{
            color: '#F29C6E',
            thickness: 3,
            curved: true,
            hideDataPoints: true,
            shiftY: 20,
            initialSpacing: -30,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  graphBg: {
    margin: 10,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#232B5D',
  },
  itemBg: {
    margin: 10,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#262d3d',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  statusText: {
    color: 'lightgray',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 10,
  },
  badge: {
    backgroundColor: '#385499',
    borderRadius: 50,
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 20,
    color: 'lightgray',
  },
});

export default DashBoardScreen;
