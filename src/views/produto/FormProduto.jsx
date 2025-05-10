import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormProduto() {
  const [titulo, setTitulo] = useState();
  const [codigoDoProduto, setCodigoDoProduto] = useState();
  const [descricao, setDescricao] = useState();
  const [valorUnitario, setValorUnitario] = useState();
  const [tempoEntregaMin, setTempoEntregaMin] = useState();
  const [tempoEntregaMax, setTempoEntregaMax] = useState();
  const { state } = useLocation();
  const [idProduto, setIdProduto] = useState();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/produto/" + state.id)
        .then((response) => {
          setIdProduto(response.data.id);
          setTitulo(response.data.titulo);
          setCodigoDoProduto(response.data.codigoDoProduto);
          setDescricao(response.data.descricao);
          setValorUnitario(response.data.valorUnitario);
          setTempoEntregaMin(response.data.tempoEntregaMin);
          setTempoEntregaMax(response.data.tempoEntregaMax);
        });
    }
  }, [state]);

  function salvar() {
    let produtoRequest = {
      titulo: titulo,
      codigoDoProduto: codigoDoProduto,
      descricao: descricao,
      valorUnitario: valorUnitario,
      tempoEntregaMin: tempoEntregaMin,
      tempoEntregaMax: tempoEntregaMax,
    };

    if (idProduto != null) {
      //Alteração:
      axios
        .put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
        .then((response) => {
          console.log("Produto alterado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alter um produto.");
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8080/api/produto", produtoRequest)
        .then((response) => {
          console.log("Produto cadastrado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir o produto.");
        });
    }
  }

  return (
    <div>
      <MenuSistema tela={"produto"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idProduto === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Produto &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idProduto != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Produto &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Produto &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro{" "}
          </h2>

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Título"
                  maxLength="100"
                  placeholder="Informe o título do produto"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />

                <Form.Input required fluid label="Código do Produto">
                  <InputMask
                    required
                    placeholder="Informe o código do produto"
                    value={codigoDoProduto}
                    onChange={(e) => setCodigoDoProduto(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.TextArea
                fluid
                label="Descrição"
                width={"16"}
                placeholder="Informe o descrição do produto"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              ></Form.TextArea>

              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Valor Unitário"
                  maxLength="100"
                  value={valorUnitario}
                  onChange={(e) => setValorUnitario(e.target.value)}
                />

                <Form.Input
                  fluid
                  label="Tempo de Entrega Mínimo em Minutos"
                  placeholder="30"
                  value={tempoEntregaMin}
                  onChange={(e) => setTempoEntregaMin(e.target.value)}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="Tempo de Entrega Máximo em Minutos"
                  maskChar={null}
                  placeholder="40"
                  value={tempoEntregaMax}
                  onChange={(e) => setTempoEntregaMax(e.target.value)}
                ></Form.Input>
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
              >
                <Icon name="reply" />
                Limpar
              </Button>

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

              <Link to={"/list-produto"}>
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
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
