import { createStackNavigator } from 'react-navigation';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';

const AppNavigator = createStackNavigator({
  Home: { screen: Home },
  ChatRoom: { screen: ChatRoom },
});

export default AppNavigator;
