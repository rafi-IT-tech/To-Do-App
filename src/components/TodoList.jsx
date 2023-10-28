// src/components/TodoList.js

import React from 'react';
import { connect } from 'react-redux';
import { addTodo, deleteTodo, updateTodo } from '../store/actions'; // Perhatikan penambahan aksi "updateTodo" di sini
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';

class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      updatedText: '', // Menyimpan teks yang akan diperbarui
      updateId: null, // Menyimpan ID tugas yang akan diperbarui
    };
  }

  handleAddTodo = (todo) => {
    this.props.addTodo(todo);
  };

  handleDeleteTodo = (todoId) => {
    this.props.deleteTodo(todoId);
  };

  // Fungsi untuk memulai proses pembaruan
  handleStartUpdate = (todo) => {
    this.setState({
      updatedText: todo.text,
      updateId: todo.id,
    });
  };

  // Fungsi untuk membatalkan proses pembaruan
  handleCancelUpdate = () => {
    this.setState({
      updatedText: '',
      updateId: null,
    });
  };

  // Fungsi untuk menyimpan perubahan tugas
  handleSaveUpdate = () => {
    if (this.state.updatedText && this.state.updateId !== null) {
      this.props.updateTodo({
        id: this.state.updateId,
        text: this.state.updatedText,
      });
      this.setState({
        updatedText: '',
        updateId: null,
      });
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} md={6}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                this.handleAddTodo({
                  text: e.target.newTodo.value,
                  id: Date.now(), // Anda bisa menghasilkan ID unik di sini
                });
                e.target.newTodo.value = ''; // Bersihkan input
              }}
            >
              <Form.Group>
                <Form.Control
                  type="text"
                  name="newTodo"
                  placeholder="Tambah tugas baru"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Tambah Tugas
              </Button>
            </Form>
          </Col>
          <Col xs={12} md={6}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tugas</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {this.props.todos.map((todo) => (
                  <tr key={todo.id}>
                    <td>
                      {todo.id === this.state.updateId ? (
                        <input
                          type="text"
                          value={this.state.updatedText}
                          onChange={(e) =>
                            this.setState({ updatedText: e.target.value })
                          }
                        />
                      ) : (
                        todo.text
                      )}
                    </td>
                    <td>
                      {todo.id === this.state.updateId ? (
                        <>
                          <Button
                            variant="success"
                            onClick={this.handleSaveUpdate}
                          >
                            Simpan
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={this.handleCancelUpdate}
                          >
                            Batal
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="info"
                            onClick={() => this.handleStartUpdate(todo)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => this.handleDeleteTodo(todo.id)}
                          >
                            Hapus
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h2 className="text-center">Daftar Tugas</h2>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.todos,
  };
};

export default connect(mapStateToProps, { addTodo, deleteTodo, updateTodo })(TodoList);
