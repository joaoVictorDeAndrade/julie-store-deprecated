import { useState, useEffect } from "react";
import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";

import { ClientCard } from "./Clients.styles";

import { getClients } from "../../services/clients";
import { useNavigate } from "react-router-dom";
import { formatCPF, formatPhone } from "../../helpers";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [firstClient, setFirstClient] = useState(null);
  const [lastClient, setLastClient] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      const response = await getClients();
      setClients(response.clients);
      setFirstClient(response.firstClient);
      setLastClient(response.lastClient);
      setLoading(false);
    };

    fetchClients();
  }, []);

  const goToClientDetails = (id) => {
    navigate(`/clientes/detalhes/${id}`);
  };

  return (
    <Container>
      <>
        <Title text="Lista de Clientes" />

        {loading ? (
          <Loading height="3rem" />
        ) : (
          clients.map((client) => (
            <ClientCard key={client.id}>
              <div>
                <label>Nome: </label>
                <h4>{client.name}</h4>
              </div>

              <div>
                <label>CPF: </label>
                <h4>{formatCPF(client.cpf)}</h4>
              </div>

              <div>
                <label>Celular: </label>
                <h4>{formatPhone(client.cellphone)}</h4>
              </div>

              <Button
                onClick={() => goToClientDetails(client.id)}
                text="Ver Cliente"
              />
            </ClientCard>
          ))
        )}
      </>
    </Container>
  );
}
