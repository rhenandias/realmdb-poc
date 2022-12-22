import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Box, Center, HStack, Pressable } from "native-base";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs/src/types";

export function TabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Box flex={1} bg="white" safeAreaTop width="100%" alignSelf="center">
        <Center flex={1}></Center>
        <HStack bg="#ffffff" alignItems="center" safeAreaBottom shadow={6}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({ key: route.key, merge: true });
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            return (
              <Pressable
                key={index}
                opacity={isFocused ? 1 : 0.5}
                py="5"
                flex={1}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <Center>
                  {route.name === "create" && (
                    <Feather
                      name="plus"
                      size={22}
                      color={isFocused ? "#16A34A" : "#A7A1A1"}
                    />
                  )}

                  {route.name === "list" && (
                    <Feather
                      name="list"
                      size={22}
                      color={isFocused ? "#16A34A" : "#A7A1A1"}
                    />
                  )}

                  {route.name === "config" && (
                    <Feather
                      name="settings"
                      size={22}
                      color={isFocused ? "#16A34A" : "#A7A1A1"}
                    />
                  )}
                </Center>
              </Pressable>
            );
          })}
        </HStack>
      </Box>
    </View>
  );
}
