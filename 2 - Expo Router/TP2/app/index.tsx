import { View, FlatList, Text } from "react-native";
import UserItem from "../components/UserItem";
import { UserListContext } from "../provider/UserListProvider";
import { useContext } from "react";
import { Link } from "expo-router";

export type TUser = {
  id: number;
  name: string;
  email: string;
}

export default function Index() {


  const ProviderValue = useContext(UserListContext)
  
  
  return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Link
          href="/addUser"
        >
          <Text>Add User</Text>
        </Link>
        <FlatList
          data={ProviderValue.userList}
          renderItem={({ item }) => <UserItem user={item} />}
        />
      </View>
  );
}
