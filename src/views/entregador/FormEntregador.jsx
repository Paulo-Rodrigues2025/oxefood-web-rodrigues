import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormEntregador() {
  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [rg, setRg] = useState();
  const [dtNascimento, setDtNascimento] = useState();
  const [foneCelular, setFoneCelular] = useState();
  const [foneFixo, setFoneFixo] = useState();
  const [entregasRealizadas, setEntregasRealizadas] = useState();
  const [valorPorFrete, setValorPorFrete] = useState();
  const [rua, setRua] = useState();
  const [numero, setNumero] = useState();
  const [bairro, setBairro] = useState();
  const [cidade, setCidade] = useState();
  const [cep, setCep] = useState();
  const [uf, setUf] = useState();
  const [complemento, setComplemento] = useState();
  const { state } = useLocation();
  const [idEntregador, setIdEntregador] = useState();
  
  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/entregador/" + state.id)
        .then((response) => {
          setIdEntregador(response.data.id)
          setNome(response.data.nome);
          setCpf(response.data.cpf);
          setRg(response.data.rg);
          setDtNascimento(formatarData(response.data.dtNascimento));
          setFoneCelular(response.data.foneCelular);
          setFoneFixo(response.data.foneFixo);
          setEntregasRealizadas(response.data.entregasRealizadas);
          setValorPorFrete(response.data.valorPorFrete);
          setRua(response.data.rua);
          setNumero(response.data.numero);
          setBairro(response.data.bairro);
          setCidade(response.data.cidade);
          setCep(response.data.cep);
          setUf(response.data.uf);
          setComplemento(response.data.complemento);
        });
    }
  }, [state]);

  function salvar() {
    let entregadorRequest = {
      nome: nome,
      cpf: cpf,
      rg: rg,
      dtNascimento: dtNascimento,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
      entregasRealizadas: entregasRealizadas,
      valorPorFrete: valorPorFrete,
      rua: rua,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      cep: cep,
      uf: uf,
      complemento: complemento,
    };

    if (idEntregador != null) {
      //Alteração:
      axios
        .put(
          "http://localhost:8080/api/entregador/" + idEntregador,
          entregadorRequest
        )
        .then((response) => {
          console.log("Entregador alterado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alter um entregador.");
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8080/api/entregador", entregadorRequest)
        .then((response) => {
          console.log("Entregador cadastrado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir o entregador.");
        });
    }

    axios
      .post("http://localhost:8080/api/entregador", entregadorRequest)
      .then((response) => {
        console.log("Entregador cadastrado com sucesso.");
      })
      .catch((error) => {
        console.log("Erro ao incluir o um entregador.");
      });
  }

  function formatarData(dataParam) {
    if (dataParam === null || dataParam === "" || dataParam === undefined) {
      return "";
    }

    let arrayData = dataParam.split("-");
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
  }
  return (
    <div>
      <MenuSistema tela={"entregador"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idEntregador === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Entregador &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idEntregador != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Entregador &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro{" "}
          </h2>

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group>
                <Form.Input
                  required
                  fluid
                  label="Nome"
                  maxLength="100"
                  style={{ width: "500px" }}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label="CPF"
                  maxLength="100"
                  style={{ width: "300px" }}
                >
                  <InputMask
                    required
                    mask="999.999.999-99"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                  />
                </Form.Input>

                
                <Form.Input
                  required
                  fluid
                  label="RG"
                  style={{ width: "300px" }}
                >
                  <InputMask
                    required
                    mask="9.999.999"
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="DT Nascimento" width={6}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dtNascimento}
                    onChange={(e) => setDtNascimento(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Fone Celular" width={6}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={foneCelular}
                    onChange={(e) => setFoneCelular(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Fone Fixo" width={6}>
                  <InputMask
                    mask="(99) 9999.9999"
                    value={foneFixo}
                    onChange={(e) => setFoneFixo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="QTD Entregas Realizadas" width={6}>
                  <InputMask
                    
                    value={entregasRealizadas}
                    onChange={(e) => setEntregasRealizadas(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Valor por Frete" width={6}>
                  <InputMask
                    
                    value={valorPorFrete}
                    onChange={(e) => setValorPorFrete(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input
                  required
                  fluid
                  label="Rua"
                  maxLength="100"
                  style={{ width: "880px" }}
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label="Número"
                  maxLength="100"
                  style={{ width: "230px" }}
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  required
                  fluid
                  label="Bairro"
                  maxLength="100"
                  style={{ width: "480px" }}
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label="Cidade"
                  maxLength="100"
                  style={{ width: "430px" }}
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label="Cep"
                  maxLength="100"
                  style={{ width: "190px" }}
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                />
              </Form.Group>

              <Form.Input
                required
                fluid
                label="UF"
                maxLength="100"
                style={{ width: "1125px" }}
                value={uf}
                onChange={(e) => setUf(e.target.value)}
              />

              <Form.Input
                required
                fluid
                label="Complemento"
                maxLength="100"
                style={{ width: "1125px" }}
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to={"/list-entregador"}>
                <Button
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
                >
                  <Icon name="reply" /> Voltar
                </Button>
              </Link>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar 
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
