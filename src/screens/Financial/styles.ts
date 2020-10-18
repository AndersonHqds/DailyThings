import { StyleSheet } from 'react-native';

interface StyleType {
  color: string;
}

export default (styles?: StyleType) =>
  StyleSheet.create({
    selectDate: {
      width: '100%',
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    selectDateButton: {
      alignSelf: 'center',
    },
    pie: {
      height: 200,
      flex: 2,
    },
    chartStatus: {
      width: '100%',
      height: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 50,
      flex: 1,
    },
    chartStatusBoxColor: {
      backgroundColor: styles?.color ?? '#FFF',
      height: 20,
      width: 20,
      marginRight: 10,
    },
    chartStatusText: {
      fontWeight: 'bold',
      color: '#FFF',
    },
    buttonContainer: {
      width: '100%',
      height: 50,
      alignItems: 'center',
      justifyContent: 'space-around',
      flex: 1,
      flexDirection: 'row',
    },
    button: {
      width: 150,
      height: 50,
      alignSelf: 'center',
    },
    buttonText: {
      textAlign: 'center',
    },
  });
