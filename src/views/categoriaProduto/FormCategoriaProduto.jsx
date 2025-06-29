import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormCategoriaProduto() {
  const [descricao, setDescricao] = useState();
  const { state } = useLocation();
  const [idCategoriaProduto, setIdCategoriaProduto] = useState();

  
  useEffect(() => {
    if (state != null && state.id != null) {
        axios.get("http://localhost:8080/api/categoriaProduto/" + state.id)
.then((response) => {
                       setIdCategoriaProduto(response.data.id)
                       setDescricao(response.data.nome)                       
        })
    }
}, [state])

  function salvar() {
    let categoriaProdutoRequest = {
      descricao: descricao,
      };

    if (idCategoriaProduto != null) { //Alteração:
      axios.put("http://localhost:8080/api/categoriaPrduto/" + idCategoriaProduto, categoriaProdutoRequest)
      .then((response) => { console.log('CategoriaProduto alterado com sucesso.') })
      .catch((error) => { console.log('Erro ao alter uma categoriaProduto.') })
  } else { //Cadastro:
      axios.post("http://localhost:8080/api/categoriaProduto", categoriaProdutoRequest)
      .then((response) => { console.log('CategoriaProduto cadastrado com sucesso.') })
      .catch((error) => { console.log('Erro ao incluir a categoriaProduto.') })
  }

  }

  function formatarData(dataParam) {

    if (dataParam === null || dataParam === '' || dataParam === undefined) {
        return ''
    }

    let arrayData = dataParam.split('-');
    return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
}

  return (
    <div>
      <MenuSistema tela={"categoriaProduto"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">

        { idCategoriaProduto === undefined &&
    <h2> <span style={{color: 'darkgray'}}> CategoriaProduto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
}
{ idCategoriaProduto != undefined &&
    <h2> <span style={{color: 'darkgray'}}> CategoriaProduto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
}

          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              CategoriaProduto &nbsp;
              <Icon name="angle double right" size="big" />{" "}
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
                  label="Nome"
                  maxLength="100"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />

             </Form.Group>

              
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to={"/list-categoriaProduto"}>
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
