import { iconsImgs } from "../utils/images";
import { personsImgs } from "../utils/images";





export const inputFields = [
    { id: 1, label: "Full Name", name: "personalInfo.fullName", type: "text", placeholder: "Enter Full Name" },
    { id: 2, label: "Date of Birth", name: "personalInfo.dateOfBirth", type: "date", placeholder: "Enter Date of Birth" },
    { id: 3, label: "Address", name: "personalInfo.address", type: "text", placeholder: "Enter Address" },
    { id: 4, label: "City", name: "personalInfo.city", type: "text", placeholder: "Enter City" },
    { id: 5, label: "State", name: "personalInfo.state", type: "text", placeholder: "Enter State" },
    { id: 6, label: "Zip Code", name: "personalInfo.zipCode", type: "number", placeholder: "Enter Zip Code" },
    { id: 7, label: "Phone Number", name: "personalInfo.phoneNumber", type: "number", placeholder: "Enter Phone Number" },
    { id: 8, label: "Email Address", name: "personalInfo.emailAddress", type: "email", placeholder: "Enter Email Address" },
    { id: 9, label: "Adhar Front", name: "personalInfo.adharcard", type: "file", placeholder: "Enter Adhar Front" },
    { id: 10, label: "Adhar Back", name: "personalInfo.adharcard", type: "file", placeholder: "Enter Adhar Back" },
    { id: 11, label: "Voter Id Number", name: "personalInfo.voterid", type: "file", placeholder: "Enter Pancard Number" },
    { id: 12, label: "Pancard Number", name: "personalInfo.pancard", type: "file", placeholder: "Enter Pancard Number" },
    { id: 13, label: "Working Information", name: "personalInfo.working", type: "text", placeholder: "Enter your Work" },
    { id: 14, label: "Monthly Income", name: "personalInfo.monthlyIncome", type: "number", placeholder: "Enter Monthly Income" },
    { id: 15, label: "Guarantor Full Name", name: "guarantorInfo.fullName", type: "text", placeholder: "Enter Guarantor Full Name" },
    { id: 16, label: "Guarantor Date of Birth", name: "guarantorInfo.dateOfBirth", type: "date", placeholder: "Enter Guarantor Date of Birth" },
    { id: 17, label: "Guarantor Address", name: "guarantorInfo.address", type: "text", placeholder: "Enter Guarantor Address" },
    { id: 18, label: "Guarantor City", name: "guarantorInfo.city", type: "text", placeholder: "Enter Guarantor City" },
    { id: 19, label: "Guarantor State", name: "guarantorInfo.state", type: "text", placeholder: "Enter Guarantor State" },
    { id: 20, label: "Guarantor Zip Code", name: "guarantorInfo.zipCode", type: "text", placeholder: "Enter Guarantor Zip Code" },
    { id: 21, label: "Guarantor Phone Number", name: "guarantorInfo.phoneNumber", type: "text", placeholder: "Enter Guarantor Phone Number" },
    { id: 22, label: "Guarantor Email Address", name: "guarantorInfo.emailAddress", type: "email", placeholder: "Enter Guarantor Email Address" },
    { id: 23, label: "Guarantor Adhar Front", name: "personalInfo.co_adharcard", type: "file", placeholder: "Enter Adhar Front" },
    { id: 24, label: "Guarantor Adhar Back", name: "personalInfo.co_adharcard", type: "file", placeholder: "Enter Adhar Back" },
    { id: 25, label: "Guarantor Voter Id Number", name: "personalInfo.co+voterid", type: "file", placeholder: "Enter Pancard Number" },
    { id: 26, label: "Guarantor Pancard Number", name: "personalInfo.co_pancard", type: "file", placeholder: "Enter Pancard Number" },
    { id: 27, label: "Guarantor Working Information", name: "personalInfo.co_working", type: "text", placeholder: "Enter your Work" },
    { id: 28, label: "Guarantor Monthly Income", name: "guarantorInfo.co_monthlyIncome", type: "text", placeholder: "Enter Guarantor Monthly Income" },
    { id: 29, label: "Loan Amount", name: "loanDetails.loanAmount", type: "text", placeholder: "Enter Loan Amount" },
    { id: 30, label: "Loan Purpose", name: "loanDetails.loanPurpose", type: "text", placeholder: "Enter Loan Purpose" },
    { id: 31, label: "Loan Term (months)", name: "loanDetails.loanTerm", type: "text", placeholder: "Enter Loan Term" },
    { id: 32, label: "Monthly Payment", name: "loanDetails.monthlyPayment", type: "text", placeholder: "Enter Monthly Payment" },
    { id: 33, label: "Payment Start Date", name: "loanDetails.paymentStartDate", type: "date", placeholder: "Enter Payment Start Date" },
    { id: 34, label: "Insurance pay", name: "loanDetails.insurancepay", type: "text", placeholder: "Enter Collateral" },
    { id: 35, label: "Total Loan Realease", name: "loanDetails.total_loan_release", type: "text", placeholder: "Enter Collateral" },
    { id: 36, label: "Total Amount pay", name: "loanDetails.total_pay", type: "text", placeholder: "Enter Collateral" },
    { id: 37, label: "Total intrest pay", name: "loanDetails.total_intrest_pay", type: "text", placeholder: "Enter Collateral" },
    { id: 38, label: "Additional Notes", name: "loanDetails.additionalNotes", type: "text", placeholder: "Enter Additional Notes" },
];














