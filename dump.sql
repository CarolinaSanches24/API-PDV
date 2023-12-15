CREATE DATABASE pdv;

CREATE TABLE usuarios(
id SERIAL PRIMARY KEY,
nome TEXT NOT NULL,
email TEXT UNIQUE NOT NULL,
senha TEXT NOT NULL
);

CREATE TABLE categorias(
id SERIAL PRIMARY KEY,
descricao TEXT NOT NULL
);

INSERT INTO categorias (descricao)
VALUES 
  ('Informática'),
  ('Celulares'),
  ('Beleza e Perfumaria'),
  ('Mercado'),
  ('Livros e Papelaria'),
  ('Brinquedos'),
  ('Moda'),
  ('Bebê'),
  ('Games');

  CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    quantidade_estoque INTEGER NOT NULL,
    valor INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL,
   categoria_id INTEGER REFERENCES categorias(id)
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    cep TEXT,
    rua TEXT,
    numero TEXT,
    bairro TEXT,
    cidade TEXT,
    estado TEXT
);

ALTER TABLE produtos ADD COLUMN produto_imagem TEXT;

CREATE TABLE pedidos(
  id SERIAL PRIMARY KEY,
  cliente_id INTEGER REFERENCES clientes(id),
  observacao TEXT,
  valor_total INTEGER
  );

 CREATE TABLE pedido_produtos(
  id SERIAL PRIMARY KEY,
  pedido_id INTEGER REFERENCES pedidos(id),
  produto_id INTEGER REFERENCES produtos(id),
  quantidade_produto INTEGER NOT NULL,
  valor_produto INTEGER NOT NULL
  );
