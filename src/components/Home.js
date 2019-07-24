import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        We have no friends!
        <Button
          title="Add Chat"
          onPress={() =>
            this.props.navigation.navigate('ChatRoom')
          }
        />
     </div>
    );
  }
}
 