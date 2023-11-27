import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Navbar from '../../../../Navbar/navbar'
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import {
  FormHeading,
  ChartDiv
} from './feed-chart.style'

const FeedChart = () => {

  const [data, setData] = useState({
    Admin: 0,
    Developer: 0,
    Manager: 0,
    HR: 0,
    Payroll: 0,
    Transport: 0
  });

  var sum = [0, 0, 0, 0, 0, 0];
  var count = [0, 0, 0, 0, 0, 0];

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    await axios.get('/api/feedback', {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
      .then((res) => {
        res.data.forEach((obj) => {
          Object.keys(data).forEach((team, ind) => {
            if (team === obj.empDept) {
              sum[ind] = sum[ind] + obj.rating;
              count[ind]++;
            }
          });
        })

        var newData = {
          'Admin': 0,
          'Developer': 0,
          'Manager': 0,
          'HR': 0,
          'Payroll': 0,
          'Transport': 0
        }

        Object.keys(newData).forEach((team, ind)=> {
          newData[team] = sum[ind] / count[ind];           //imp {dont write newData.Admin here}
        });
        setData(newData);
      })
  }

  const UserData = [
    {
      team: 'Admin',
      rating: data.Admin,
      color: '#FF6384',
      hcolor: '#ffb7c7'
    },
    {
      team: 'Developer',
      rating: data.Developer,
      color: '#36A2EB',
      hcolor: '#99c3df'
    },
    {
      team: 'Manager',
      rating: data.Manager,
      color: '#FFCE56',
      hcolor: '#fce9b8'
    },
    {
      team: 'HR',
      rating: data.HR,
      color: '#4BC0C0',
      hcolor: '#8abebe'
    },
    {
      team: 'Payroll',
      rating: data.Payroll,
      color: '#9966FF',
      hcolor: '#ceb7fc'
    },
    {
      team: 'Transport',
      rating: data.Transport,
      color: '#F37037',
      hcolor: '#eeac8f'
    }
  ];

  const myData = {
    data: {
      labels: UserData.map(o => o.team),
      datasets: [
        {
          label: 'Rating',
          backgroundColor: UserData.map(o => o.color),
          hoverBackgroundColor: UserData.map(o => o.hcolor),
          border: `${UserData.map(o => o.color)}`,
          data: UserData.map(o => o.rating)
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Teams Ratings Bar Chart'
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <FormHeading> Feedback Analysis </FormHeading>
      <ChartDiv>
        <Bar
          data={myData.data}
          options={myData.options}
        />
      </ChartDiv>
    </>
  )
}

export default FeedChart