export const navigationLinks = [
    { id: 1, title: 'Home', image: iconsImgs.home, navigation: "/" },
    { id: 2, title: 'Transactions', image: iconsImgs.plane, navigation: "/transactions" },
    { id: 3, title: 'Investor', image: iconsImgs.wealth, navigation: "/investor" },
    { id: 4, title: 'Group Loans', image: iconsImgs.wallet, navigation: "/group-loans" },
    { id: 5, title: 'Employee', image: iconsImgs.bills, navigation: "/employee" },
    { id: 6, title: 'Reports', image: iconsImgs.report, navigation: "/loans" },
    { id: 7, title: 'Savings', image: iconsImgs.wallet, navigation: "/loans" },
    { id: 8, title: 'Financial Advice', image: iconsImgs.wealth, navigation: "/loans" },
    { id: 9, title: 'Account', image: iconsImgs.user, navigation: "/loans" },
    { id: 10, title: 'Settings', image: iconsImgs.gears, navigation: "/loans" },
    { id: 11, title: 'Logout', image: iconsImgs.gears, navigation: "/loans" }
];

export const transactions = [
    {
        id: 11,
        name: "Sarah Parker",
        image: personsImgs.person_four,
        date: "23/12/04",
        time: "10:00am",
        amount: 22000,
        email: "munna@gmail.com",
        username: 'munnakumar572000',
        mobile: "7654171126"
    },
    {
        id: 12,
        name: "Krisitine Carter",
        image: personsImgs.person_three,
        date: "23/07/21",
        time: "10:00am",
        amount: 20000,
        email: "sunny@gmail.com",
        username: 'munnakumar572000',
        mobile: "7654171126"
    },
    {
        id: 13,
        name: "Irene Doe",
        image: personsImgs.person_two,
        date: "23/08/25",
        time: "10:00am",
        amount: 30000,
        email: "nilu@gmail.com",
        username: 'munnakumar572000',
        mobile: "7654171126"
    }
];



export const investordata = [
    {
        id: 11,
        name: "Sarah Parker",
        image: personsImgs.person_four,
        date: "23/12/04",
        time: "10:00am",
        amount: 22000,
        email: "munna@gmail.com",
        username: 'munnakumar572000',
        mobile: "7654171126"
    },
    {
        id: 12,
        name: "Krisitine Carter",
        image: personsImgs.person_three,
        date: "23/07/21",
        time: "10:00am",
        amount: 20000,
        email: "sunny@gmail.com",
        username: 'munnakumar572000',
        mobile: "7654171126"
    },
    {
        id: 13,
        name: "Irene Doe",
        image: personsImgs.person_two,
        date: "23/08/25",
        time: "10:00am",
        amount: 30000,
        username: 'munnakumar572000',
        mobile: "7654171126",
        email: "nilu@gmail.com"
    }
];


export const investmentsdetails = [
    {
        id: 1,
        Investment_amount: 2000,
        Investment_rate: 20,
        Investment_time: '3 years',
        Investment_release: "23/12/04",
        image: personsImgs.person_four,
        status: "Active",
        date: "23/12/04",
        time: "10:00am",
    },
    {
        id: 2,
        Investment_amount: 2000,
        Investment_rate: 20,
        Investment_time: '2 years',
        Investment_release: "23/12/04",
        image: personsImgs.person_four,
        date: "23/12/04",
        time: "10:00am",
        status: "Active",
    },
    {
        id: 3,
        Investment_amount: 2000,
        Investment_rate: 20,
        Investment_time: '4 years',
        Investment_release: "23/12/04",
        image: personsImgs.person_four,
        date: "23/12/04",
        time: "10:00am",
        status: "Inactive",
    },
];


export const reportData = [
    {
        id: 14,
        month: "Jan",
        value1: 45,
        value2: null
    },
    {
        id: 15,
        month: "Feb",
        value1: 45,
        value2: 60
    },
    {
        id: 16,
        month: "Mar",
        value1: 45,
        value2: null
    },
    {
        id: 17,
        month: "Apr",
        value1: 45,
        value2: null
    },
    {
        id: 18,
        month: "May",
        value1: 45,
        value2: null
    }
];

export const budget = [
    {
        id: 19,
        title: "Subscriptions",
        type: "Automated",
        amount: 22000
    },
    {
        id: 20,
        title: "Loan Payment",
        type: "Automated",
        amount: 16000
    },
    {
        id: 21,
        title: "Foodstuff",
        type: "Automated",
        amount: 20000
    },
    {
        id: 22,
        title: "Subscriptions",
        type: null,
        amount: 10000
    },
    {
        id: 23,
        title: "Subscriptions",
        type: null,
        amount: 40000
    }
];

export const subscriptions = [
    {
        id: 24,
        title: "LinkedIn",
        due_date: "23/12/04",
        amount: 20000
    },
    {
        id: 25,
        title: "Netflix",
        due_date: "23/12/10",
        amount: 5000
    },
    {
        id: 26,
        title: "DSTV",
        due_date: "23/12/22",
        amount: 2000
    }
];

export const savings = [
    {
        id: 27,
        image: personsImgs.person_one,
        saving_amount: 250000,
        title: "Pay kid bro’s fees",
        date_taken: "23/12/22",
        amount_left: 40000
    }
]