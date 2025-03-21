import { LightningElement,api, track, wire } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import csvFileRead from '@salesforce/apex/InsertDNALead.csvFileRead';
import myresources from '@salesforce/resourceUrl/DNA_Lead_Format';

const columnsAccount = [
    { label: 'Month', fieldName: 'Month__c'}, 
    { label: 'City', fieldName: 'CITY_Name__c' },
    { label: 'Name', fieldName: 'LastName'},
    { label: 'Type of DNA ', fieldName:'Type_of_DNA_Lead__c'},
    { label: 'Description', fieldName: 'Description'},
    { label: 'Website', fieldName: 'Website'}, 
    { label: 'Property Name', fieldName: 'Company'}, 
    { label: 'SubMarket', fieldName: 'Submarket__c'},
    { label: 'Address', fieldName: 'LS_Address__c'},
    { label: 'Area Sq Ft', fieldName: 'Area__c'},//new field
    { label: 'Latitude', fieldName: 'Latitude__c'},
    { label: 'Longitude', fieldName: 'Longitude__c'},
    { label: 'Professionals 1 Name', fieldName: 'Professionals_1_Name__c'},
    { label: 'Professionals 1 Designation ', fieldName: 'Professionals_1_Designation__c'},
    { label: 'Professionals 1 Mobile ', fieldName: 'Professionals_1_Mobile__c'},
    { label: 'Professionals 1 Email', fieldName: 'Professionals_1_Email__c'},
    { label: 'Professionals 2 Name', fieldName: 'Professionals_2_Name__c'},
    { label: 'Professionals 2 Designation', fieldName: 'Professionals_2_Designation__c'},
    { label: 'Professionals 2 Mobile', fieldName: 'Professionals_2_Mobile__c'},
    { label: 'Professionals 2 Email', fieldName: 'Professionals_2_Email__c'},
    { label: 'Other Comments', fieldName: 'Other_Comments__c'},
    { label: 'DNA Project', fieldName: 'DNA_Project__c'},
    { label: 'Lead Owner', fieldName: 'Owner_Name__c'}
    
];

export default class InsertDNALeads extends LightningElement {
    @api recordId;
    @track error;
    @track columnsAccount = columnsAccount;
    @track data;
    @api templatefile = myresources;
    // accepted parameters
    get acceptedCSVFormats() {
        return ['.csv'];
    }
    
    uploadFileHandler(event) {
        // Get the list of records from the uploaded files
        const uploadedFiles = event.detail.files;

        // calling apex class csvFileread method
        csvFileRead({contentDocumentId : uploadedFiles[0].documentId})
        .then(result => {
            window.console.log('result ===> '+ JSON.stringify(result));
            this.data = result;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!!',
                    message: 'Leads are created according to the CSV file upload!!!',
                    variant: 'Success',
                }),
            );
        })
        .catch(error => {
            this.error = error.body.message;
                 
        })

    }
    
}
