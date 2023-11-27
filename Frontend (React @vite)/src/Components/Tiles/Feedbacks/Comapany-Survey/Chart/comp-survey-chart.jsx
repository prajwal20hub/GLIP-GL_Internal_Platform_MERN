import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import "chart.js/auto";
import Navbar from '../../../../Navbar/navbar';
import {
  ChartParentDiv,
  DisplayOptionsDiv,
  DisplayChartDiv,
  OptionsButton,
  DisplayValues,
  ParaCount
} from "./comp-survey-chart.styled";
import { FormHeading } from '../../Feedback-Form/Form/feed-form.style';

function RatingChart() {
  const [ratingsData, setRatingsData] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('empSatisfaction');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios.get('/api/company-survey', {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    })
      .then((res)=> {
        setRatingsData(res.data);
      })
     .catch ((err) => {
      console.log('Error fetching ratings data:', err);
    })
  };

  const countRatingsByQuestion = () => {
    const ratingCountsByQuestion = {
      empSatisfaction: [0, 0, 0, 0, 0],
      trainingDev: [0, 0, 0, 0, 0],
      empEngagement: [0, 0, 0, 0, 0],
      empBenifits: [0, 0, 0, 0, 0],
      empLeadership: [0, 0, 0, 0, 0],
      empFuturePlanning: [0, 0, 0, 0, 0],
      empWorkDiversity: [0, 0, 0, 0, 0],
      empCommunication: [0, 0, 0, 0, 0],
    };

    ratingsData.forEach((ratingObj) => {
      Object.keys(ratingCountsByQuestion).forEach((questionKey) => {
        const rating = parseInt(ratingObj[questionKey], 10);
        if (rating >= 1 && rating <= 5) {
          ratingCountsByQuestion[questionKey][rating - 1]++;
        }
      });
    });
    return ratingCountsByQuestion;
  };

  const ratingCountsByQuestion = countRatingsByQuestion();

  const generateChartData = (questionKey) => {
    const ratingCounts = ratingCountsByQuestion[questionKey];
    const questionLabel = questionKey.charAt(0).toUpperCase() + questionKey.slice(1);

    return {
      labels: ['Excellent', 'Very Good', 'Good', 'Average', 'Poor'],
      datasets: [
        {
          data: ratingCounts,
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
          label: questionLabel,
        },
      ],
    };
  };

  const handleQuestionChange = (questionKey) => {
    setSelectedQuestion(questionKey);
  };

  const ratingsArr = ["Employee Satisfaction", "Training & Development", "Employee Engagement", "Employee Benifits", "Leadership & Management", "Future Planning", "Work Diversity", "Employee Communication"]
  return (
    <>
      <Navbar />
      <FormHeading> Company Survey Analysis </FormHeading>
      <ChartParentDiv className="row">
        <DisplayOptionsDiv className="col-md-4">
          {Object.keys(ratingCountsByQuestion).map((questionKey,ind) => (
            <OptionsButton
              key={questionKey}
              onClick={() => handleQuestionChange(questionKey)}
              variant={selectedQuestion === questionKey ? 'contained' : 'outlined'}
            >
              {ratingsArr[ind]}
            </OptionsButton>
          ))}
        </DisplayOptionsDiv>
        <DisplayChartDiv className="col-md-4">
          <Pie data={generateChartData(selectedQuestion)} />
        </DisplayChartDiv>
        
        <DisplayValues className="col-md-2">
            Total Surveys <br />
            <ParaCount> {ratingsData.length} </ParaCount>
        </DisplayValues>
      </ChartParentDiv>
    </>
  );
}

export default RatingChart;
