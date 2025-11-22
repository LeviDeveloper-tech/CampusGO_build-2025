import React, { useState, useEffect } from "react";
import { admins, students } from "../utils/mockData";
import "./LoginScreen.css";

/*
  Tela de Login do CampusGO:
  - Permite login de alunos, visitantes e administradores.
  - Administradores digitam usuário -> popup pede senha.
  - Envia role (admin, master, student) ao App.jsx.
*/

export default function LoginScreen({ onLogin, onVisitor }) {
  const [matricula, setMatricula] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminMaster, setIsAdminMaster] = useState(false);

  // 🔍 Verifica se o usuário é admin e abre o popup se for
  async function handleLogin() {
    setError("");
    if (!matricula.trim()) {
      setError("Digite sua matrícula ou entre como visitante.");
      return;
    }

    setLoading(true);

    // 🔍 Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Verificar se é admin (sem backend)
    const admin = admins.find((a) => a.username === matricula);
    if (admin) {
      setIsAdminMaster(matricula.toLowerCase() === "admin");
      setShowPasswordModal(true);
      setLoading(false);
      return;
    }

    // Se não for admin, tenta login como aluno
    await loginRequest({ matricula });
  }

  // 🔹 Faz o login no backend (Flask)
  async function loginRequest({ matricula, senha = "" }) {
    setLoading(true);

    // 🔍 Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Verificar admin
    const admin = admins.find((a) => a.username === matricula);
    if (admin) {
      if (admin.senha === senha) {
        const role = matricula.toLowerCase() === "admin" ? "master" : "admin";
        onLogin(matricula, admin.nome, role);
      } else {
        setError("Senha incorreta!");
      }
      setLoading(false);
      return;
    }

    // Verificar student
    const student = students.find((s) => s.matricula === matricula);
    if (student) {
      onLogin(matricula, student.name, "student");
    } else {
      setError("Matrícula não encontrada!");
    }

    setLoading(false);
  }

  // 🔐 Quando o admin confirma a senha no popup
  const handleAdminAuth = async () => {
    if (!adminPassword.trim()) {
      setError("Digite a senha.");
      return;
    }

    setShowPasswordModal(false);
    await loginRequest({
      matricula: matricula.trim(),
      senha: adminPassword,
    });
    setAdminPassword("");
  };

  // ⏱️ Retorna à tela Splash se ficar 20s sem uso
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="logo">
          <img src="/Logo-transparente.png" alt="CampusGO" />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Digite sua matrícula ou usuário"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <button
            className={`btn-entrar ${loading ? "loading" : ""}`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <div className="spinner"></div> : "Entrar"}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="row">
          <button className="btn-visitor" onClick={onVisitor}>
            Acessar como visitanteee
          </button>
        </div>

        <footer className="foot">Projeto de Extensão — UNIFAMETRO</footer>
      </div>

      {/* 🔒 Modal de autenticação do admin */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              🔐{" "}
              {isAdminMaster
                ? "Autenticação do Admin Master"
                : "Autenticação do Administrador"}
            </h3>
            <input
              type="password"
              placeholder="Digite a senha"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdminAuth()}
            />
            <div className="modal-buttons">
              <button onClick={handleAdminAuth}>Confirmar</button>
              <button
                className="cancel"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
