import NavBar from "@/components/NavBar";
import { ChartDiv, Container } from "./styles";
import Chart from 'chart.js/auto';
import { useEffect } from "react";
import axios from 'axios';

const Main: React.FC = () => {
  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Requisição com axios para obter os dados da API
        const response = await axios.get('http://34.55.145.113:3000/backend/dashboard');
        const result = response.data;

        console.log(response)

        if (result.erro) {
          console.error('Erro ao carregar os dados:', result.mensagem);
          return;
        }

        const { monthlyConsultations, attendanceTypes, specialtyRankings, attendanceStatus } = result.dados;

        // Gráfico de Linha: Evolução das Consultas por Mês
        const acquisitionsElement = document.getElementById('acquisitions') as HTMLCanvasElement;
        if (acquisitionsElement) {
          new Chart(acquisitionsElement, {
            type: 'line',
            data: {
              labels: monthlyConsultations.map((row:any) => `${row.month} ${row.year}`),
              datasets: [
                {
                  label: 'Evolução das Consultas por Mês',
                  data: monthlyConsultations.map((row:any) => row.count),
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }

        // Gráfico Doughnut: Tipos de Atendimento
        const atendimentosElement = document.getElementById('atendimentos') as HTMLCanvasElement;
        if (atendimentosElement) {
          new Chart(atendimentosElement, {
            type: 'doughnut',
            data: {
              labels: attendanceTypes.map((row:any) => row.type),
              datasets: [
                {
                  label: 'Atendimentos',
                  data: attendanceTypes.map((row:any) => row.count),
                  backgroundColor: ['#0B4A50', '#1F696D', '#44A09F'],
                  borderColor: ['#0B4A50', '#1F696D', '#44A09F'],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                  },
                },
              },
            },
          });
        }

        // Gráfico de Barras: Consultas por Especialidade
        const specialtiesElement = document.getElementById('specialties') as HTMLCanvasElement;
        if (specialtiesElement) {
          new Chart(specialtiesElement, {
            type: 'bar',
            data: {
              labels: specialtyRankings.map((row:any) => row.specialty),
              datasets: [
                {
                  label: 'Consultas por Especialidade',
                  data: specialtyRankings.map((row:any) => row.count),
                  backgroundColor: '#0B4A50',
                  borderColor: '#0B4A50',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }

        // Gráfico de Barras: Comparecimento às Consultas
        const attendanceElement = document.getElementById('attendance') as HTMLCanvasElement;
        if (attendanceElement) {
          new Chart(attendanceElement, {
            type: 'bar',
            data: {
              labels: attendanceStatus.map((row:any) => row.status),
              datasets: [
                {
                  label: 'Comparecimento às Consultas',
                  data: attendanceStatus.map((row:any) => row.count),
                  backgroundColor: ['#1F696D', '#1F696D'],
                  borderColor: ['#1F696D', '#1F696D'],
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        }
      } catch (error:any) {
        console.error('Erro ao carregar os dados do dashboard:', error.message);
      }
    }

    loadDashboardData();
  }, []);

  return (
    <Container>
      <NavBar />
      <ChartDiv>
        <div style={{ width: 550 }}>
          <canvas id="acquisitions"></canvas>
        </div>
        <div style={{ width: 450 }}>
          <canvas id="atendimentos"></canvas>
        </div>
        <div style={{ width: 550 }}>
          <canvas id="specialties"></canvas>
        </div>
        <div style={{ width: 550 }}>
          <canvas id="attendance"></canvas>
        </div>
      </ChartDiv>
    </Container>
  );
};

export default Main;
