CREATE DATABASE conterp;

INSERT INTO clients (id, name, logo_image_path) VALUES
  ('1b2a0a1e-1234-5678-9101-112233445566', 'Client A', '/logos/client-a.png'),
  ('2c3b0b2f-2234-5678-9101-223344556677', 'Client B', '/logos/client-b.png');

-- Table: Contracts
INSERT INTO contracts (id, name, logo_image_path, client_id) VALUES
  ('3d4c0c3g-3234-5678-9101-334455667788', 'Contract Alpha', '/logos/contract-alpha.png', '1b2a0a1e-1234-5678-9101-112233445566'),
  ('4e5d0d4h-4234-5678-9101-445566778899', 'Contract Beta', '/logos/contract-beta.png', '2c3b0b2f-2234-5678-9101-223344556677');

-- Table: Users
INSERT INTO users (id, name, email, password, enterprise_id, access_level) VALUES
  ('5f6e0e5i-5234-5678-9101-556677889900', 'John Doe', 'john.doe@example.com', 'password123', NULL, 'ADM'),
  ('6g7f0f6j-6234-5678-9101-667788990011', 'Jane Smith', 'jane.smith@example.com', 'password456', NULL, 'USER');

-- Table: Enterprises
INSERT INTO enterprises (id, name, logo_image_path, main_color) VALUES
  ('7h8g0g7k-7234-5678-9101-778899001122', 'Enterprise X', '/logos/enterprise-x.png', '#ff5733');

-- Table: Rigs
INSERT INTO rigs (id, name, is_active, contract_id, state, state_flag_image_path) VALUES
  ('8i9h0h8l-8234-5678-9101-889900112233', 'Rig Alpha', true, '3d4c0c3g-3234-5678-9101-334455667788', 'SP', '/flags/sp.png'),
  ('9j0i1i9m-9234-5678-9101-990011223344', 'Rig Beta', true, '4e5d0d4h-4234-5678-9101-445566778899', 'RJ', '/flags/rj.png');
