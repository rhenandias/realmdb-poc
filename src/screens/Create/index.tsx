import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  Select,
  Text,
  VStack,
  useToast,
} from "native-base";
import { DatabaseContext, DatabaseContextProps } from "../../../realm/context";

import { v4 } from "uuid";

export function Create() {
  const { realm } = useContext(DatabaseContext) as DatabaseContextProps;

  const toast = useToast();

  const [nome, setNome] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [municipio, setMunicipo] = useState("");
  const [uf, setUf] = useState("");

  function resetForms() {
    setNome("");
    setRazaoSocial("");
    setCpfCnpj("");
    setEndereco("");
    setMunicipo("");
    setUf("");
  }

  async function handleSubmit() {
    let client;

    realm.write(() => {
      client = realm.create("Client", {
        _id: v4(),
        nome,
        razaoSocial,
        cpfCnpj,
        endereco,
        uf,
        municipio,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    resetForms();

    toast.show({
      description: "Cliente cadastrado com sucesso.",
    });
  }

  return (
    <>
      <Center my={6}>
        <Text fontWeight={"bold"} color={"gray.600"}>
          Cadastrar Cliente
        </Text>
      </Center>
      <Center>
        <VStack space={3} w="80%">
          <Box alignItems="center">
            <Box w="100%" maxWidth="300px">
              <FormControl>
                <Input
                  value={nome}
                  onChangeText={(text) => setNome(text)}
                  type="text"
                  placeholder="Nome"
                />
              </FormControl>
              <FormControl mt={3}>
                <Input
                  value={razaoSocial}
                  onChangeText={(text) => setRazaoSocial(text)}
                  type="text"
                  placeholder="Razão Social"
                />
              </FormControl>
              <FormControl mt={3}>
                <Input
                  value={cpfCnpj}
                  onChangeText={(text) => setCpfCnpj(text)}
                  type="text"
                  placeholder="CPF / CNPJ"
                />
              </FormControl>
              <FormControl mt={3}>
                <Input
                  value={endereco}
                  onChangeText={(text) => setEndereco(text)}
                  type="text"
                  placeholder="Endereço"
                />
              </FormControl>
              <FormControl mt={3}>
                <Input
                  value={municipio}
                  onChangeText={(text) => setMunicipo(text)}
                  type="text"
                  placeholder="Município"
                />
              </FormControl>
              <FormControl mt={3}>
                <Select
                  onValueChange={(value) => setUf(value)}
                  placeholder="Selecione o Estado"
                >
                  <Select.Item value="AC" label="Acre" />
                  <Select.Item value="AL" label="Alagoas" />
                  <Select.Item value="AP" label="Amapá" />
                  <Select.Item value="AM" label="Amazonas" />
                  <Select.Item value="BA" label="Bahia" />
                  <Select.Item value="CE" label="Ceará" />
                  <Select.Item value="DF" label="Distrito Federal" />
                  <Select.Item value="ES" label="Espírito Santo" />
                  <Select.Item value="GO" label="Goiás" />
                  <Select.Item value="MA" label="Maranhão" />
                  <Select.Item value="MT" label="Mato Grosso" />
                  <Select.Item value="MS" label="Mato Grosso do Sul" />
                  <Select.Item value="MG" label="Minas Gerais" />
                  <Select.Item value="PA" label="Pará" />
                  <Select.Item value="PB" label="Paraíba" />
                  <Select.Item value="PR" label="Paraná" />
                  <Select.Item value="PE" label="Pernambuco" />
                  <Select.Item value="PI" label="Piauí" />
                  <Select.Item value="RJ" label="Rio de Janeiro" />
                  <Select.Item value="RN" label="Rio  Grande do Norte" />
                  <Select.Item value="RS" label="Rio Grande do Sul" />
                  <Select.Item value="RO" label="Rondônia" />
                  <Select.Item value="RR" label="Roraima" />
                  <Select.Item value="SC" label="Santa Catarina" />
                  <Select.Item value="SP" label="São Paulo" />
                  <Select.Item value="SE" label="Sergipe" />
                  <Select.Item value="TO" label="Tocantins" />
                  <Select.Item value="EX" label="Estrangeiro" />
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Button colorScheme="success" w="100%" mt={3} onPress={handleSubmit}>
            <Text textTransform="uppercase" color="white">
              Cadastrar
            </Text>
          </Button>
        </VStack>
      </Center>
    </>
  );
}
