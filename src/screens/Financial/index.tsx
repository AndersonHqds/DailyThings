import React, { useEffect, useState } from 'react';
import { Button, Container, Text, View } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PieChart, PieChartData } from 'react-native-svg-charts';

import styles from './styles';

type Colors = '#fc033d' | '#6203fc' | '#03fcf0' | '#d7dbdb';
type SpendingsType =
  | 'Necessário'
  | 'Desnecessário'
  | 'Reserva'
  | 'Livre para gastar';

interface Spendings {
  type: SpendingsType;
  value: number;
  color?: Colors;
}

const example: Spendings[] = [
  {
    type: 'Necessário',
    value: 100,
  },
  {
    type: 'Necessário',
    value: 300,
  },
  {
    type: 'Necessário',
    value: 50,
  },
  {
    type: 'Desnecessário',
    value: 100,
  },
  {
    type: 'Desnecessário',
    value: 100,
  },
  {
    type: 'Desnecessário',
    value: 100,
  },
  {
    type: 'Reserva',
    value: 100,
  },
  {
    type: 'Reserva',
    value: 100,
  },
  {
    type: 'Reserva',
    value: 100.5,
  },
];

export default function Financial() {
  const getReducedValue = (
    type: SpendingsType,
    values: Spendings[],
    color: Colors,
  ) => {
    const valuesWithoutZero = values.filter(
      (spending) => spending.value > 0 && spending.type === type,
    );
    return valuesWithoutZero.reduce((previous, current) => ({
      type,
      value: previous.value + current.value,
      color,
    }));
  };

  useEffect(() => {
    const needed = getReducedValue('Necessário', example, '#6203fc');
    console.log(needed);
    const notNeeded = getReducedValue('Desnecessário', example, '#fc033d');
    const saves = getReducedValue('Reserva', example, '#03fcf0');

    const pie: PieChartData[] = [needed, notNeeded, saves].map(
      (spending, index) => ({
        value: spending.value,
        svg: {
          fill: spending.color,
          onPress: () => {
            console.log('press', spending.value);
            setSelectedColor(spending.color);
            setSelectedType(spending.type);
            setSelectedValue(spending.value);
          },
        },
        key: `pie-${index}`,
      }),
    );
    setPieData(pie);
  }, []);

  const [selectedColor, setSelectedColor] = useState<Colors | undefined>(
    undefined,
  );
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pieData, setPieData] = useState<PieChartData[]>();
  const [selectedType, setSelectedType] = useState<SpendingsType>('Necessário');
  const [selectedValue, setSelectedValue] = useState(0);

  const handleChangeDate = (event: Event, selectedDate: Date | undefined) => {
    setShowDatePicker(!!showDatePicker);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <Container>
      <View style={styles().selectDate}>
        <Button
          style={styles().selectDateButton}
          onPress={() => setShowDatePicker(!showDatePicker)}>
          <Text>{date.toDateString()}</Text>
        </Button>
      </View>

      {!!showDatePicker && (
        <DateTimePicker
          value={date}
          is24Hour
          display="default"
          onChange={handleChangeDate}
        />
      )}

      {!!pieData && <PieChart style={styles().pie} data={pieData} />}

      {!!selectedColor && (
        <View style={styles().chartStatus}>
          <View style={styles({ color: selectedColor }).chartStatusBoxColor} />
          <Text
            style={
              styles().chartStatusText
            }>{`${selectedType} - R$ ${selectedValue.toFixed(2)}`}</Text>
        </View>
      )}

      <View style={styles().buttonContainer}>
        <Button style={styles().button}>
          <Text style={styles().buttonText}>Adicionar Gasto</Text>
        </Button>
        <Button style={styles().button}>
          <Text style={styles().buttonText}>Ver Detalhes</Text>
        </Button>
      </View>
    </Container>
  );
}
