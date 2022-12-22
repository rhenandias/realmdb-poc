const ClientSchema = {
  name: "Client",
  primaryKey: "_id",
  properties: {
    _id: "string",
    nome: "string",
    razaoSocial: "string",
    cpfCnpj: "string",
    endereco: "string",
    uf: "string",
    municipio: "string",
    createdAt: "date",
    updatedAt: "date",
  },
};

export default ClientSchema;
