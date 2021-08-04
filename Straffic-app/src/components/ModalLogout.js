import React, {useState, useContext} from 'react';
import {AuthContext} from '../contexts/Auth';
import {
  Modal,
  Text,
  View,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';

const ModalLogout = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {logout} = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={
                ([styles.modalText], {fontWeight: 'bold', marginBottom: 20})
              }>
              Bạn muốn Log Out ?
            </Text>
            <View style={styles.btnList}>
              <Pressable
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleLogout}>
                <Text style={styles.textStyle}>Xác nhận</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Thoát</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Log Out</Text>
      </Pressable> */}
      <TouchableOpacity
        style={styles.buttonLogout}
        onPress={() => setModalVisible(true)}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'gray',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  btnList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonConfirm: {
    backgroundColor: 'green',
    marginRight: 20,
  },
  buttonLogout: {
    backgroundColor: '#abcd',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 200,
    height: 50,
    borderRadius: 15,
    marginTop: 40,
    position: 'absolute',
    bottom: 20,
  },
});

export default ModalLogout;
