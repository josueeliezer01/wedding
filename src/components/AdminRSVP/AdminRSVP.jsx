import { useState } from "react";
import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiRefreshCw,
  FiLock,
} from "react-icons/fi";
import "./AdminRSVP.css";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export default function AdminRSVP() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/confirmations?select=*`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    if (data.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }

    const headers = ["Nome", "Status", "Acompanhantes"];

    const csvRows = data.map((item) => [
      `"${item.name}"`,
      item.status === "presente" ? "Confirmado" : "Ausente",
      item.guests_count,
    ]);

    const csvContent = [headers, ...csvRows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(["\ufeff" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `lista_convidados_casamento_${new Date().toLocaleDateString()}.csv`
    );
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("Senha incorreta");
    }
  };

  const totalPresentes = data
    .filter((c) => c.status === "presente")
    .reduce((acc, curr) => acc + curr.guests_count, 0);

  const totalAusentes = data.filter((c) => c.status === "ausente").length;

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-card">
          <FiLock
            size={40}
            color="var(--color-primary)"
          />
          <h2>Painel de Gestão</h2>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="hero-cta">
              Aceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Lista de Convidados</h1>
        <div className="admin-actions">
          <button
            onClick={exportToCSV}
            className="export-btn"
            title="Exportar para Excel">
            Exportar CSV
          </button>
          <button
            onClick={fetchData}
            disabled={loading}
            className="refresh-btn">
            <FiRefreshCw className={loading ? "spin" : ""} />
          </button>
        </div>
      </header>

      <div className="admin-stats">
        <div className="stat-card">
          <FiUserCheck />
          <span>Presentes</span>
          <strong>{totalPresentes}</strong>
        </div>
        <div className="stat-card">
          <FiUserX />
          <span>Ausentes</span>
          <strong>{totalAusentes}</strong>
        </div>
        <div className="stat-card">
          <FiUsers />
          <span>Total Respostas</span>
          <strong>{data.length}</strong>
        </div>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Status</th>
              <th>Qtd</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className={item.status}>
                <td>{item.name}</td>
                <td className="status-cell">
                  {item.status === "presente" ? "Confirmado" : "Não vai"}
                </td>
                <td>{item.guests_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
