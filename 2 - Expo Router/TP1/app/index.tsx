import { View, FlatList } from "react-native";
import UserItem from "../components/UserItem";
import { UserListContext } from "../provider/UserListProvider";
import { useContext } from "react";

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
        <FlatList
          data={ProviderValue.userList}
          renderItem={({ item }) => <UserItem user={item} />}
        />
      </View>
  );
}
