
export default function NameInitials(fname, lname) {

    let arr1 = Array.from(fname);
    let arr2 = Array.from(lname);

    let F = arr1[0];
    let L = arr2[0];

    let FinalName = F + L

    return FinalName;
}



