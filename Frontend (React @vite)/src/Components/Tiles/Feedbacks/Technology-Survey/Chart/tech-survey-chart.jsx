import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Bar, Line, PolarArea } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { ArcElement, Tooltip, Legend, RadialLinearScale } from "chart.js";
import Navbar from "../../../../Navbar/navbar";
import { FormHeading } from "../../Feedback-Form/Form/feed-form.style";
import {
  MainDiv,
  FlexDiv,
  ChartDiv
} from './tech-survey-chart.style.js'

Chart.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const TechSurveyChart = () => {
  const [techData, setTechData] = useState([]);

  useEffect(() => {
    fetchData();
    countRatingsByQuestion();
  }, []);

  const fetchData = () => {
    axios.get(`/api/tech-survey`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
      .then((res) => {
        setTechData(res.data);
      });
  }

  const countRatingsByQuestion = () => {
    const ratingCountsByQuestion = {
      tech: [0, 0, 0, 0, 0],   // 'ReactJS', 'JAVA', 'DevOps', 'DotNet', 'AI/ML' 
      cyber: [0, 0, 0, 0, 0], //'Anti-Virus', 'Firewall', 'VPN', '2FA', 'Others'
      cloud: [0, 0, 0, 0], //'Daily', 'Weekly', 'Monthly', 'Rarely'
      commTool: [0, 0, 0, 0, 0] //'Email', 'Microsoft Teams', 'Slack', 'Zoom', 'Others'
    };

    const QuestionOpts = [
      { tech: ['ReactJS', 'JAVA', 'DevOps', 'DotNet', 'AI/ML'] },
      { cyber: ['Anti-Virus', 'Firewall', 'VPN', '2FA', 'Others'] },
      { cloud: ['Daily', 'Weekly', 'Monthly', 'Rarely'] },
      { commTool: ['Email', 'Microsoft Teams', 'Slack', 'Zoom', 'Others'] }
    ];

    techData.forEach((ratingObj) => {
      Object.keys(ratingCountsByQuestion).forEach((questionKey, index) => {
        QuestionOpts[index][questionKey].forEach((opt, ind) => {
          if (opt === ratingObj[questionKey]) {
            ratingCountsByQuestion[questionKey][ind]++;
          }
        })
      });
    });
    return ratingCountsByQuestion;
  };

  const resultData = countRatingsByQuestion();

  const data_1 = {
    data: {
      labels: ["ReactJS", "Java", "DevOps", "DotNet", "AI/ML"],
      datasets: [
        {
          label: "No. of Votes",
          data: resultData.tech,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
          hoverBackgroundColor: [
            '#ffb7c7',
            '#99c3df',
            '#fce9b8',
            '#8abebe',
            '#ceb7fc',
          ],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Technologies Interest",
        },
      },
    },
  };

  const data_2 = {
    data: {
      labels: [
        "Anti-Virus Software",
        "FireWall",
        "VPN",
        "2FA",
        "Other",
      ],
      datasets: [
        {
          label: "No. of Votes",
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#FF6384',
          borderColor: '#FF6384',
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#9966FF',
          pointHoverBorderColor: '#ceb7fc',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: resultData.cyber,
          tension: 0.1,
        }
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Cyber-Security Measures Used",
        },
      },
    },
  };

  const data_3 = {
    data: {
      labels: ["Daily", "Weekly", "Monthly", "Rarely"],
      datasets: [
        {
          label: "No. of Votes",
          data: resultData.cloud,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#9966FF',
          ],
          hoverBackgroundColor: [
            '#ffb7c7',
            '#99c3df',
            '#fce9b8',
            '#ceb7fc',
          ],
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "How much Frequent use of Cloud Based Services",
        },
      },
    },
  };

  const data_4 = {
    data: {
      labels: ["Email", "Microsoft Teams", "Slack", "Zoom", "Other"],
      datasets: [
        {
          label: "No. of Votes",
          data: resultData.commTool,
          backgroundColor: [
            'rgba(255, 99, 132, 0.85)',
            'rgba(54, 162, 235, 0.85)',
            'rgba(255, 206, 86, 0.85)',
            'rgba(75, 192, 192, 0.85)',
            'rgba(153, 102, 255, 0.85)',
          ],
          hoverBackgroundColor: [
            '#ffb7c7',
            '#99c3df',
            '#fce9b8',
            '#8abebe',
            '#ceb7fc',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Cmmunication Tool used for work-related discussions",
        },
      },
    },
  };
  return (
    <>
      <Navbar />
      <FormHeading>Technology Survey Analysis</FormHeading>
      <MainDiv>
        <FlexDiv>
          <ChartDiv >
            <Pie data={data_1.data} options={data_1.options} />
          </ChartDiv>

          <ChartDiv style={{ width: '45vw' }}>
            <Line data={data_2.data} options={data_2.options} />
          </ChartDiv>
        </FlexDiv>

        <FlexDiv>
          <ChartDiv style={{ width: '55vw' }}>
            <Bar data={data_3.data} options={data_3.options} />
          </ChartDiv>
          <ChartDiv style={{ width: '45vw' }}>
            <PolarArea data={data_4.data} options={data_4.options} />
          </ChartDiv>
        </FlexDiv>
      </MainDiv>
    </>
  );
};

export default TechSurveyChart;