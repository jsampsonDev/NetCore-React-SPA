import React, { Component } from 'react';

export class Libros extends Component {
    static displayName = Libros.name;

    constructor(props) {
        super(props);
        this.state = { current: '', fetchLibros: [], loading: true, editing: false };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    EditLibros(libros) {
        this.setState({ current: libros, editing: true });
    }
    UpdateData(data) {
        console.table(data);
        this.setState({ loading: true });
        fetch('api/Libreria/Update', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(d => {
                console.log(d)
                this.setState({loading:false})
            })
    }

    static renderfetchLibrosTable(fetchLibros, ctrl) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Libro</th>
                        <th>Editorial</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Páginas</th>
                        <th>Estado</th>
                        <th>Disponibilidad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {fetchLibros.map(data =>
                        <tr key={data.idLibro}>
                            <td>{data.idLibro}</td>
                            <td>{data.idEditorial}</td>
                            <td>{data.titulo}</td>
                            <td>{data.idAutor}</td>
                            <td>{data.cantPaginas}</td>
                            <td>{data.estado}</td>
                            <td>{data.disponibilidad}</td>
                            <td><input type="button" class="btn btn-primary" value="Edit" onClick={() => ctrl.EditLibros(data)} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static renderfetchCurrentLibros(data, ctrl) {
        return (
            <form>
                <div class="form-group">
                    <label for="idEditorial">Editorial</label>
                    <input type="text" class="form-control" name="idEditorial" value={data.idEditorial} onChange={(event) => {
                        data.idEditorial = event.target.value;
                    }} />
                </div>
                <div class="form-group">
                    <label for="titulo">Título</label>
                    <input type="text" class="form-control" name="titulo" value={data.titulo} onChange={(event) => {
                        data.titulo = event.target.value;
                    }} />
                </div>
                <div class="form-group">
                    <label for="idAutor">Autor</label>
                    <input type="text" class="form-control" name="idAutor" value={data.idAutor} onChange={(event) => {
                        data.idAutor = event.target.value;
                    }} />
                </div>
                <div class="form-group">
                    <label for="cantPaginas">Páginas</label>
                    <input type="text" class="form-control" name="cantPaginas" value={data.cantPaginas} onChange={(event) => {
                        data.cantPaginas = event.target.value;
                    }} />
                </div>
                <div class="form-group">
                    <label for="estado">Estado</label>
                    <input type="text" class="form-control" name="estado" value={data.estado} onChange={(event) => {
                        data.estado = event.target.value;
                    }} />
                </div>
                <div class="form-group">
                    <label for="disponibilidad">Disponibilidad</label>
                    <input type="text" class="form-control" name="disponibilidad" value={data.disponibilidad} onChange={(event) => {
                        data.disponibilidad = event.target.value;
                    }} />
                </div>
                <div class="form-group">
                    <input type="button" class="btn btn-primary" value="Update" onClick={() => ctrl.UpdateData(data)} />
                </div>
            </form>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Libros.renderfetchLibrosTable(this.state.fetchLibros);

        contents = this.state.editing
            ? Libros.renderfetchCurrentLibros(this.state.current, this)
            : Libros.renderfetchLibrosTable(this.state.fetchLibros, this);

        return (
            <div>
                <h1 id="tabelLabel" >Librería</h1>
                <p>Libros de bd.</p>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('api/Libreria');
        const data = await response.json();
        console.log(data);
        this.setState({ fetchLibros: data, loading: false });
    }
}
