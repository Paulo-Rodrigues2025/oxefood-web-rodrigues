import { Route, Routes } from "react-router-dom";

import FormCategoriaProduto from './views/categoriaProduto/FormCategoriaProduto';
import ListCategoriaProduto from './views/categoriaProduto/ListCategoriaProduto';
import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import FormCupomDesconto from './views/CupomDesconto/FormCupomDesconto';
import ListCupomDesconto from './views/CupomDesconto/ListCupomDesconto';
import FormEntregador from './views/entregador/FormEntregador';
import ListEntregador from './views/entregador/ListEntregador';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import ListProduto from './views/produto/ListProduto';





function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                 <Route path="list-cupomDesconto" element={ <ListCupomDesconto/> } />
                <Route path="form-cupomDesconto" element={ <FormCupomDesconto/> } />
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="list-produto" element={ <ListProduto/> } />
                <Route path="form-entregador" element={ <FormEntregador/> } />
                <Route path="list-entregador" element={ <ListEntregador/> } />
                 <Route path="form-categoriaProduto" element={ <FormCategoriaProduto/> } />
                <Route path="list-categoriaProduto" element={ <ListCategoriaProduto/> } />
            </Routes>
        </>
    )
}

export default Rotas
