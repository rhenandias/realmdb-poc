import React, { useContext, useEffect, useState } from "react";
import { Center, Flex, Text, VStack, ScrollView } from "native-base";

import { RefreshControl } from "react-native";
import { DatabaseContext, DatabaseContextProps } from "../../../realm/context";

interface Client {
  _id: string;
  nome: string;
  razaoSocial: string;
  cpfCnpj: string;
  endereco: string;
  uf: string;
  municipio: string;
  createdAt: Date;
  updatedAt: Date;
}

function ClientCard(client: Client) {
  return (
    <VStack padding={4} space={2} rounded="lg" bgColor="white">
      <Flex flexDirection={"row"} justify={"space-between"}>
        <Text fontWeight={"bold"}>Nome:</Text>
        <Text>{client.nome}</Text>
      </Flex>
      <Flex flexDirection={"row"} justify={"space-between"}>
        <Text fontWeight={"bold"}>Razão Social:</Text>
        <Text>{client.razaoSocial}</Text>
      </Flex>
      <Flex flexDirection={"row"} justify={"space-between"}>
        <Text fontWeight={"bold"}>CPF / CNPJ:</Text>
        <Text>{client.cpfCnpj}</Text>
      </Flex>
      <Flex flexDirection={"row"} justify={"space-between"}>
        <Text fontWeight={"bold"}>Endereço:</Text>
        <Text>
          {client.endereco} - {client.uf}
        </Text>
      </Flex>
    </VStack>
  );
}

export function List() {
  const { database } = useContext(DatabaseContext) as DatabaseContextProps;

  const [clients, setClients] = useState<Client[]>();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const clients = database.objects("Client") as unknown;

    setClients(clients as Client[]);

    setLoaded(true);
  }

  async function refresh() {
    setRefreshing(true);
    setLoaded(false);

    await load();

    setRefreshing(false);
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      <Center my={6}>
        <Text fontWeight={"bold"} color={"gray.600"}>
          Listar Clientes
        </Text>
      </Center>

      <Center mt={4}>
        <VStack w={"90%"} space={4}>
          {loaded && (
            <>
              {clients?.map((client) => (
                <ClientCard
                  key={client._id}
                  _id={client._id}
                  nome={client.nome}
                  razaoSocial={client.razaoSocial}
                  cpfCnpj={client.cpfCnpj}
                  endereco={client.endereco}
                  municipio={client.municipio}
                  uf={client.uf}
                  createdAt={client.createdAt}
                  updatedAt={client.updatedAt}
                />
              ))}
            </>
          )}
        </VStack>
      </Center>

      {!loaded && (
        <>
          <Center>
            <Text>Carregando</Text>
          </Center>
        </>
      )}
    </ScrollView>
  );
}
