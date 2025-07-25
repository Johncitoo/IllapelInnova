-- Si tu tabla usuarios ya existe y quieres agregar la restricción:
ALTER TABLE usuarios
    ADD CONSTRAINT usuarios_rut_unique UNIQUE (rut);

-- Si la vas a crear desde cero:
CREATE TABLE imagenes (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    url TEXT NOT NULL
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    rut VARCHAR(20) UNIQUE NOT NULL,          -- <--- restricción única
    contacto VARCHAR(30),
    direccion TEXT,
    edad INT,
    fecha_nacimiento DATE,
    antiguedad INT,
    redes_sociales TEXT,
    discapacidad BOOL,
    tipo_discapacidad TEXT,
    inscrito_registro_discapacidad BOOL,
    parte_programas_municipales BOOL,
    descripcion_negocio TEXT,
    otro_ingreso BOOL,
    sector_economico VARCHAR(30),
    formalizado BOOL,
    autorizacion_sanitaria BOOL,
    productos TEXT,
    local_establecido BOOL,
    direccion_local TEXT,
    trabaja_solo BOOL,
    dificultad_fisica BOOL,
    dificultad_psicologica BOOL,
    pertenece_agrupacion BOOL,
    imagen_id INT,
    pdfUrl TEXT,
    CONSTRAINT fk_imagen
        FOREIGN KEY(imagen_id)
        REFERENCES imagenes(id)
        ON DELETE SET NULL
);

CREATE INDEX idx_usuarios_nombres ON usuarios (nombres);
CREATE INDEX idx_usuarios_apellidos ON usuarios (apellidos);
CREATE INDEX idx_usuarios_rut ON usuarios (rut);
