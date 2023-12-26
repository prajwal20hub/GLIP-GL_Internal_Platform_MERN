export default function ValidateCompSurvey(compSurveyData) {
    const { empSatisfaction, trainingDev, empEngagement, empBenifits, empLeadership, empFuturePlanning,empWorkDiversity, empCommunication } = compSurveyData;

    if ( !empSatisfaction && !trainingDev && !empEngagement && !empBenifits && !empLeadership && !empFuturePlanning && !empWorkDiversity && !empCommunication ) {
        return "Please Fill All Mandatory Fields";
    }
    
    if(!empSatisfaction){
        return 'Please rate your satisfaction!'
    }
    if(!trainingDev){
        return 'Please rate Training & Developement!'
    }
    if(!empEngagement){
        return 'Please rate Employee Engagement!'
    }
    if(!empBenifits){
        return 'Please rate Benifits & Policies!'
    }
    if(!empLeadership){
        return 'Please rate Leadership & Management!'
    }
    if(!empFuturePlanning){
        return 'Please rate Planning & Strategy!'
    }
    if(!empWorkDiversity){
        return 'Please rate Work Diversity!'
    }
    if(!empCommunication){
        return 'Please rate Internal Communication & Collaboration!'
    }

    return null;
}
