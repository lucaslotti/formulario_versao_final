import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
  Card,
  CardContent
} from '@mui/material';

function App() {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState({ nome: '', email: '', telefone: '', cpf: '' });
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  // Carrega os usuários do localStorage ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem('usuarios');
    if (stored) setUsuarios(JSON.parse(stored));
  }, []);

  // Atualiza o localStorage sempre que a lista de usuários mudar
  useEffect(() => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  // Atualiza os campos do formulário
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Envia o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const { nome, email, telefone, cpf } = formData;
    if (!nome || !email || !telefone || !cpf) return;
    setUsuarios([...usuarios, { ...formData, id: Date.now() }]);
    setFormData({ nome: '', email: '', telefone: '', cpf: '' });
  };

  // Alterna entre as abas
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setUsuarioSelecionado(null); // Limpa a seleção ao trocar de aba
  };

  // Quando um usuário é clicado
  const handleUserClick = (user) => {
    setUsuarioSelecionado(user);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Cadastro de Usuários</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Tabs value={tab} onChange={handleTabChange} centered>
            <Tab label="Cadastros" />
            <Tab label="Usuários" />
          </Tabs>

          {tab === 0 && (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth label="Nome" name="nome" margin="normal"
                value={formData.nome} onChange={handleChange}
              />
              <TextField
                fullWidth label="Email" name="email" margin="normal"
                value={formData.email} onChange={handleChange}
              />
              <TextField
                fullWidth label="Telefone" name="telefone" margin="normal"
                value={formData.telefone} onChange={handleChange}
              />
              <TextField
                fullWidth label="CPF" name="cpf" margin="normal"
                value={formData.cpf} onChange={handleChange}
              />
              <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                Cadastrar
              </Button>
            </Box>
          )}

          {tab === 1 && (
            <Box sx={{ mt: 2 }}>
              {usuarios.length === 0 ? (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Nenhum usuário cadastrado.
                </Typography>
              ) : (
                <List>
                  {usuarios.map((user) => (
                    <ListItem
                      key={user.id}
                      button
                      onClick={() => handleUserClick(user)}
                      divider
                      sx={{ borderRadius: 1, "&:hover": { backgroundColor: "#f0f0f0" } }}
                    >
                      <ListItemText primary={user.nome} secondary={user.email} />
                    </ListItem>
                  ))}
                </List>
              )}

              {usuarioSelecionado && (
                <Card variant="outlined" sx={{ mt: 3, backgroundColor: "#f9f9f9" }}>
                  <CardContent>
                    <Typography variant="h6">Detalhes do Usuário</Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography><strong>Nome:</strong> {usuarioSelecionado.nome}</Typography>
                    <Typography><strong>Email:</strong> {usuarioSelecionado.email}</Typography>
                    <Typography><strong>Telefone:</strong> {usuarioSelecionado.telefone}</Typography>
                    <Typography><strong>CPF:</strong> {usuarioSelecionado.cpf}</Typography>
                  </CardContent>
                </Card>
              )}
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
}

export default App;
