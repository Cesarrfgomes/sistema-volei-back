create type "cargo" as enum ('ALUNO', 'TUTOR', 'ADMINISTRADOR')

create table usuarios (
	id serial primary key,
  nome varchar(155) not null,
  email varchar(255) unique not null,
  senha varchar(255) not null,
  telefone varchar(14),
  cargo cargo NOT NULL DEFAULT 'ALUNO',
  time_id int references times(id)
);

create table aula_usuario(
	aula_id int references aulas(id),
  usuario_id int references usuarios(id)
);

create table aulas (
	id serial primary key,
  tutor_id int references usuarios(id),
  data date not null,
  local text not null
);

create table times(
	id serial primary key,
  nome varchar(100) unique not null
);

create table torneio(
	id serial primary key,
  nome varchar(150) not null,
  local varchar(150) not null,
  dataeHora timestamptz not null default now()
);

create table time_torneio(
	time_id int references times(id),
  torneio_id int references torneio(id)
);
