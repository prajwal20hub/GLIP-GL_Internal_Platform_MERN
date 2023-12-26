export default function ValidateFeedForm(feedData) {
    const { empDept, empFeedName, rating } = feedData;

    if(!empDept && !empFeedName && !rating){
        return 'Please Fill All Mandatory Fields'
    }

    if(!empDept){
        return 'Please select employee Team'
    }
    if(!empFeedName){
        return 'Please select employee Name'
    }

    if(rating === ''){
        return 'Please give the rating'
    }

    return null;
}