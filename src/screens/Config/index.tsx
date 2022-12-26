import {
  Button,
  Center,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  useToast,
} from "native-base";
import React, { useContext, useState } from "react";
import { RealmContext, RealmContextProps } from "../../../realm/context";

export function Config() {
  const { realm } = useContext(RealmContext) as RealmContextProps;

  const toast = useToast();

  const [quantidade, setQuantidade] = useState<string>("0");
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const [loadingCreate, setLoadingCreate] = useState<boolean>(false);

  function createRandom() {
    setLoadingCreate(true);

    setLoadingCreate(false);
  }

  function clearDatabase() {
    realm.write(() => {
      const clients = realm.objects("Client");

      realm.delete(clients);

      toast.show({
        description: "Os dados foram apagados com sucesso",
      });
    });
  }

  return (
    <>
      <Center my={6}>
        <Text fontWeight={"bold"} color={"gray.600"}>
          Configurações
        </Text>
      </Center>

      <Center>
        <VStack w={"80%"}>
          <Button
            colorScheme={"danger"}
            onPress={clearDatabase}
            isLoading={loadingDelete}
          >
            <Text color={"white"}>Limpar Banco de Dados</Text>
          </Button>

          <Center>
            <Text my={4}>Criar Dados Aleatórios</Text>
          </Center>

          <HStack space={4}>
            <FormControl isRequired flex={0.5}>
              <Input
                placeholder="Quantidade"
                onChangeText={(text) => setQuantidade(text)}
              />
            </FormControl>

            <Button
              flex={0.5}
              w={"60%"}
              onPress={createRandom}
              isLoading={loadingCreate}
            >
              Criar
            </Button>
          </HStack>
        </VStack>
      </Center>
    </>
  );
}
