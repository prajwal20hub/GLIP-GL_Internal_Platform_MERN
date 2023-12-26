export default function ValidateTechSurvey(techData) {
    const { tech, cyber, cloud, commTool } = techData;

    if (!tech && !cyber && !cloud && !commTool) {
        return 'Please Fill All Mandatory Fields';
    }

    if (!tech) {
        return 'Please select the interested Technology';
    }
    if (!cyber) {
        return 'Please select the cyber-security measure';
    }
    if (!cloud) {
        return 'Please select the cloud-based service';
    }
    if (!commTool) {
        return 'Please select the communication tool';
    }
    return null;
} 